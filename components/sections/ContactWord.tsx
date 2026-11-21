"use client";

import { useEffect, useRef } from "react";

const LETTERS = ["C", "O", "N", "T", "✕", "C", "T"];

/**
 * The giant CONTACT, with a red cross in place of the A. With a mouse, the cross
 * turns to point at the cursor and the letters lean toward it. On touch screens the
 * cross turns as the section scrolls past. With reduced motion it stays still.
 */
export function ContactWord() {
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const word = wordRef.current;
    const area = word?.closest("section");
    if (!word || !area || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const letters = [...word.querySelectorAll<HTMLElement>(".cw-letter")];
    const cross = word.querySelector<HTMLElement>(".cw-x i");
    if (!cross) return;

    // Touch screens: the cross turns with the scroll, no pointer needed.
    if (!window.matchMedia("(pointer: fine)").matches) {
      let frame = 0;
      const update = () => {
        frame = 0;
        const box = area.getBoundingClientRect();
        const progress = 1 - (box.top + box.height) / (window.innerHeight + box.height);
        cross.style.transform = `rotate(${Math.round(progress * 360)}deg)`;
      };
      const onScroll = () => {
        if (!frame) frame = requestAnimationFrame(update);
      };
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", onScroll);
      };
    }

    // Mouse: ease every letter toward its target each frame, and stop when settled.
    const pointer = { x: 0, y: 0, active: false };
    const lean = letters.map(() => ({ x: 0, y: 0 }));
    let angle = 0;
    let frame = 0;
    const tick = () => {
      let moving = false;
      letters.forEach((letter, i) => {
        const box = letter.getBoundingClientRect();
        let tx = 0;
        let ty = 0;
        if (pointer.active) {
          const dx = pointer.x - (box.left + box.width / 2);
          const dy = pointer.y - (box.top + box.height / 2);
          const distance = Math.hypot(dx, dy) || 1;
          const pull = Math.max(0, 1 - distance / 460);
          tx = (dx / distance) * 22 * pull;
          ty = (dy / distance) * 14 * pull;
        }
        lean[i].x += (tx - lean[i].x) * 0.14;
        lean[i].y += (ty - lean[i].y) * 0.14;
        if (Math.abs(tx - lean[i].x) + Math.abs(ty - lean[i].y) > 0.05) moving = true;
        letter.style.translate = `${lean[i].x.toFixed(2)}px ${lean[i].y.toFixed(2)}px`;
      });
      const crossBox = cross.getBoundingClientRect();
      const target = pointer.active
        ? (Math.atan2(pointer.y - (crossBox.top + crossBox.height / 2), pointer.x - (crossBox.left + crossBox.width / 2)) * 180) / Math.PI + 45
        : 0;
      const diff = ((target - angle + 540) % 360) - 180;
      angle += diff * 0.15;
      if (Math.abs(diff) > 0.3) moving = true;
      cross.style.transform = `rotate(${angle.toFixed(2)}deg)`;
      frame = moving ? requestAnimationFrame(tick) : 0;
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      wake();
    };
    const onLeave = () => {
      pointer.active = false;
      wake();
    };
    area.addEventListener("pointermove", onMove);
    area.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <span ref={wordRef} className="cw poster" aria-hidden="true">
      {LETTERS.map((letter, i) =>
        letter === "✕" ? (
          <span key={i} className="cw-letter cw-x">
            <i>✕</i>
          </span>
        ) : (
          <span key={i} className="cw-letter">
            {letter}
          </span>
        ),
      )}
    </span>
  );
}
