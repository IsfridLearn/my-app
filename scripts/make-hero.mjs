// Generates the opening screen's images in public/photos from the originals.
// Run with: node scripts/make-hero.mjs
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const A = "assets/photos/";
const DARK = "assets/portraits/black-suit.png";
const LIGHT = "assets/portraits/white-suit.png";
const OUT = "public/photos/";
const RED = [212, 17, 27];

// Seeded so re-running the script gives identical files.
let seed = 77;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
const clamp = (v) => Math.max(0, Math.min(255, Math.round(v)));

async function grey(pipeline) {
  const { data, info } = await pipeline.grayscale().raw().toBuffer({ resolveWithObject: true });
  const g = new Float32Array(info.width * info.height);
  for (let i = 0; i < g.length; i++) g[i] = data[i * info.channels];
  return { g, w: info.width, h: info.height };
}

function writeGrey(g, w, h, name, quality) {
  const b = Buffer.alloc(w * h);
  for (let i = 0; i < b.length; i++) b[i] = clamp(g[i]);
  return sharp(b, { raw: { width: w, height: h, channels: 1 } }).webp({ quality }).toFile(`${OUT}${name}.webp`);
}

function writeRGBA(b, w, h, name, quality) {
  return sharp(b, { raw: { width: w, height: h, channels: 4 } })
    .webp({ quality, alphaQuality: 80 })
    .toFile(`${OUT}${name}.webp`);
}

// A smeared portrait: bands of the image slide and blur sideways, with thin bright scratches.
async function ghost(src, extract, width, name) {
  const { g, w, h } = await grey(sharp(src).extract(extract).resize({ width }));
  const out = new Float32Array(w * h);
  let y = 0;
  while (y < h) {
    const band = 2 + Math.floor(rnd() * rnd() * 46);
    const shift = Math.floor((rnd() - 0.5) * (rnd() < 0.35 ? 150 : 40));
    const radius = Math.floor(6 + rnd() * rnd() * 90);
    for (let row = y; row < Math.min(h, y + band); row++) {
      for (let x = 0; x < w; x++) {
        let sum = 0;
        let count = 0;
        for (let k = -radius; k <= radius; k += 4) {
          const sx = x + shift + k;
          if (sx >= 0 && sx < w) {
            sum += g[row * w + sx];
            count++;
          }
        }
        const fadeX = Math.min(1, Math.min(x, w - 1 - x) / (w * 0.16));
        const fadeY = Math.min(1, Math.min(row, h - 1 - row) / (h * 0.08));
        out[row * w + x] = (count ? sum / count : 0) * 0.62 * fadeX * fadeY;
      }
    }
    y += band;
  }
  for (let n = 0; n < 34; n++) {
    const row = Math.floor(h * (0.12 + rnd() * 0.76));
    const x0 = Math.floor(rnd() * w * 0.6);
    const length = Math.floor(30 + rnd() * w * 0.5);
    const thickness = 1 + Math.floor(rnd() * 3);
    for (let t = 0; t < thickness; t++) {
      for (let x = x0; x < Math.min(w, x0 + length); x++) {
        const i = (row + t) * w + x;
        if (out[i] > 26 && rnd() > 0.22) {
          out[i] = Math.min(255, out[i] * 2.6 + 110 * Math.sin(((x - x0) / length) * Math.PI));
        }
      }
    }
  }
  return writeGrey(out, w, h, name, 72);
}

await mkdir(OUT, { recursive: true });

// Main portrait, graded hard and falling away to black at its edges.
{
  const { g, w, h } = await grey(
    sharp(`${A}headshot-front.jpg`)
      .extract({ left: 110, top: 40, width: 964, height: 1300 })
      .resize({ width: 1100 })
      .sharpen({ sigma: 1, m1: 0.8, m2: 1.6 }),
  );
  const out = new Float32Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const v = g[y * w + x] / 255;
      const graded = Math.pow(Math.max(0, (v - 0.09) * 1.34), 1.55) * 255;
      const fadeX = Math.min(1, Math.min(x, w - 1 - x) / (w * 0.17));
      const fadeY = Math.min(1, (h - 1 - y) / (h * 0.2));
      out[y * w + x] = graded * Math.pow(fadeX, 0.7) * fadeY + (rnd() - 0.5) * 9 * (graded > 8 ? 1 : 0.2);
    }
  }
  await writeGrey(out, w, h, "hero-panel", 82);
}

await ghost("assets/projects/daba-courses.png", { left: 100, top: 0, width: 1200, height: 1000 }, 620, "hero-ghost-work");
await ghost(`${A}headshot-three-quarter.jpg`, { left: 180, top: 120, width: 860, height: 1120 }, 620, "hero-ghost-l");
await ghost(`${A}studio-profile.jpg`, { left: 900, top: 300, width: 2600, height: 3100 }, 620, "hero-ghost-r");

