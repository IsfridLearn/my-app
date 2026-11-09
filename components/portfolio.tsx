"use client";

import { useEffect, useState } from "react";
import { Nav, SECTIONS } from "./nav";
import { About } from "./sections/about";
import { Contact } from "./sections/contact";
import { Experience } from "./sections/experience";
import { Home } from "./sections/home";
import { Skills } from "./sections/skills";
import { Work } from "./sections/work";
import { hasContact, profile } from "@/lib/content";

export function Portfolio() {
  const [active, setActive] = useState<string>("home");

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
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav active={active} />
      <main id="main">
        <Home />
        <Work />
        <About />
        <Skills />
        <Experience />
        {hasContact && <Contact />}
      </main>
      <footer className="foot wrap">
        <p>
          © 2026 {profile.first} {profile.last}
        </p>
        <p>{profile.location}</p>
      </footer>
    </div>
  );
}
