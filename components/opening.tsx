"use client";

import { useEffect, useRef } from "react";
import { Sprite } from "./pixel";
import { Scene } from "./scene";
import { arrow, buildText } from "./sprites";

const TITLE = buildText(["ANDREI", "SANCHEZ"], {
  scale: 2,
  depth: 2,
  top: "p",
  bottom: "i",
  ext: ["u", "n"],
});
const ARROW = arrow("k");

type OpeningProps = {
  leaving: boolean;
  onEnter: () => void;
  onLeft: () => void;
};

export function Opening({ leaving, onEnter, onLeft }: OpeningProps) {
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    button.current?.focus();
  }, []);

  return (
    <div
      className={leaving ? "opening is-leaving" : "opening"}
      role="region"
      aria-label="Opening screen"
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget && e.animationName === "curtain") {
          onLeft();
        }
      }}
    >
      <Scene idPrefix="open" className="opening-scene" />

      <div className="opening-copy">
        <div role="img" aria-label="Andrei Sanchez">
          <Sprite rows={TITLE} className="opening-title" />
        </div>
        <p className="opening-sub">BSIT student, developer, brand ambassador and model.</p>
        <button
          ref={button}
          type="button"
          className="enter"
          onClick={onEnter}
          disabled={leaving}
        >
          <Sprite rows={ARROW} unit="3px" />
          Enter
        </button>
      </div>
    </div>
  );
}
