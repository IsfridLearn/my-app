"use client";

import { useEffect, useState } from "react";
import { Nav, SECTIONS } from "./nav";
import { Opening } from "./opening";
import { SideRail } from "./side-rail";
import { About } from "./sections/about";
import { Contact } from "./sections/contact";
import { Experience } from "./sections/experience";
import { Home } from "./sections/home";
import { Skills } from "./sections/skills";
import { Work } from "./sections/work";
import { profile } from "@/lib/content";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type Phase = "opening" | "leaving" | "done";
type Accent = "violet" | "blue" | "rose";
const ACCENTS: Accent[] = ["violet", "blue", "rose"];

export function Portfolio() {
  const [phase, setPhase] = useState<Phase>("opening");
  const [active, setActive] = useState<string>("home");
  const [accent, setAccent] = useState<Accent>("violet");
  const reduced = useReducedMotion();

  const enter = () => setPhase(reduced ? "done" : "leaving");

  const restart = () => {
    window.scrollTo(0, 0);
    setActive("home");
    setPhase("opening");
  };

  // Backup: if the browser never reports the lift-up animation as finished,
  // still clear the opening screen so the portfolio underneath is reachable.
  useEffect(() => {
    if (phase !== "leaving") return;
    const id = window.setTimeout(() => setPhase("done"), 1200);
    return () => window.clearTimeout(id);
  }, [phase]);

  // Lock page scroll while the opening screen is up.
  useEffect(() => {
    if (phase === "done") return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = previous;
    };
  }, [phase]);

  // Sections fade in once as they scroll into view. The hidden state is only
  // applied after mount, so the page is fully visible without JavaScript.
  useEffect(() => {
    if (reduced) return;
    const html = document.documentElement;
    const targets = document.querySelectorAll(
      ".section-head, .project, .about-grid, .skills-grid, .entry, .contact-window, .capabilities",
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    html.classList.add("js-reveal");
    targets.forEach((t) => io.observe(t));
    return () => {
      io.disconnect();
      html.classList.remove("js-reveal");
      targets.forEach((t) => t.classList.remove("is-in"));
    };
  }, [reduced]);

  // Accent colour: a small detail in the footer, applied through a data attribute.
  useEffect(() => {
    document.documentElement.dataset.accent = accent;
  }, [accent]);

  // Highlight the nav link for the section crossing the middle of the screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site">
      {phase !== "done" && (
        <Opening
          leaving={phase === "leaving"}
          onEnter={enter}
          onLeft={() => setPhase("done")}
        />
      )}

      <div inert={phase === "opening"}>
        <Nav active={active} />
        <SideRail active={active} />
        <main>
          <Home />
          <Work />
          <About />
          <Skills />
          <Experience />
          <Contact />
        </main>
        <footer className="foot wrap">
          <p>
            © 2026 {profile.first} {profile.last}
          </p>
          <div className="foot-tools">
            <div className="accents" role="group" aria-label="Accent color">
              {ACCENTS.map((a) => (
                <button
                  key={a}
                  type="button"
                  className={`accent accent-${a}`}
                  aria-label={a}
                  aria-pressed={accent === a}
                  onClick={() => setAccent(a)}
                />
              ))}
            </div>
            <button type="button" className="foot-btn" onClick={restart}>
              Replay intro
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
