"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ContentImage } from "@/components/ui/ContentImage";
import { DropCap } from "@/components/ui/DropCap";
import { portraitArt, prints } from "@/data/photos";
import { hero, profile } from "@/data/profile";

const PORTRAIT_SIZES = "(max-width: 1099px) 56vw, 36vw";

const interference = { src: "/photos/hero-interference.webp", alt: "", width: 1200, height: 700 };

export function Hero() {
  const [print, setPrint] = useState<"dark" | "light">("dark");
  const isLight = print === "light";
  const togglePrint = () => setPrint(isLight ? "dark" : "light");

  return (
    <section id="home" className="intro" data-print={print} aria-labelledby="home-title">
      <div className="fp">
        <HeroArt />
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

function HeroArt() {
  const ref = useCursorDepth();

  return (
    <div ref={ref} className="fp-art">
      <ContentImage className="fp-ghost fp-ghost-l" image={portraitArt.ghostLeft} sizes="37vw" />
      <ContentImage className="fp-ghost fp-ghost-r" image={portraitArt.ghostRight} sizes="37vw" />
      <ContentImage className="fp-stain fp-stain-l" image={portraitArt.stain} sizes="38vw" />
      <ContentImage className="fp-stain fp-stain-r" image={portraitArt.stain} sizes="26vw" />
      <ContentImage className="fp-square" image={portraitArt.square} sizes="11vw" />

      {/* Cut-paper backdrop: rays, halftone, torn white paper, a red shard and a splinter. */}
      <span className="fp-rays" aria-hidden="true" />
      <span className="fp-dots" aria-hidden="true" />
      <span className="fp-tear-white" aria-hidden="true" />
      <span className="fp-tear-red" aria-hidden="true" />
      <span className="fp-splinter-w" aria-hidden="true" />
      <span className="fp-splinter" aria-hidden="true" />

      {/* Still signal interference over the background photographs, under the name. */}
      <div className="fp-glitch" aria-hidden="true">
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

      <p className="fp-statement">
        <span className="fp-statement-main poster">
          {hero.statement.lines[0]}
          <br />
          {hero.statement.lines[1]}
        </span>
        <span className="fp-statement-sub">{hero.statement.descriptor}</span>
      </p>

      {/* Print details: crop marks, a strip of tiny type, a print bar, grain over everything. */}
      <span className="fp-crop fp-crop-tl" aria-hidden="true" />
      <span className="fp-crop fp-crop-br" aria-hidden="true" />
      <span className="fp-strip" aria-hidden="true">
        Portfolio /2026 — <b>File 00</b> — {profile.location} — Developer &amp; creative technologist
      </span>
      <span className="fp-bar" aria-hidden="true" />
      <span className="fp-grain" aria-hidden="true" />
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

type PaperProps = { className: string; tab?: string; children: ReactNode };

/** A cut-paper panel: red print offset, white paper edge, black ink face, optional torn tab. */
function Paper({ className, tab, children }: PaperProps) {
  return (
    <div className={`paper ${className}`}>
      {tab && (
        <span className="paper-tab" aria-hidden="true">
          {tab}
        </span>
      )}
      <div className="paper-edge">
        <div className="paper-ink">{children}</div>
      </div>
    </div>
  );
}

type HeroCopyProps = {
  isLight: boolean;
  onTogglePrint: () => void;
};

function HeroCopy({ isLight, onTogglePrint }: HeroCopyProps) {
  return (
    <div className="fp-text">
      <Paper className="fp-corner">
        <p className="fp-id">
          <b>
            {profile.first} {profile.last}
          </b>
          <span>
            {hero.role[0]}
            <br />
            {hero.role[1]}
          </span>
        </p>
      </Paper>

      <Paper className="fp-lede" tab="Profile">
        {hero.lede.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </Paper>

      <p className="fp-copy fp-body">
        <DropCap text={hero.body} />
      </p>

      {hero.notes.map((note, index) => (
        <Paper key={note.title} className={`fp-note fp-note-${index + 1}`}>
          <p className="fp-num">{String(index + 1).padStart(2, "0")}</p>
          <h2>{note.title}</h2>
          <p className="fp-copy">
            {note.text} <a href={note.href}>{note.link}</a>
          </p>
        </Paper>
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
