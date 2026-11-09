"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Monogram } from "@/components/ui/Sprite";
import { contact } from "@/data/contact";
import { navSections } from "@/data/navigation";
import { profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/useActiveSection";

const TRACKED_SECTION_IDS = ["home", ...navSections.map((section) => section.id)];

type NavProps = {
  /** Highlights this link instead of following the scroll position. */
  active?: string;
  /** "/" on other pages, so section links lead back to the homepage. */
  base?: string;
};

export function Nav({ active, base = "" }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolledSection = useActiveSection(TRACKED_SECTION_IDS);
  const currentSection = active ?? scrolledSection;
  const closeMenu = () => setMenuOpen(false);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header className={menuOpen ? "nav nav-open" : "nav"}>
      <Link
        href={`${base}#home`}
        className="tape tape-brand"
        aria-label={`${profile.first} ${profile.last}, back to top`}
        onClick={closeMenu}
      >
        <Monogram />
      </Link>

      <button
        type="button"
        className="tape nav-toggle"
        aria-expanded={menuOpen}
        aria-controls="nav-links"
        onClick={() => setMenuOpen((isOpen) => !isOpen)}
      >
        {menuOpen ? "Close" : "Menu"}
      </button>

      <nav aria-label="Sections">
        <ul id="nav-links" className="nav-links">
          {navSections.map((section) => (
            <li key={section.id}>
              <Link
                className="tape"
                href={`${base}#${section.id}`}
                aria-current={currentSection === section.id ? "true" : undefined}
                onClick={closeMenu}
              >
                {section.label}
              </Link>
            </li>
          ))}

          {contact.email.trim() !== "" && (
            <li className="nav-reach">
              <a className="tape" href={`mailto:${contact.email}`} onClick={closeMenu}>
                Email
              </a>
            </li>
          )}

          {contact.links.map((link) => (
            <li key={link.label}>
              <a className="tape" href={link.href} target="_blank" rel="noreferrer" onClick={closeMenu}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
