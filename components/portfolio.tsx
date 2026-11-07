"use client";

import { useEffect, useState } from "react";
import { Nav, SECTIONS } from "./nav";
import { Opening } from "./opening";
import { About } from "./sections/about";
import { Contact } from "./sections/contact";
import { Experience } from "./sections/experience";
import { Home } from "./sections/home";
import { Skills } from "./sections/skills";
import { Work } from "./sections/work";
import { profile } from "@/lib/content";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type Phase = "opening" | "leaving" | "done";

export function Portfolio() {
  const [phase, setPhase] = useState<Phase>("opening");
  const [active, setActive] = useState<string>("home");
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
        <main>
          <Home active={phase !== "opening"} />
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
          <button type="button" className="foot-btn" onClick={restart}>
            Back to the opening
          </button>
        </footer>
      </div>
    </div>
  );
}
