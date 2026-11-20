"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { contact } from "@/data/contact";
import { navSections } from "@/data/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";

const TRACKED_SECTION_IDS = ["home", ...navSections.map((section) => section.id)];
const pad = (value: number) => String(value).padStart(2, "0");
// Wider than this, the links sit in the bar and the menu button is hidden.
const DESKTOP_QUERY = "(min-width: 1100px)";

type NavProps = {
  /** Highlights this link instead of following the scroll position. */
  active?: string;
  /** "/" on other pages, so section links lead back to the homepage. */
  base?: string;
};

export function Nav({ active, base = "" }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const scrolledSection = useActiveSection(TRACKED_SECTION_IDS);
  const currentSection = active ?? scrolledSection;
  const closeMenu = () => setMenuOpen(false);

  const activeIndex = navSections.findIndex((section) => section.id === currentSection);
  const activeLabel = activeIndex >= 0 ? navSections[activeIndex].label : "Index";

  // While the phone menu is open: lock the page behind it, move focus into it,
  // close it with Escape or when the window grows to desktop width.
  useEffect(() => {
    if (!menuOpen) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const handleResize = () => {
      if (desktop.matches) setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    desktop.addEventListener("change", handleResize);
    return () => {
      root.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      desktop.removeEventListener("change", handleResize);
    };
  }, [menuOpen]);

  // The bar tightens once the page has scrolled, and its red line shows how far down you are.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const root = document.documentElement;
      const scrollable = root.scrollHeight - root.clientHeight;
      const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
      headerRef.current?.style.setProperty("--progress", progress.toFixed(4));
      headerRef.current?.style.setProperty("--nav-h", `${headerRef.current.offsetHeight}px`);
      setCompact(window.scrollY > 40);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const classes = ["nav", menuOpen && "nav-open", compact && "nav-compact"].filter(Boolean).join(" ");
  const socials = [
    ...(contact.email.trim() !== "" ? [{ label: "Email", href: `mailto:${contact.email}`, external: false }] : []),
    ...contact.links.map((link) => ({ label: link.label, href: link.href, external: true })),
  ];

  return (
    <header ref={headerRef} className={classes}>
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
        ref={toggleRef}
        type="button"
        className="nav-toggle"
        aria-expanded={menuOpen}
        aria-controls="nav-menu"
        onClick={() => setMenuOpen((isOpen) => !isOpen)}
      >
        {menuOpen ? "Close" : "Menu"}
      </button>

      <div id="nav-menu" ref={menuRef} className="nav-menu">
        <nav aria-label="Sections">
          <ul className="nav-links">
            {navSections.map((section, index) => (
              <li key={section.id}>
                <Link
                  className="nav-link"
                  href={`${base}#${section.id}`}
                  aria-current={currentSection === section.id ? "true" : undefined}
                  onClick={closeMenu}
                >
                  <span className="nav-link-num" aria-hidden="true">
                    {pad(index + 1)}
                  </span>
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

      <span className="nav-progress" aria-hidden="true" />
    </header>
  );
}
