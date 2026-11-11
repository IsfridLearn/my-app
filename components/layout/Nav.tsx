"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { contact } from "@/data/contact";
import { navSections } from "@/data/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";

const TRACKED_SECTION_IDS = ["home", ...navSections.map((section) => section.id)];
const pad = (value: number) => String(value).padStart(2, "0");

type NavProps = {
  /** Highlights this link instead of following the scroll position. */
  active?: string;
  /** "/" on other pages, so section links lead back to the homepage. */
  base?: string;
};

export function Nav({ active, base = "" }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const scrolledSection = useActiveSection(TRACKED_SECTION_IDS);
  const currentSection = active ?? scrolledSection;
  const closeMenu = () => setMenuOpen(false);

  const activeIndex = navSections.findIndex((section) => section.id === currentSection);
  const activeLabel = activeIndex >= 0 ? navSections[activeIndex].label : "Index";

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  // The bar tightens once the page has scrolled.
  useEffect(() => {
    const update = () => setCompact(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const classes = ["nav", menuOpen && "nav-open", compact && "nav-compact"].filter(Boolean).join(" ");
  const socials = [
    ...(contact.email.trim() !== "" ? [{ label: "Email", href: `mailto:${contact.email}`, external: false }] : []),
    ...contact.links.map((link) => ({ label: link.label, href: link.href, external: true })),
  ];

  return (
    <header className={classes}>
      <p className="nav-count">
        <span className="nav-count-num">{pad(activeIndex + 1)}</span>
        <span className="nav-count-total"> / {pad(navSections.length)}</span>
        <span className="nav-count-dash" aria-hidden="true">
          {" "}
          —{" "}
        </span>
        <span className="nav-count-label">{activeLabel}</span>
      </p>

      <button
        type="button"
        className="nav-toggle"
        aria-expanded={menuOpen}
        aria-controls="nav-menu"
        onClick={() => setMenuOpen((isOpen) => !isOpen)}
      >
        {menuOpen ? "Close" : "Menu"}
      </button>

      <div id="nav-menu" className="nav-menu">
        <nav aria-label="Sections">
          <ul className="nav-links">
            {navSections.map((section) => (
              <li key={section.id}>
                <Link
                  className="nav-link"
                  href={`${base}#${section.id}`}
                  aria-current={currentSection === section.id ? "true" : undefined}
                  onClick={closeMenu}
                >
                  {section.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {socials.length > 0 && (
          <ul className="nav-social" aria-label="Elsewhere">
            {socials.map((link) => (
              <li key={link.label}>
                <a
                  className="nav-link"
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}