// Red torn silhouette behind a figure, taken from its cut-out.
for (const [file, name] of [[DARK, "hero-outline"], [LIGHT, "hero-outline-light"]]) {
  const pad = 70;
  const src = await sharp(file).ensureAlpha().extractChannel(3).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = src.info;
  const pw = width + pad * 2;
  const ph = height + pad * 2;
  const padded = Buffer.alloc(pw * ph);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) padded[(y + pad) * pw + x + pad] = src.data[(y * width + x) * channels];
  }
  // Keep the outline open at the bottom, where the cut-out ends.
  for (let x = 0; x < width; x++) {
    for (let y = height + pad; y < ph; y++) padded[y * pw + x + pad] = src.data[((height - 1) * width + x) * channels];
  }
  const { data, info } = await sharp(padded, { raw: { width: pw, height: ph, channels: 1 } })
    .blur(13)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(pw * ph * 4);
  for (let i = 0; i < pw * ph; i++) {
    out.set(RED, i * 4);
    out[i * 4 + 3] = data[i * info.channels] > 34 + rnd() * 18 ? 255 : 0;
  }
  await writeRGBA(out, pw, ph, name, 90);
}

// Small red-toned side profile.
{
  const { data, info } = await sharp(`${A}studio-profile.jpg`)
    .extract({ left: 1050, top: 330, width: 2050, height: 2050 })
    .resize(360, 360)
    .grayscale()
    .normalise()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(360 * 360 * 3);
  for (let i = 0; i < 360 * 360; i++) {
    const v = data[i * info.channels] / 255;
    out[i * 3] = clamp(70 + v * 175);
    out[i * 3 + 1] = clamp(v * v * v * 150);
    out[i * 3 + 2] = clamp(6 + v * v * v * 130);
  }
  await sharp(out, { raw: { width: 360, height: 360, channels: 3 } }).webp({ quality: 82 }).toFile(`${OUT}hero-square.webp`);
}

// Red ink stain for the lower corners.
{
  const w = 900;
  const h = 520;
  const noise = (blur) =>
    sharp({ create: { width: w, height: h, channels: 3, background: "#808080", noise: { type: "gaussian", mean: 128, sigma: 90 } } })
      .blur(blur)
      .normalise()
      .extractChannel(0)
      .raw()
      .toBuffer();
  const [low, high] = [await noise(26), await noise(1.1)];
  const out = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      const fall = Math.max(0, 1 - Math.hypot((x / w) * 0.95, (1 - y / h) * 1.05) * 1.05);
      const v = (low[i] / 255) * 0.72 + (high[i] / 255) * 0.42;
      out.set([150, 8, 16], i * 4);
      out[i * 4 + 3] = v + fall * 1.15 > 1.02 ? clamp(Math.min(1, fall * 2.4) * 205) : 0;
    }
  }
  await writeRGBA(out, w, h, "hero-stain", 70);
}

// Section portraits, graded dark and lit from around the face.
async function spot(src, extract, width, name, { gamma, cx, cy, rx, ry }) {
  const { g, w, h } = await grey(sharp(src).extract(extract).resize({ width }).sharpen({ sigma: 1, m1: 0.7, m2: 1.4 }));
  const out = new Float32Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const v = g[y * w + x] / 255;
      const graded = Math.pow(Math.max(0, (v - 0.07) * 1.2), gamma) * 255;
      const d = Math.hypot((x / w - cx) / rx, (y / h - cy) / ry);
      const light = Math.pow(Math.max(0, 1 - d * d), 1.3);
      out[y * w + x] = graded * light + (rnd() - 0.5) * 8 * (graded * light > 8 ? 1 : 0.2);
    }
  }
  await writeGrey(out, w, h, name, 82);
}

await spot(`${A}studio-profile.jpg`, { left: 0, top: 330, width: 4000, height: 2000 }, 2400, "hero-profile", { gamma: 2.3, cx: 0.54, cy: 0.52, rx: 0.56, ry: 1.2 });
await spot(`${A}headshot-three-quarter.jpg`, { left: 210, top: 90, width: 800, height: 1200 }, 800, "hero-headshot", { gamma: 1.55, cx: 0.5, cy: 0.42, rx: 0.62, ry: 0.72 });
await spot(`${A}headshot-front.jpg`, { left: 0, top: 530, width: 1184, height: 395 }, 1800, "hero-eyes", { gamma: 1.55, cx: 0.5, cy: 0.42, rx: 0.56, ry: 1.25 });
