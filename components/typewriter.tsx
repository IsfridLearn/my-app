"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type TypewriterProps = {
  text: string;
  /** Typing starts when this becomes true. */
  active: boolean;
  className?: string;
};

/** RPG-style dialogue text. Click it to finish instantly. */
export function Typewriter({ text, active, className }: TypewriterProps) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active || reduced) return;
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          window.clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, 26);
    return () => window.clearInterval(id);
  }, [active, reduced, text]);

  const shown = reduced ? text.length : Math.min(count, text.length);
  const done = shown >= text.length;

  return (
    <p className={className} onClick={() => setCount(text.length)}>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, shown)}
        {!done && <span className="cursor" />}
      </span>
    </p>
  );
}
