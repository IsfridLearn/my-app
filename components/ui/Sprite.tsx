import type { CSSProperties, ReactElement } from "react";

type SpriteProps = {
  rows: string[];
  className?: string;
  /** Overrides the pixel size for this sprite, e.g. "6px". Defaults to the inherited --u. */
  unit?: string;
};

/** Draws a string-grid sprite as crisp SVG rects. One grid cell = one --u. */
export function Sprite({ rows, className, unit }: SpriteProps) {
  const h = rows.length;
  const w = Math.max(...rows.map((r) => r.length));
  const rects: ReactElement[] = [];

  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      if (ch === ".") {
        x += 1;
        continue;
      }
      let end = x + 1;
      while (end < row.length && row[end] === ch) end += 1;
      rects.push(
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width={end - x}
          height={1}
          className={`px-${ch}`}
        />,
      );
      x = end;
    }
  });

  const style = {
    width: `calc(var(--u) * ${w})`,
    height: `calc(var(--u) * ${h})`,
    ...(unit ? { "--u": unit } : {}),
  } as CSSProperties;

  return (
    <svg
      className={className ? `sprite ${className}` : "sprite"}
      viewBox={`0 0 ${w} ${h}`}
      style={style}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      {rects}
    </svg>
  );
}
