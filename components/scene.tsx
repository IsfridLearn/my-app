import type { CSSProperties, ReactElement } from "react";

// The pixel-art sunset. One 192 x 108 grid: banded sky, stars, a low sun,
// drifting clouds, three hill layers and a small silhouette at the horizon.

const W = 192;
const H = 108;

const BANDS: Array<[string, number]> = [
  ["#0b0820", 20],
  ["#140d33", 14],
  ["#1f1248", 12],
  ["#31175c", 10],
  ["#4d1a6b", 8],
  ["#7a2178", 7],
  ["#b02f86", 6],
  ["#e0508f", 5],
  ["#ff7f8e", 4],
  ["#ff9a5c", 6],
];

const BAND_RECTS = (() => {
  let y = 0;
  return BANDS.map(([color, h]) => {
    const rect = { y, h, color };
    y += h;
    return rect;
  });
})();
const LAST = BAND_RECTS[BAND_RECTS.length - 1];
const SKY_END = LAST.y + LAST.h;

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

type Star = {
  x: number;
  y: number;
  color: string;
  plus: boolean;
  twinkle: boolean;
  delay: number;
};

const STARS: Star[] = (() => {
  const r = rng(7);
  const colors = ["#ece8ff", "#ffd6ec", "#9fd0ff"];
  return Array.from({ length: 48 }, (_, i) => ({
    x: 2 + Math.floor(r() * (W - 4)),
    y: 2 + Math.floor(r() * 58),
    color: colors[Math.floor(r() * 3)],
    plus: i % 9 === 0,
    twinkle: i % 4 === 0,
    delay: Math.round(r() * 40) / 10,
  }));
})();

/* ---------------------------------------------------------------- Clouds */

const CLOUD_HIGH = { a: "#2a1656", b: "#43237a", c: "#7a2f86" };
const CLOUD_LOW = { a: "#6a2a86", b: "#a8368c", c: "#ff7f8e" };

const CLOUD_BIG = [
  "..........aaaaaa.............",
  "......aaaabbbbbbaaa..........",
  "....aabbbbbbbbbbbbbaaaa......",
  "..aabbbbbbbbbbbbbbbbbbbbaa...",
  ".abbbbbbbbbbbbbbbbbbbbbbbbba.",
  "abbbbbbbbbbbbbbbbbbbbbbbbbbba",
  ".cbbbbbbbbbbbbbbbbbbbbbbbbbc.",
  "..ccccccccccccccccccccccccc..",
];
const CLOUD_SMALL = [
  "......aaaa..........",
  "...aaabbbbaaa.......",
  ".aabbbbbbbbbbaaa....",
  "abbbbbbbbbbbbbbba...",
  ".cbbbbbbbbbbbbbbc...",
  "..cccccccccccccc....",
];
const CLOUD_STREAK = [
  "....aaaaaaaa......aaaaa.............",
  "..aabbbbbbbbbaaaaabbbbbbaaa.........",
  "...cccccccccccccccccccccc...........",
];

const CLOUDS: Array<{
  rows: string[];
  palette: Record<string, string>;
  y: number;
  dur: number;
  delay: number;
}> = [
  { rows: CLOUD_BIG, palette: CLOUD_HIGH, y: 14, dur: 300, delay: -120 },
  { rows: CLOUD_SMALL, palette: CLOUD_HIGH, y: 26, dur: 340, delay: -260 },
  { rows: CLOUD_STREAK, palette: CLOUD_HIGH, y: 36, dur: 240, delay: -40 },
  { rows: CLOUD_BIG, palette: CLOUD_LOW, y: 62, dur: 260, delay: -90 },
  { rows: CLOUD_STREAK, palette: CLOUD_LOW, y: 73, dur: 200, delay: -150 },
];

/* ------------------------------------------------------------------ Hills */

function hill(base: number, amp: number, f1: number, f2: number, ph: number) {
  return (x: number) =>
    Math.round(
      base + amp * Math.sin(x / f1 + ph) + amp * 0.5 * Math.sin(x / f2 + ph * 2.3),
    );
}

const farY = hill(91, 2.5, 14, 5, 0.4);
const midY = hill(98, 3, 19, 6.5, 1.7);
const nearY = hill(105, 2, 28, 8, 3.1);

function hillPath(y: (x: number) => number): string {
  let d = `M0 ${H}V${y(0)}`;
  for (let x = 1; x <= W; x++) d += `H${x}V${y(Math.min(x, W - 1))}`;
  return `${d}V${H}Z`;
}

/* ----------------------------------------------------------------- Walker */

