"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Intro } from "./intro";
import { Sprite } from "./pixel";
import { CROWN } from "./sprites";
import { about, contact, profile, work } from "@/lib/content";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

export function Portfolio() {
  const [theme, setTheme] = useState<"night" | "day">("night");
  const [run, setRun] = useState(0);
  const [over, setOver] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const reduced = useReducedMotion();
  const playing = !over && !reduced;

  const skip = () => {
    setSkipped(true);
    setOver(true);
  };

  const replay = () => {
    setSkipped(false);
    setOver(false);
    setRun((r) => r + 1);
    window.scrollTo(0, 0);
  };

  // While the intro plays: lock page scroll and let Escape skip it.
  useEffect(() => {
    if (!playing) return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSkipped(true);
        setOver(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [playing]);

  return (
    <div
      className={`site theme-${theme}${skipped ? " is-skipped" : ""}`}
    >
      {/* Changing `run` remounts this block, which restarts every animation. */}
      <div key={run}>
        {playing && <Intro onDone={() => setOver(true)} onSkip={skip} />}

        <main className="page" inert={playing}>
          <button
            type="button"
            className="mode reveal"
            onClick={() => setTheme((t) => (t === "night" ? "day" : "night"))}
          >
            {theme === "night" ? "Light mode" : "Dark mode"}
          </button>

          <header className="hero">
            <div className="title wipe">
              <Sprite rows={CROWN} unit="clamp(4px, 0.7vw, 7px)" />
              <h1 className="name">
                <span>{profile.first}</span> <span>{profile.last}</span>
              </h1>
            </div>
            <p className="lede reveal">{profile.lede}</p>
            <nav className="menu reveal" aria-label="Sections">
              <a href="#work">Work</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </nav>
          </header>

          <div className="reveal">
            <section id="work" className="section" aria-labelledby="work-title">
              <h2 id="work-title" className="section-title">
                Work
              </h2>
              <ul className="rows">
                {work.map((item, i) => (
                  <li key={i} className="row">
                    <h3 className="row-title">
                      {item.href ? (
                        <a className="link" href={item.href}>
                          {item.title}
                        </a>
                      ) : (
                        item.title
                      )}
                    </h3>
                    <p className="row-text">{item.text}</p>
                    <p className="row-meta">{item.meta}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section
              id="about"
              className="section"
              aria-labelledby="about-title"
            >
              <h2 id="about-title" className="section-title">
                About
              </h2>
              <div>
                <p className="bio">{about.bio}</p>
                <ul className="rows">
                  {about.roles.map((r) => (
                    <li key={r.role} className="row row-two">
                      <h3 className="row-title">{r.role}</h3>
                      <p className="row-text">{r.detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section
              id="contact"
              className="section"
              aria-labelledby="contact-title"
            >
              <h2 id="contact-title" className="section-title">
                Contact
              </h2>
              <ul className="rows">
                {contact.map((c) => (
                  <li key={c.label} className="row row-two">
                    <h3 className="row-title">{c.label}</h3>
                    <p className="row-text">
                      <a className="link" href={c.href}>
                        {c.value}
                      </a>
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <footer className="foot">
              <p>© 2026 {profile.first} {profile.last}</p>
              {!reduced && (
                <button type="button" className="link" onClick={replay}>
                  Replay intro
                </button>
              )}
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
