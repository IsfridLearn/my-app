"use client";
import React, { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

export const BackgroundRippleEffect = ({
  rows = 8,
  cols = 27,
  cellSize = 56,
  className,
}: {
  rows?: number;
  cols?: number;
  cellSize?: number;
  className?: string;
}) => {
  return (
    <div className={cn("absolute inset-0 h-full w-full", className)}>
      <div className="relative h-auto w-auto overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden" />
        <DivGrid
          className="mask-radial-from-20% mask-radial-at-top opacity-60"
          rows={rows}
          cols={cols}
          cellSize={cellSize}
          borderColor="var(--cell-border-color)"
          fillColor="var(--cell-fill-color)"
          interactive
        />
      </div>
    </div>
  );
};

type DivGridProps = {
  className?: string;
  rows: number;
  cols: number;
  cellSize: number; // in pixels
  borderColor: string;
  fillColor: string;
  interactive?: boolean;
};

const DivGrid = ({
  className,
  rows = 7,
  cols = 30,
  cellSize = 56,
  borderColor = "#3f3f46",
  fillColor = "rgba(14,165,233,0.3)",
  interactive = true,
}: DivGridProps) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols],
  );
  const animationFrameRef = useRef<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(
    () => () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    },
    [],
  );

  const handleGridClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const clickedCell = target.closest<HTMLElement>(".cell");
    const grid = gridRef.current;
    if (!clickedCell || !grid || !grid.contains(clickedCell)) {
      return;
    }

    const clickedRow = Number(clickedCell.dataset.row);
    const clickedCol = Number(clickedCell.dataset.col);
    const gridCells = grid.querySelectorAll<HTMLElement>(".cell");

    gridCells.forEach((cell) => {
      const distance =
        Math.abs(clickedRow - Number(cell.dataset.row)) +
        Math.abs(clickedCol - Number(cell.dataset.col));

      cell.classList.remove("is-rippling");
      cell.style.setProperty("--delay", `${distance * 18}ms`);
      cell.style.setProperty("--duration", `${350 + distance * 24}ms`);
    });

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      gridCells.forEach((cell) => cell.classList.add("is-rippling"));
    });
  };

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: cols * cellSize,
    height: rows * cellSize,
    marginInline: "auto",
  };

  return (
    <div
      ref={gridRef}
      className={cn("relative z-[3]", className)}
      style={gridStyle}
      onClick={interactive ? handleGridClick : undefined}
    >
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / cols);
        const colIdx = idx % cols;

        return (
          <div
            key={idx}
            className={cn(
              "cell relative border-[0.5px] opacity-40 transition-opacity duration-150 hover:opacity-80 dark:shadow-[0px_0px_40px_1px_var(--cell-shadow-color)_inset]",
              !interactive && "pointer-events-none",
            )}
            data-row={rowIdx}
            data-col={colIdx}
            style={{
              backgroundColor: fillColor,
              borderColor: borderColor,
            }}
          />
        );
      })}
    </div>
  );
};
