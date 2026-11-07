// All pixel art for the site lives here so everything shares one grid and one palette.
// Letters map to colors in globals.css (.px-*):
//   k ink   p paper   b blue    y gold    m magenta  u violet  n navy
//   i pink  o orange  h hair    s skin    w suit     v shade   d silhouette  g grey

/** Adds a 1-cell ink outline around every opaque cell, so sprites share one style. */
export function outline(rows: string[]): string[] {
  const h = rows.length;
  const w = Math.max(...rows.map((r) => r.length));
  const at = (x: number, y: number) => rows[y]?.[x] ?? ".";
  const out: string[] = [];
  for (let y = -1; y <= h; y++) {
    let row = "";
    for (let x = -1; x <= w; x++) {
      const ch = at(x, y);
      if (ch !== ".") {
        row += ch;
      } else {
        const touches =
          at(x - 1, y) !== "." ||
          at(x + 1, y) !== "." ||
          at(x, y - 1) !== "." ||
          at(x, y + 1) !== ".";
        row += touches ? "k" : ".";
      }
    }
    out.push(row);
  }
  return out;
}

/* ------------------------------------------------------------ Pixel font */
// A 5 x 7 bitmap font. Only the letters this site uses are drawn.

const GLYPH_H = 7;

export const FONT: Record<string, string[]> = {
  A: [".###.", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"],
  B: ["####.", "#...#", "#...#", "####.", "#...#", "#...#", "####."],
  C: [".####", "#....", "#....", "#....", "#....", "#....", ".####"],
  D: ["####.", "#...#", "#...#", "#...#", "#...#", "#...#", "####."],
  E: ["#####", "#....", "#....", "####.", "#....", "#....", "#####"],
  H: ["#...#", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"],
  I: ["#####", "..#..", "..#..", "..#..", "..#..", "..#..", "#####"],
  M: ["#...#", "##.##", "#.#.#", "#.#.#", "#...#", "#...#", "#...#"],
  N: ["#...#", "##..#", "#.#.#", "#.#.#", "#..##", "#...#", "#...#"],
  R: ["####.", "#...#", "#...#", "####.", "#.#..", "#..#.", "#...#"],
  S: [".####", "#....", "#....", ".###.", "....#", "....#", "####."],
  T: ["#####", "..#..", "..#..", "..#..", "..#..", "..#..", "..#.."],
  W: ["#...#", "#...#", "#...#", "#.#.#", "#.#.#", "##.##", "#...#"],
  X: ["#...#", "#...#", ".#.#.", "..#..", ".#.#.", "#...#", "#...#"],
  Z: ["#####", "....#", "...#.", "..#..", ".#...", "#....", "#####"],
};

const BLANK_GLYPH = Array.from({ length: GLYPH_H }, () => ".....");

type TextOptions = {
  /** Draw each font pixel as a scale x scale block, for thicker strokes. */
  scale?: number;
  /** Extrusion depth in cells (a chunky 3D edge toward the lower right). */
  depth?: number;
  /** Color letter for the upper four rows of each glyph. */
  top?: string;
  /** Color letter for the lower three rows. Defaults to `top`. */
  bottom?: string;
  /** Extrusion colors, nearest layer first. */
  ext?: string[];
};

/** Draws text with the bitmap font and returns sprite rows. */
export function buildText(lines: string[], options: TextOptions = {}): string[] {
  const depth = options.depth ?? 0;
  const top = options.top ?? "p";
  const bottom = options.bottom ?? top;
  const ext = options.ext ?? [];
  const lineGap = 2;
  const scale = options.scale ?? 1;

  const built = lines.map((line) => {
    const rows = Array.from({ length: GLYPH_H }, () => "");
    [...line].forEach((ch, i) => {
      const glyph = FONT[ch] ?? BLANK_GLYPH;
      for (let r = 0; r < GLYPH_H; r++) rows[r] += (i ? "." : "") + glyph[r];
    });
    return rows;
  });

  const w = Math.max(...built.map((rows) => rows[0].length));
  const h = built.length * GLYPH_H + (built.length - 1) * lineGap;
  const grid = Array.from({ length: h * scale + depth }, () =>
    Array<string>(w * scale + depth).fill("."),
  );

  const main: Array<[number, number, string]> = [];
  built.forEach((rows, li) => {
    const pad = Math.floor((w - rows[0].length) / 2);
    rows.forEach((row, r) => {
      [...row].forEach((c, x) => {
        if (c === "#") {
          for (let dy = 0; dy < scale; dy++) {
            for (let dx = 0; dx < scale; dx++) {
              main.push([
                (x + pad) * scale + dx,
                (li * (GLYPH_H + lineGap) + r) * scale + dy,
                r < 4 ? top : bottom,
              ]);
            }
          }
        }
      });
    });
  });

  // Farthest extrusion layer first, so nearer layers draw over it.
  for (let k = depth; k >= 1; k--) {
    for (const [x, y] of main) grid[y + k][x + k] = ext[k - 1] ?? "n";
  }
  for (const [x, y, c] of main) grid[y][x] = c;

  return grid.map((r) => r.join(""));
}

/* --------------------------------------------------------------- Sprites */

// Pageant crown, 13 x 5 plus outline.
export const CROWN: string[] = outline([
  "y.....y.....y",
  "yy...yyy...yy",
  "yyy.yyyyy.yyy",
  "yyyyyyyyyyyyy",
  "yymyyymyyymyy",
]);

// Andrei, bust portrait in a white suit and crown. 12 x 16 plus outline.
export const BUST: string[] = outline([
  "..y..yy..y..",
  "..yyyyyyyy..",
  "..yymyymyy..",
  "..hhhhhhhh..",
  ".hhhhhhhhhh.",
  ".hhsssssshh.",
  ".hssksskssh.",
  ".hssssssssh.",
  "..sssmmsss..",
  "...ssssss...",
  "....ssss....",
  "wwwwwsswwwww",
  "wwwwvmmvwwww",
  "wwwwvmmvwwww",
  "wwwwvvvvwwww",
  "wwwwwwwwwwww",
]);

// Laptop, 24 x 16. The screen shows a "</>" glyph.
const GLYPH = [
  "bbbbbpbbbbpbpbbbbb",
  "bbbbpbbbbbpbbpbbbb",
  "bbbpbbbbbpbbbbpbbb",
  "bbbbpbbbpbbbbpbbbb",
  "bbbbbpbbpbbbpbbbbb",
];
const BLANK = "b".repeat(18);
const screen = (inner: string) => `..k${inner}k..`;

export const LAPTOP: string[] = [
  "..kkkkkkkkkkkkkkkkkkkk..",
  ...[BLANK, BLANK, ...GLYPH, BLANK, BLANK, BLANK, BLANK].map(screen),
  "kkkkkkkkkkkkkkkkkkkkkkkk",
  "k" + "g".repeat(22) + "k",
  "k" + "g".repeat(8) + "k".repeat(6) + "g".repeat(8) + "k",
  ".kkkkkkkkkkkkkkkkkkkkkk.",
];

// Camera, 14 x 10.
export const CAMERA: string[] = [
  "....kkkk......",
  "kkkkkkkkkkkkkk",
  "k" + "u".repeat(12) + "k",
  "kuuukkkkkuuyyk",
  "kuukbbbbbkuuuk",
  "kukbbppbbbkuuk",
  "kukbbpbbbbkuuk",
  "kuukbbbbbkuuuk",
  "kuuukkkkkuuuuk",
  "kkkkkkkkkkkkkk",
];

// Medal, 12 x 13 plus outline: magenta ribbon, gold disc.
export const MEDAL: string[] = outline([
  "mm........mm",
  ".mmm....mmm.",
  "..mmm..mmm..",
  "...mmmmmm...",
  "....mmmm....",
  "...yyyyyy...",
  "..yyyyyyyy..",
  ".yyyyppyyyy.",
  ".yyyyyyyyyy.",
  ".yyyyyyyyyy.",
  ".yyyyyyyyyy.",
  "..yyyyyyyy..",
  "...yyyyyy...",
]);

/** Right-pointing arrow used for menus and buttons. */
export const arrow = (ch: string): string[] =>
  ["x...", "xx..", "xxx.", "xxxx", "xxx.", "xx..", "x..."].map((r) =>
    r.replace(/x/g, ch),
  );

/** Quest marker: a diamond in the given color. */
export const diamond = (ch: string): string[] =>
  [
    "....x....",
    "...xxx...",
    "..xxxxx..",
    ".xxxxxxx.",
    "xxxxxxxxx",
    ".xxxxxxx.",
    "..xxxxx..",
    "...xxx...",
    "....x....",
  ].map((r) => r.replace(/x/g, ch));
