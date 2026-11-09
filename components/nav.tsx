"use client";

import { useEffect, useRef, useState } from "react";
import { Sprite } from "./pixel";
import { buildText } from "./sprites";

export const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

const MONOGRAM = buildText(["AS"], { top: "p", bottom: "l" });

export function Nav({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Reading progress: a thin bar along the bottom edge of the header.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className={open ? "nav nav-open" : "nav"}>
      <div className="nav-inner">
        <a href="#home" className="nav-brand" onClick={() => setOpen(false)}>
          <span className="mark" aria-hidden="true">
            <Sprite rows={MONOGRAM} unit="2px" />
          </span>
          <span className="nav-name">
            Andrei Sanchez
            <small>Pixel Atelier</small>
          </span>
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav aria-label="Sections">
          <ul id="nav-links" className="nav-links">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? "true" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="nav-progress" aria-hidden="true">
        <div ref={bar} className="nav-progress-bar" />
      </div>
    </header>
  );
}
