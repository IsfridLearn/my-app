"use client";

import { useEffect, useState } from "react";
import { Sprite } from "./pixel";
import { MONOGRAM } from "./sprites";
import { hasContact, profile } from "@/lib/content";

export const SECTIONS: ReadonlyArray<{ id: string; label: string }> = [
  { id: "work", label: "Work" },
  { id: "beyond", label: "Beyond the Screen" },
  { id: "about", label: "About" },
  ...(hasContact ? [{ id: "contact", label: "Contact" }] : []),
];

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
      <a
        href="#home"
        className="tape tape-brand"
        aria-label={`${profile.first} ${profile.last}, back to top`}
        onClick={() => setOpen(false)}
      >
        <Sprite rows={MONOGRAM} unit="2px" />
      </a>

      <button
        type="button"
        className="tape nav-toggle"
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
                className="tape"
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
    </header>
  );
}
