// All pixel art lives here so every sprite shares one grid and one 6-color palette.
// Characters map to colors: k ink, p paper, b blue, g grey, y gold, r red. "." is empty.

export const COLOR_VAR: Record<string, string> = {
  k: "--c-ink",
  p: "--c-paper",
  b: "--c-blue",
  g: "--c-grey",
  y: "--c-gold",
  r: "--c-red",
};

/** Adds a 1px ink outline around every opaque pixel, so sprites share one style. */
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

function fromPoints(
  w: number,
  h: number,
  pts: Array<[number, number]>,
  ch: string,
): string[] {
  const grid = Array.from({ length: h }, () => Array<string>(w).fill("."));
  for (const [x, y] of pts) grid[y][x] = ch;
  return grid.map((r) => r.join(""));
}

/** A chunky pixel explosion: paper core, gold body, red rim, ragged edge. */
function blast(n: number): string[] {
  const c = (n - 1) / 2;
  const rows: string[] = [];
  for (let y = 0; y < n; y++) {
    let row = "";
    for (let x = 0; x < n; x++) {
      const d = Math.hypot(x - c, y - c) / c;
      const e = d + (((x * 37 + y * 91 + n * 13) % 7) / 7) * 0.3 - 0.15;
      row += e > 1 ? "." : e < 0.35 ? "p" : e < 0.7 ? "y" : "r";
    }
    rows.push(row);
  }
  return rows;
}

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

// Cracks overlay the laptop screen (same 24 x 16 canvas).
const CRACK_A: Array<[number, number]> = [
  [3, 6], [4, 6], [5, 7], [6, 7], [6, 8], [7, 9],
  [20, 6], [19, 6], [18, 7], [17, 7], [17, 8], [16, 9],
];
const CRACK_B: Array<[number, number]> = [
  [7, 6], [8, 6], [9, 5], [5, 5], [5, 4], [6, 3], [8, 10], [9, 10],
  [16, 6], [15, 6], [14, 5], [18, 5], [18, 4], [17, 3], [15, 10], [14, 10],
];
export const CRACKS_1 = fromPoints(24, 16, CRACK_A, "p");
export const CRACKS_2 = fromPoints(24, 16, CRACK_B, "p");

// Pistol facing right, 17 x 10. The right-hand gun is this same sprite mirrored.
export const GUN: string[] = [
  ".kkkkkkkkkkkkkkk.",
  "kgggggggggggggggk",
  "kgpppppppppppgggk",
  "kgggggggggggggggk",
  ".kkkkkkkkkkkkkkk.",
  ".kgggkkkkkk......",
  ".kgggk....k......",
  ".kgggkkkkkk......",
  ".kgggk...........",
  "..kkk............",
];

export const FLASH: string[] = [
  "..y..",
  ".yry.",
  "yrpry",
  ".yry.",
  "..y..",
];

export const BULLET_L: string[] = ["kkky", "kkky"];
export const BULLET_R: string[] = ["ykkk", "ykkk"];

export const BLASTS: string[][] = [blast(9), blast(17), blast(25)];

// [dx, dy, size, color] in sprite units, flying out from the laptop's center.
export const DEBRIS: Array<[number, number, number, string]> = [
  [-26, -12, 2, "b"],
  [-20, -16, 1, "p"],
  [-14, -18, 2, "g"],
  [-8, -17, 1, "y"],
  [0, -19, 2, "b"],
  [9, -17, 1, "p"],
  [17, -16, 2, "g"],
  [25, -12, 1, "y"],
  [-28, 2, 1, "p"],
  [27, 4, 2, "b"],
  [-22, 13, 2, "g"],
  [-10, 15, 1, "y"],
  [12, 16, 2, "p"],
  [23, 12, 1, "b"],
  [-3, 16, 1, "r"],
];

// The one gold thing on the site: a pageant king's crown, 13 x 5 plus outline.
export const CROWN: string[] = outline([
  "y.....y.....y",
  "yy...yyy...yy",
  "yyy.yyyyy.yyy",
  "yyyyyyyyyyyyy",
  "yybyyyryyybyy",
]);
