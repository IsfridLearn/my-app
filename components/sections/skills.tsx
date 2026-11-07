"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { Sprite } from "../pixel";
import { buildText } from "../sprites";
import { skills } from "@/lib/content";

const SLOTS = 8;
const COLS = 4;

const MONO_COLOR = { code: "b", stage: "m" } as const;
const MONOS: Record<string, string[]> = Object.fromEntries(
  skills.map((s) => [s.id, buildText([s.mono], { top: MONO_COLOR[s.kind] })]),
);

export function Skills() {
  const [sel, setSel] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const slots = Array.from({ length: SLOTS }, (_, i) => skills[i] ?? null);
  const current = slots[sel];

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = i;
    if (e.key === "ArrowRight") next = Math.min(SLOTS - 1, i + 1);
    else if (e.key === "ArrowLeft") next = Math.max(0, i - 1);
    else if (e.key === "ArrowDown") next = Math.min(SLOTS - 1, i + COLS);
    else if (e.key === "ArrowUp") next = Math.max(0, i - COLS);
    else return;
    e.preventDefault();
    setSel(next);
    refs.current[next]?.focus();
  };

  return (
    <section id="skills" className="section wrap" aria-labelledby="skills-title">
      <div className="section-head">
        <h2 id="skills-title">Skills</h2>
      </div>

      <div className="inventory-layout">
        <div className="inventory notched" role="group" aria-label="Inventory">
          {slots.map((s, i) => (
            <button
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              className="slot"
              aria-pressed={i === sel}
              aria-label={s ? s.name : "Empty slot"}
              tabIndex={i === sel ? 0 : -1}
              onClick={() => setSel(i)}
              onKeyDown={(e) => onKey(e, i)}
            >
              {s && <Sprite rows={MONOS[s.id]} unit="3px" />}
            </button>
          ))}
        </div>

        <div className="item-info notched" aria-live="polite">
          {current ? (
            <>
              <div className="item-art" aria-hidden="true">
                <Sprite rows={MONOS[current.id]} unit="6px" />
              </div>
              <h3>{current.name}</h3>
              <p className={`kind kind-${current.kind}`}>
                {current.kind === "code" ? "Code" : "Stage"}
              </p>
              <p>{current.note}</p>
            </>
          ) : (
            <>
              <h3>Empty slot</h3>
              <p>Room for the next skill.</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