// A lone figure at the horizon: a backlit silhouette with a soft pink rim light.
const WALKER = [
  "...ddd...",
  "..idddd..",
  "..idddd..",
  "...ddd...",
  ".idddddd.",
  "idddddddd",
  "id.ddd.dd",
  "id.ddd.dd",
  "id.ddd.dd",
  ".d.ddd.d.",
  "...ddd...",
  "...d.d...",
  "...d.d...",
  "..dd.dd..",
];
const WALKER_PALETTE = { d: "#0e0922", i: "#ff9ccf" };
const WALKER_X = 112;
const WALKER_FEET = Math.max(
  ...Array.from({ length: 9 }, (_, i) => midY(WALKER_X + i)),
);

/* ---------------------------------------------------------------- Helpers */

function spriteRects(
  rows: string[],
  palette: Record<string, string>,
  prefix: string,
): ReactElement[] {
  const rects: ReactElement[] = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      if (ch === "." || !palette[ch]) {
        x += 1;
        continue;
      }
      let end = x + 1;
      while (end < row.length && row[end] === ch) end += 1;
      rects.push(
        <rect
          key={`${prefix}-${x}-${y}`}
          x={x}
          y={y}
          width={end - x}
          height={1}
          fill={palette[ch]}
        />,
      );
      x = end;
    }
  });
  return rects;
}

function disc(cx: number, cy: number, r: number, color: string, prefix: string) {
  const rects: ReactElement[] = [];
  for (let dy = -r; dy <= r; dy++) {
    const hw = Math.floor(Math.sqrt(r * r - dy * dy));
    rects.push(
      <rect
        key={`${prefix}-${dy}`}
        x={cx - hw}
        y={cy + dy}
        width={hw * 2 + 1}
        height={1}
        fill={color}
      />,
    );
  }
  return rects;
}

type SceneProps = {
  /** Unique per instance on the page, so SVG pattern ids never collide. */
  idPrefix: string;
  className?: string;
  /** Twinkling stars and drifting clouds. Off for small previews. */
  animated?: boolean;
};

export function Scene({ idPrefix, className, animated = true }: SceneProps) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {BAND_RECTS.slice(0, -1).map((band, i) => (
          <pattern
            key={i}
            id={`${idPrefix}-d${i}`}
            width="2"
            height="2"
            patternUnits="userSpaceOnUse"
          >
            <rect width="2" height="2" fill={band.color} />
            <rect width="1" height="1" fill={BAND_RECTS[i + 1].color} />
            <rect x="1" y="1" width="1" height="1" fill={BAND_RECTS[i + 1].color} />
          </pattern>
        ))}
      </defs>

      {/* Sky: flat bands with a dithered seam between each */}
      {BAND_RECTS.map((b, i) => (
        <rect key={i} x={0} y={b.y} width={W} height={b.h} fill={b.color} />
      ))}
      <rect x={0} y={SKY_END} width={W} height={H - SKY_END} fill={LAST.color} />
      {BAND_RECTS.slice(1).map((b, i) => (
        <rect
          key={i}
          x={0}
          y={b.y - 1}
          width={W}
          height={1}
          fill={`url(#${idPrefix}-d${i})`}
        />
      ))}

      {/* Stars */}
      {STARS.map((s, i) => {
        const cls = animated && s.twinkle ? "twinkle" : undefined;
        const style = cls
          ? ({ "--d": `${s.delay}s` } as CSSProperties)
          : undefined;
        return s.plus ? (
          <g key={i} className={cls} style={style} fill={s.color}>
            <rect x={s.x - 1} y={s.y} width={3} height={1} />
            <rect x={s.x} y={s.y - 1} width={1} height={3} />
          </g>
        ) : (
          <rect
            key={i}
            className={cls}
            style={style}
            x={s.x}
            y={s.y}
            width={1}
            height={1}
            fill={s.color}
          />
        );
      })}

      {/* Sun, mostly hidden behind the far hills */}
      {disc(100, 90, 13, "#ffb45c", `${idPrefix}-sun`)}
      {disc(100, 90, 10, "#ffe08a", `${idPrefix}-core`)}

      {/* Clouds */}
      {CLOUDS.map((c, i) => (
        <g key={i} transform={`translate(0 ${c.y})`}>
          <g
            className={animated ? "drift" : undefined}
            style={
              animated
                ? ({
                    "--dur": `${c.dur}s`,
                    "--delay": `${c.delay}s`,
                  } as CSSProperties)
                : { transform: `translateX(${20 + i * 38}px)` }
            }
          >
            {spriteRects(c.rows, c.palette, `${idPrefix}-c${i}`)}
          </g>
        </g>
      ))}

      {/* Land */}
      <path d={hillPath(farY)} fill="#2d1659" />
      <path d={hillPath(midY)} fill="#1a0d3a" />
      <g transform={`translate(${WALKER_X} ${WALKER_FEET - WALKER.length + 1})`}>
        {spriteRects(WALKER, WALKER_PALETTE, `${idPrefix}-w`)}
      </g>
      <path d={hillPath(nearY)} fill="#0e0922" />
    </svg>
  );
}
