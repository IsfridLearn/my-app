// Regenerates every image in public/photos from the originals in assets/portraits.
// Run with: node scripts/make-plates.mjs
// When higher-resolution originals arrive, replace the two files and run this again.
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const DARK = "assets/portraits/black-suit.png";
const LIGHT = "assets/portraits/white-suit.png";
const OUT = "public/photos/";

const P = 'assets/photos/';

// Close-ups for the proof sheet: file, left, top, width, height.
const CROPS = [
  [P + 'studio-profile.jpg', 1350, 1050, 1000, 750],
  [P + 'gold-drape.jpg', 240, 240, 420, 315],
  [P + 'ilang-2026.jpg', 410, 200, 240, 180],
  [P + 'stage-walk.jpg', 430, 40, 240, 180],
  [P + 'studio-profile.jpg', 2040, 1485, 600, 450],
  [P + 'ilang-2025.jpg', 500, 430, 240, 180],
  [P + 'ilang-2025.jpg', 490, 215, 240, 180],
  [P + 'studio-profile.jpg', 1410, 3020, 800, 600],
];

// Larger pictures: output name, file, crop (left, top, width, height), output width.
const PLATES = [
  ['plate-profile', P + 'studio-profile.jpg', [0, 330, 4000, 2000], 2800],
  ['plate-set', P + 'gold-set.jpg', [150, 190, 760, 1060]],
  ['plate-gold', P + 'gold-drape.jpg', [0, 100, 1080, 990]],
  ['plate-ilang-2026', P + 'ilang-2026.jpg', [0, 0, 1080, 1080]],
  ['plate-ilang-2025', P + 'ilang-2025.jpg', [90, 0, 900, 1085]],
  ['plate-stage', P + 'stage-walk.jpg', [230, 10, 620, 900]],
];

const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];
const threshold = (x, y) => (BAYER[y % 4][x % 4] + 0.5) / 16;

async function oneBit(file, width, height, value) {
  const out = Buffer.alloc(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      out[y * width + x] = value(x, y) > threshold(x, y) ? 255 : 0;
    }
  }
  await sharp(out, { raw: { width, height, channels: 1 } })
    .png({ palette: true, colours: 2, compressionLevel: 9 })
    .toFile(file);
}

// Seeded so re-running the script gives identical files.
function noiseSource(seed) {
  let s = seed;
  const uniform = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  return () => Math.sqrt(-2 * Math.log(uniform() || 1e-9)) * Math.cos(2 * Math.PI * uniform());
}

const GRAIN = 6;
const SHARPEN = { sigma: 0.9, m1: 0.7, m2: 1.8 };

// Writes a sharpened greyscale image with film grain. Grain follows the
// midtones and fades out at pure black and pure white, so the black suit still
// melts into the black page and the white suit into the white page.
async function develop(pipeline, file, seed) {
  const { data, info } = await pipeline.sharpen(SHARPEN).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const hasAlpha = channels === 2 || channels === 4;
  const next = noiseSource(seed);
  const field = Float32Array.from({ length: (width + 1) * (height + 1) }, next);
  const out = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      const p = i * channels;
      const value = channels >= 3 ? 0.2126 * data[p] + 0.7152 * data[p + 1] + 0.0722 * data[p + 2] : data[p];
      const tone = value / 255;
      // A 2x2 average keeps the grain from vanishing when the image is scaled.
      const n = (field[i + y] + field[i + y + 1] + field[i + y + width + 1] + field[i + y + width + 2]) / 2;
      const grey = Math.max(0, Math.min(255, Math.round(value + n * GRAIN * Math.min(1, 4.4 * tone * (1 - tone)))));
      out.fill(grey, i * 4, i * 4 + 3);
      out[i * 4 + 3] = hasAlpha ? data[i * channels + channels - 1] : 255;
    }
  }
  await sharp(out, { raw: { width, height, channels: 4 } })
    .webp({ quality: 88, alphaQuality: 90 })
    .toFile(file);
}

await mkdir(OUT, { recursive: true });

// Colour is removed inside develop, because sharp drops transparency on greyscale raw output.
await develop(sharp(DARK).ensureAlpha(), `${OUT}print-dark.webp`, 11);
await develop(sharp(LIGHT).ensureAlpha(), `${OUT}print-light.webp`, 23);

for (const [i, [file, left, top, width, height]] of CROPS.entries()) {
  const base = sharp(file)
    .extract({ left, top, width, height })
    .grayscale();
  await develop(base.clone().resize(640, 480, { kernel: "lanczos3" }), `${OUT}frame-${i + 1}.webp`, 100 + i);
  const { data } = await base.clone().resize(240, 180).normalise().raw().toBuffer({ resolveWithObject: true });
  await oneBit(`${OUT}frame-${i + 1}-dither.png`, 240, 180, (x, y) => data[y * 240 + x] / 255);
}

for (const [i, [name, file, [left, top, width, height], outWidth]] of PLATES.entries()) {
  let pipeline = sharp(file).extract({ left, top, width, height }).grayscale();
  if (outWidth) pipeline = pipeline.resize({ width: outWidth, kernel: "lanczos3" });
  await develop(pipeline, `${OUT}${name}.webp`, 200 + i);
}

// The black-to-white edge between Beyond the Screen and About.
await oneBit(`${OUT}dither-edge.png`, 4, 24, (_x, y) => y / 23);

// Social preview: the dark print on black.
const figure = await sharp(DARK).grayscale().resize({ height: 830 }).extract({ left: 0, top: 0, width: 626, height: 630 }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: "#000000" } })
  .composite([{ input: figure, left: 530, top: 0 }])
  .jpeg({ quality: 82 })
  .toFile(`${OUT}social.jpg`);
