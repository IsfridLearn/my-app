"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import Link from "next/link";
import { contact } from "@/data/contact";
import { navSections } from "@/data/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";

const commands = [{ id: "home", label: "Home" }, ...navSections];
const TRACKED_SECTION_IDS = commands.map((command) => command.id);
const pad = (value: number) => String(value).padStart(2, "0");

type NavProps = {
  /** Highlights this command instead of following the scroll position. */
  active?: string;
  /** "/" on other pages, so commands lead back to the homepage. */
  base?: string;
};

/**
 * The command menu: a box in the top-left corner that bursts into one slab per
 * section, stepped down and fanned out. Number keys choose a command while it is
 * open; Escape or a click outside closes it.
 */
export function Nav({ active, base = "" }: NavProps) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const scrolledSection = useActiveSection(TRACKED_SECTION_IDS);
  const currentSection = active ?? scrolledSection;
  const currentIndex = Math.max(0, commands.findIndex((command) => command.id === currentSection));
  const resume = contact.resume.trim();

  const close = (returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  };

  // While open: focus the current command; close on a click outside.
  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelectorAll<HTMLElement>(".cmd")[currentIndex]?.focus({ preventScroll: true });
    const handlePointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointer);
    return () => document.removeEventListener("pointerdown", handlePointer);
    // Focus only when opening, not when the section changes underneath.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // A thin red line along the top edge shows how far down the page you are.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const root = document.documentElement;
      const scrollable = root.scrollHeight - root.clientHeight;
      const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
      headerRef.current?.style.setProperty("--progress", progress.toFixed(4));
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

  // Escape closes; arrows move between commands; number keys choose one.
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!open) return;
    const items = [...(listRef.current?.querySelectorAll<HTMLAnchorElement>(".cmd") ?? [])];
    const at = items.indexOf(document.activeElement as HTMLAnchorElement);
    if (event.key === "Escape") {
      event.preventDefault();
      close(true);
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      items[(at + step + items.length) % items.length]?.focus();
    } else if (/^[1-9]$/.test(event.key) && Number(event.key) <= items.length) {
      event.preventDefault();
      items[Number(event.key) - 1].click();
    }
  };

  return (
    <header ref={headerRef} className={open ? "cmdnav cmdnav-open" : "cmdnav"} onKeyDown={handleKeyDown}>
      <button
        ref={triggerRef}
        type="button"
        className="cmd-trigger"
        aria-expanded={open}
        aria-controls="cmd-menu"
        aria-label={open ? "Close the menu" : "Open the menu"}
        onClick={() => (open ? close(true) : setOpen(true))}
      >
        {/* A miniature of the menu: three slabs fanned like the real ones; they cross into an X when open. */}
        <span className="cmd-glyph" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="cmd-num" aria-hidden="true">
          {pad(currentIndex)}
        </span>
      </button>

      <p className="cmd-now" aria-hidden={open}>
        <b>{pad(currentIndex)}</b> / {pad(navSections.length)} — {commands[currentIndex].label}
      </p>

      {resume && (
        <a className="cmd-resume" href={resume} target="_blank" rel="noreferrer">
          Resume <span aria-hidden="true">↗</span>
        </a>
      )}

      <nav id="cmd-menu" className="cmd-menu" aria-label="Sections">
        <ul ref={listRef}>
          {commands.map((command, index) => (
            <li key={command.id} style={{ "--i": index } as CSSProperties}>
              <Link
                className="cmd"
                href={`${base}#${command.id}`}
                aria-current={index === currentIndex ? "true" : undefined}
                tabIndex={open ? 0 : -1}
                onClick={() => close(false)}
              >
                <span className="cmd-label">{command.label}</span>
                <span className="cmd-key" aria-hidden="true">
                  {index + 1}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <span className="cmd-progress" aria-hidden="true" />
    </header>
  );
}
