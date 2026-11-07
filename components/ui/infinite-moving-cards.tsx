"use client";

import type { CSSProperties, ReactNode } from "react";

type MovingCard = {
  title: string;
};

type InfiniteMovingCardsProps<T extends MovingCard> = {
  items: T[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  renderItem: (item: T, index: number, isDuplicate: boolean) => ReactNode;
};

const animationDurations = {
  fast: "20s",
  normal: "40s",
  slow: "60s",
};

export function InfiniteMovingCards<T extends MovingCard>({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className = "",
  renderItem,
}: InfiniteMovingCardsProps<T>) {
  const style = {
    "--animation-duration": animationDurations[speed],
    "--animation-direction": direction === "left" ? "normal" : "reverse",
  } as CSSProperties;

  return (
    <div
      className={`infinite-moving-cards${pauseOnHover ? " pause-on-hover" : ""} ${className}`}
      style={style}
    >
      <ul className="infinite-moving-cards-track animate-scroll">
        {Array.from({ length: 10 }, (_, copyIndex) =>
          items.map((item, index) => (
            <li
              aria-hidden={copyIndex > 0 || undefined}
              className="infinite-moving-cards-item"
              data-copy={copyIndex > 0 || undefined}
              key={`${copyIndex}-${item.title}-${index}`}
            >
              {renderItem(item, index, copyIndex > 0)}
            </li>
          )),
        )}
      </ul>
    </div>
  );
}
