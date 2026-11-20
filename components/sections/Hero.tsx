"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ContentImage } from "@/components/ui/ContentImage";
import { DropCap } from "@/components/ui/DropCap";
import { ScriptOverlay } from "@/components/ui/SectionHeading";
import { portraitArt, prints } from "@/data/photos";
import { hero, profile } from "@/data/profile";

const PORTRAIT_SIZES = "(max-width: 1099px) 56vw, 36vw";

const interference = { src: "/photos/hero-interference.webp", alt: "", width: 1200, height: 700 };

export function Hero() {
  const [print, setPrint] = useState<"dark" | "light">("dark");
  // Each print change replays one burst of interference.
  const [bursts, setBursts] = useState(0);
  const isLight = print === "light";
  const togglePrint = () => {
    setBursts((count) => count + 1);
    setPrint(isLight ? "dark" : "light");
  };

  return (
    <section id="home" className="intro" data-print={print} aria-labelledby="home-title">
      <div className="fp">
        <HeroArt bursts={bursts} />
        <HeroCopy isLight={isLight} onTogglePrint={togglePrint} />
      </div>
    </section>
  );
}

/**
 * Moves the hero's layers a little with the cursor, each by a different amount,
 * so the portraits separate in depth. Only on desktop with a mouse, and never
 * when reduced motion is asked for. It writes two CSS variables; nothing re-renders.
 */
function useCursorDepth() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const art = ref.current;
    const area = art?.parentElement;
    if (!art || !area) return;
    const allowed = window.matchMedia("(pointer: fine) and (min-width: 1100px) and (prefers-reduced-motion: no-preference)");
    const target = { x: 0, y: 0 };
    const now = { x: 0, y: 0 };
    let frame = 0;

    const tick = () => {
      now.x += (target.x - now.x) * 0.08;
      now.y += (target.y - now.y) * 0.08;
      art.style.setProperty("--mx", now.x.toFixed(4));
      art.style.setProperty("--my", now.y.toFixed(4));
      const moving = Math.abs(target.x - now.x) > 0.001 || Math.abs(target.y - now.y) > 0.001;
      frame = moving ? requestAnimationFrame(tick) : 0;
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onMove = (event: PointerEvent) => {
      if (!allowed.matches) return;
      const box = area.getBoundingClientRect();
      target.x = ((event.clientX - box.left) / box.width) * 2 - 1;
      target.y = ((event.clientY - box.top) / box.height) * 2 - 1;
      wake();
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      wake();
    };

    area.addEventListener("pointermove", onMove);
    area.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return ref;
}

function HeroArt({ bursts }: { bursts: number }) {
  const ref = useCursorDepth();

  return (
    <div ref={ref} className="fp-art">
      <ContentImage className="fp-ghost fp-ghost-l" image={portraitArt.ghostLeft} sizes="37vw" />
      <ContentImage className="fp-ghost fp-ghost-r" image={portraitArt.ghostRight} sizes="37vw" />
      <ContentImage className="fp-stain fp-stain-l" image={portraitArt.stain} sizes="38vw" />
      <ContentImage className="fp-stain fp-stain-r" image={portraitArt.stain} sizes="26vw" />
      <ContentImage className="fp-square" image={portraitArt.square} sizes="11vw" />

      {/* Signal interference over the background photographs, under the name. */}
      <div key={bursts} className="fp-glitch" aria-hidden="true">
        <ContentImage className="fp-glitch-tex" image={interference} sizes="100vw" />
        <span className="fp-glitch-scan" />
      </div>


      <h1 id="home-title" className="name poster">
        <span className="sr-only">
          {profile.first} {profile.last}
        </span>
        <NameWord className="name-1" word={profile.first} order={0} />
        <NameWord className="name-2" word={profile.last} order={2} />
      </h1>

      <ContentImage
        className="fp-outline"
        image={portraitArt.outline}
        sizes="(max-width: 1099px) 65vw, 42vw"
      />
      <ContentImage className="fig fig-dark" image={prints.dark} sizes={PORTRAIT_SIZES} preload />
      <ContentImage className="fig fig-light" image={prints.light} sizes={PORTRAIT_SIZES} loading="eager" />

      <ScriptOverlay className="fp-script" lead={hero.script[0]} word={hero.script[1]} />
      <svg className="fp-swash" viewBox="0 0 400 40" aria-hidden="true">
        <path d="M4 30 C 90 22, 200 14, 396 6" />
      </svg>
    </div>
  );
}

type NameWordProps = {
  word: string;
  className: string;
  /** Position of the word's first letter group in the entrance sequence. */
  order: number;
};

/**
 * One word of the name, split into two letter groups that are revealed one after
 * the other. Splitting into groups, not single letters, keeps the font's kerning.
 */
function NameWord({ word, className, order }: NameWordProps) {
  const middle = Math.ceil(word.length / 2);
  const groups = [word.slice(0, middle), word.slice(middle)];

  return (
    <span className={className} data-text={word} aria-hidden="true">
      {groups.map((group, index) => (
        <span key={index} className="name-group" style={{ "--order": order + index } as CSSProperties}>
          {group}
        </span>
      ))}
    </span>
  );
}

type HeroCopyProps = {
  isLight: boolean;
  onTogglePrint: () => void;
};

function HeroCopy({ isLight, onTogglePrint }: HeroCopyProps) {
  return (
    <div className="fp-text">
      <p className="fp-copy fp-corner">
        <b>
          {profile.first} {profile.last}
        </b>
        <br />
        <b>{hero.role[0]}</b>
        <br />
        {hero.role[1]}
      </p>

      <div className="fp-copy fp-lede">
        {hero.lede.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <ul className="fp-copy fp-tags" aria-label="Technologies">
        {hero.tags.map((tag) => (
          <li key={tag}>/ {tag}</li>
        ))}
      </ul>
      <p className="fp-copy fp-label">{hero.label}</p>

      <p className="fp-copy fp-body">
        <DropCap text={hero.body} />
      </p>

      {hero.notes.map((note, index) => (
        <div key={note.title} className={`fp-note fp-note-${index + 1}`}>
          <p className="fp-copy fp-num">[{index + 1}]</p>
          <h2>{note.title}</h2>
          <p className="fp-copy">
            {note.text} <a href={note.href}>{note.link}</a>
          </p>
        </div>
      ))}

      <button
        type="button"
        className="fp-copy print-btn fp-print"
        aria-pressed={isLight}
        onClick={onTogglePrint}
      >
        {isLight ? "Print dark" : "Print light"}
      </button>
    </div>
  );
}
