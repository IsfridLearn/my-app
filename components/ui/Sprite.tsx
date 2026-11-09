import type { CSSProperties, ReactElement } from "react";

// The only pixel art on the site: the AS monogram and the link arrow.
// "f" cells take the current text color, so sprites work on black and on white.
const LETTER_A = [".fff.", "f...f", "f...f", "fffff", "f...f", "f...f", "f...f"];
const LETTER_S = [".ffff", "f....", "f....", ".fff.", "....f", "....f", "ffff."];
const MONOGRAM = LETTER_A.map((row, index) => `${row}.${LETTER_S[index]}`);
const ARROW = ["fffff", "...ff", "..f.f", ".f..f", "f...."];

type SpriteProps = {
  rows: string[];
  /** The size of one grid cell, e.g. "2px". */
  unit: string;
};

/** Draws a string-grid sprite as crisp SVG rects. */
function Sprite({ rows, unit }: SpriteProps) {
  const gridHeight = rows.length;
  const gridWidth = Math.max(...rows.map((row) => row.length));
  const rects: ReactElement[] = [];

  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const cell = row[x];
      if (cell === ".") {
        x += 1;
        continue;
      }

      // Merge a run of matching cells into one rect.
      let end = x + 1;
      while (end < row.length && row[end] === cell) end += 1;

      rects.push(
        <rect key={`${x}-${y}`} x={x} y={y} width={end - x} height={1} className={`px-${cell}`} />,
      );
      x = end;
    }
  });

  const style = {
    width: `calc(var(--u) * ${gridWidth})`,
    height: `calc(var(--u) * ${gridHeight})`,
    "--u": unit,
  } as CSSProperties;

  return (
    <svg
      className="sprite"
      viewBox={`0 0 ${gridWidth} ${gridHeight}`}
      style={style}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      {rects}
    </svg>
  );
}

export function Arrow({ unit = "2px" }: { unit?: string }) {
  return <Sprite rows={ARROW} unit={unit} />;
}

export function Monogram() {
  return <Sprite rows={MONOGRAM} unit="2px" />;
}
