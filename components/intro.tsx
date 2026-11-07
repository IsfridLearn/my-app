"use client";

import type { CSSProperties } from "react";
import { Sprite } from "./pixel";
import {
  BLASTS,
  BULLET_L,
  BULLET_R,
  COLOR_VAR,
  CRACKS_1,
  CRACKS_2,
  DEBRIS,
  FLASH,
  GUN,
  LAPTOP,
} from "./sprites";

type IntroProps = {
  /** Called when the sequence finishes on its own. */
  onDone: () => void;
  /** Called when the visitor skips it. */
  onSkip: () => void;
};

/**
 * Opening sequence (about 2.9 s). The timeline lives in globals.css:
 *   0.5 s, 1.1 s, 1.7 s  both guns fire
 *   0.78 s, 1.38 s       bullets land, laptop cracks
 *   2.0 s                laptop explodes, BOOM
 *   2.9 s                overlay ends and the page reveals
 */
export function Intro({ onDone, onSkip }: IntroProps) {
  return (
    <div
      className="intro"
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget && e.animationName === "intro-out") {
          onDone();
        }
      }}
    >
      <div className="stage" aria-hidden="true">
        <div className="laptop">
          <Sprite rows={LAPTOP} />
          <Sprite className="cracks crack-1" rows={CRACKS_1} />
          <Sprite className="cracks crack-2" rows={CRACKS_2} />
        </div>

        <div className="gun gun-l">
          <div className="gun-slide">
            <div className="gun-body">
              <Sprite rows={GUN} />
            </div>
            <Sprite className="flash" rows={FLASH} />
          </div>
        </div>
        <div className="gun gun-r">
          <div className="gun-slide">
            <div className="gun-body">
              <Sprite rows={GUN} />
            </div>
            <Sprite className="flash" rows={FLASH} />
          </div>
        </div>

        <Sprite className="bullet bullet-l" rows={BULLET_L} />
        <Sprite className="bullet bullet-r" rows={BULLET_R} />

        <Sprite className="blast blast-1" rows={BLASTS[0]} />
        <Sprite className="blast blast-2" rows={BLASTS[1]} />
        <Sprite className="blast blast-3" rows={BLASTS[2]} />

        {DEBRIS.map(([dx, dy, size, color], i) => (
          <span
            key={i}
            className="debris"
            style={
              {
                "--dx": dx,
                "--dy": dy,
                "--s": size,
                background: `var(${COLOR_VAR[color]})`,
              } as CSSProperties
            }
          />
        ))}

        <p className="boom">BOOM</p>
      </div>

      <button type="button" className="intro-skip" onClick={onSkip}>
        Skip intro
      </button>
    </div>
  );
}
