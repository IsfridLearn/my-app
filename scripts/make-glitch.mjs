// Generates the hero's signal-interference texture: black, with torn horizontal
// bands of grey noise, like a weak analogue TV signal.
// Run with: node scripts/make-glitch.mjs
import sharp from "sharp";

const W = 1200;
const H = 700;

// Seeded so re-running the script gives an identical file.
let seed = 1337;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);

const px = new Float32Array(W * H);

let y = 0;
while (y < H) {
  const band = 1 + Math.floor(rnd() * rnd() * 22);
  // Most rows stay black; some carry a torn strip of signal.
  if (rnd() < 0.42) {
    const level = 40 + rnd() * 215;
    const start = Math.floor(rnd() * W * 0.6);
    const length = Math.floor(W * (0.15 + rnd() * 0.85));
    const grain = 2 + Math.floor(rnd() * 14);
    for (let row = y; row < Math.min(H, y + band); row++) {
      let x = start;
      while (x < Math.min(W, start + length)) {
        // Blocky runs of brightness, broken by gaps.
        const run = grain + Math.floor(rnd() * grain * 3);
        const on = rnd() < 0.7;
        const value = on ? level * (0.35 + rnd() * 0.65) : 0;
        for (let i = x; i < Math.min(W, x + run); i++) px[row * W + i] = value;
        x += run;
      }
    }
  }
  y += band;
}

// A few thin, bright scan lines across the whole width.
for (let n = 0; n < 9; n++) {
  const row = Math.floor(rnd() * H);
  for (let x = 0; x < W; x++) px[row * W + x] = Math.max(px[row * W + x], 150 + rnd() * 105);
}

const out = Buffer.alloc(W * H);
for (let i = 0; i < out.length; i++) out[i] = Math.max(0, Math.min(255, Math.round(px[i])));

await sharp(out, { raw: { width: W, height: H, channels: 1 } })
  .webp({ quality: 70 })
  .toFile("public/photos/hero-interference.webp");
console.log("public/photos/hero-interference.webp");

// A wear mask for the giant name: opaque, with fine specks and a few thin
// horizontal scratches knocked out, like a worn poster print.
{
  const GW = 900;
  const GH = 260;
  const rgba = Buffer.alloc(GW * GH * 4, 255);
  const knock = (x, y, a) => {
    if (x < 0 || y < 0 || x >= GW || y >= GH) return;
    const i = (y * GW + x) * 4 + 3;
    rgba[i] = Math.min(rgba[i], a);
  };
  for (let n = 0; n < 5200; n++) {
    const x = Math.floor(rnd() * GW);
    const y = Math.floor(rnd() * GH);
    const size = rnd() < 0.85 ? 1 : 2;
    for (let dy = 0; dy < size; dy++) for (let dx = 0; dx < size; dx++) knock(x + dx, y + dy, Math.floor(rnd() * 90));
  }
  for (let n = 0; n < 7; n++) {
    const y = Math.floor(rnd() * GH);
    const x0 = Math.floor(rnd() * GW * 0.7);
    const length = Math.floor(GW * (0.1 + rnd() * 0.5));
    for (let x = x0; x < Math.min(GW, x0 + length); x++) if (rnd() < 0.8) knock(x, y, 40);
  }
  await sharp(rgba, { raw: { width: GW, height: GH, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile("public/photos/hero-grain.png");
  console.log("public/photos/hero-grain.png");
}
