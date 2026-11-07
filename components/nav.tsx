"use client";

import { useState } from "react";
import { Sprite } from "./pixel";
import { CROWN } from "./sprites";

export const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export function Nav({ active }: { active: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className={open ? "nav nav-open" : "nav"}>
      <div className="nav-inner">
        <a href="#home" className="nav-brand" onClick={() => setOpen(false)}>
          <Sprite rows={CROWN} unit="3px" />
          Andrei Sanchez
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
    </header>
  );
}
