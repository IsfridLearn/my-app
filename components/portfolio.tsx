"use client";

import { useEffect, useState } from "react";
import { Nav, SECTIONS } from "./nav";
import { About } from "./sections/about";
import { Beyond } from "./sections/beyond";
import { Contact } from "./sections/contact";
import { Experience } from "./sections/experience";
import { Home } from "./sections/home";
import { Stack } from "./sections/stack";
import { Work, fileNumber } from "./sections/work";
import { hasContact, photos, prints, profile, projects } from "@/lib/content";

const INDEX = [
  ...projects.map((p, i) => ({ file: fileNumber(i), label: p.title, href: `#${p.id}` })),
  { file: prints.dark.file, label: prints.dark.label, href: "#home" },
  { file: prints.light.file, label: prints.light.label, href: "#about" },
  ...Object.values(photos).map((p) => ({ file: p.file, label: p.label, href: `#${p.id}` })),
];

export function Portfolio() {
  const [active, setActive] = useState<string>("home");

  // Mark the nav link for the section crossing the middle of the screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ["home", ...SECTIONS.map((s) => s.id)]) {
      const el = document.getElementById(id);
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
        <Stack />
        <Experience />
        <Beyond />
        <About />
        {hasContact && <Contact />}
      </main>
      <footer className="foot">
        <nav aria-label="Archive index" className="index">
          <p className="file">Index</p>
          <ul>
            {INDEX.map((item) => (
              <li key={item.file}>
                <a href={item.href}>
                  <span>{item.file}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="file">
          © 2026 {profile.first} {profile.last}, {profile.location}
        </p>
      </footer>
    </div>
  );
}
