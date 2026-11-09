"use client";

import { useEffect, useState } from "react";
import { Sprite } from "./pixel";
import { buildText } from "./sprites";
import { hasContact, profile } from "@/lib/content";

export const SECTIONS: ReadonlyArray<{ id: string; label: string }> = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  ...(hasContact ? [{ id: "contact", label: "Contact" }] : []),
];

const MONOGRAM = buildText(["AS"], { top: "p", bottom: "l" });

export function Nav({ active }: { active: string }) {
  const [open, setOpen] = useState(false);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={open ? "nav nav-open" : "nav"}>
      <div className="nav-inner">
        <a href="#home" className="nav-brand" onClick={() => setOpen(false)}>
          <span className="mark" aria-hidden="true">
            <Sprite rows={MONOGRAM} unit="2px" />
          </span>
          <span className="nav-name">
            {profile.first} {profile.last}
            <small>{profile.location}</small>
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
    </header>
  );
}
