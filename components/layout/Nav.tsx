"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sprite } from "./pixel";
import { MONOGRAM } from "./sprites";
import { contact, hasContact, profile } from "@/lib/content";

export const SECTIONS: ReadonlyArray<{ id: string; label: string }> = [
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "beyond", label: "Beyond the Screen" },
  { id: "about", label: "About" },
  ...(hasContact ? [{ id: "contact", label: "Contact" }] : []),
];

/** `base` is "/" on other pages, so section links lead back to the homepage. */
export function Nav({ active, base = "" }: { active: string; base?: string }) {
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
      <Link
        href={`${base}#home`}
        className="tape tape-brand"
        aria-label={`${profile.first} ${profile.last}, back to top`}
        onClick={() => setOpen(false)}
      >
        <Sprite rows={MONOGRAM} unit="2px" />
      </Link>

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
              <Link
                className="tape"
                href={`${base}#${s.id}`}
                aria-current={active === s.id ? "true" : undefined}
                onClick={() => setOpen(false)}
              >
                {s.label}
              </Link>
            </li>
          ))}
          {contact.email.trim() !== "" && (
            <li className="nav-reach">
              <a className="tape" href={`mailto:${contact.email}`} onClick={() => setOpen(false)}>
                Email
              </a>
            </li>
          )}
          {contact.links.map((l) => (
            <li key={l.label}>
              <a className="tape" href={l.href} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
