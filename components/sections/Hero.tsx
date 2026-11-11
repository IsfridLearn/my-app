"use client";

import { useState } from "react";
import { ContentImage } from "@/components/ui/ContentImage";
import { DropCap } from "@/components/ui/DropCap";
import { ScriptOverlay } from "@/components/ui/SectionHeading";
import { portraitArt, prints } from "@/data/photos";
import { hero, profile } from "@/data/profile";

const PORTRAIT_SIZES = "(max-width: 1099px) 56vw, 36vw";

export function Hero() {
  const [print, setPrint] = useState<"dark" | "light">("dark");
  const isLight = print === "light";

  return (
    <section id="home" className="intro" data-print={print} aria-labelledby="home-title">
      <div className="fp">
        <HeroArt />
        <HeroCopy isLight={isLight} onTogglePrint={() => setPrint(isLight ? "dark" : "light")} />
      </div>
    </section>
  );
}

function HeroArt() {
  return (
    <div className="fp-art">
      <ContentImage className="fp-ghost fp-ghost-l" image={portraitArt.ghostLeft} sizes="37vw" />
      <ContentImage className="fp-ghost fp-ghost-r" image={portraitArt.ghostRight} sizes="37vw" />
      <ContentImage
        className="fp-panel"
        image={portraitArt.panel}
        sizes="(max-width: 1099px) 108vw, 47vw"
        preload
      />
      <ContentImage className="fp-stain fp-stain-l" image={portraitArt.stain} sizes="38vw" />
      <ContentImage className="fp-stain fp-stain-r" image={portraitArt.stain} sizes="26vw" />
      <ContentImage className="fp-square" image={portraitArt.square} sizes="11vw" />

      <h1 id="home-title" className="name poster">
        <span className="name-1">{profile.first}</span>{" "}
        <span className="name-2">{profile.last}</span>
      </h1>

      <ContentImage
        className="fp-outline"
        image={portraitArt.outline}
        sizes="(max-width: 1099px) 65vw, 42vw"
      />
      <ContentImage className="fig fig-dark" image={prints.dark} sizes={PORTRAIT_SIZES} preload />
      <ContentImage className="fig fig-light" image={prints.light} sizes={PORTRAIT_SIZES} loading="eager" />

      <ScriptOverlay className="fp-script" lead={hero.script[0]} word={hero.script[1]} />
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
