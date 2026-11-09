"use client";

import { useState } from "react";
import Image from "next/image";
import { hero, prints, profile } from "@/lib/content";

export function Home() {
  const [print, setPrint] = useState<"dark" | "light">("dark");
  const isLight = print === "light";
  const dropCap = hero.body.charAt(0);

  return (
    <section id="home" className="intro" data-print={print} aria-labelledby="home-title">
      <div className="fp">
        <div className="fp-art">
          <Image className="fp-ghost fp-ghost-l" src="/photos/hero-ghost-l.webp" alt="" width={620} height={807} sizes="37vw" />
          <Image className="fp-ghost fp-ghost-r" src="/photos/hero-ghost-r.webp" alt="" width={620} height={739} sizes="37vw" />
          <Image
            className="fp-panel"
            src="/photos/hero-panel.webp"
            alt="Close portrait of Andrei Sanchez in a black t-shirt, looking at the camera"
            width={1100}
            height={1483}
            sizes="(max-width: 1099px) 108vw, 47vw"
            preload
          />
          <Image className="fp-stain fp-stain-l" src="/photos/hero-stain.webp" alt="" width={900} height={520} sizes="38vw" />
          <Image className="fp-stain fp-stain-r" src="/photos/hero-stain.webp" alt="" width={900} height={520} sizes="26vw" />
          <Image className="fp-square" src="/photos/hero-square.webp" alt="" width={360} height={360} sizes="11vw" />

          <h1 id="home-title" className="name">
            <span className="name-1">{profile.first}</span>{" "}
            <span className="name-2">{profile.last}</span>
          </h1>

          <Image className="fp-outline" src="/photos/hero-outline.webp" alt="" width={1036} height={1327} sizes="(max-width: 1099px) 65vw, 42vw" />
          <Image
            className="fig fig-dark"
            src={prints.dark.src}
            alt={prints.dark.alt}
            width={prints.dark.width}
            height={prints.dark.height}
            sizes="(max-width: 1099px) 56vw, 36vw"
            preload
          />
          <Image
            className="fig fig-light"
            src={prints.light.src}
            alt={prints.light.alt}
            width={prints.light.width}
            height={prints.light.height}
            sizes="(max-width: 1099px) 56vw, 36vw"
            loading="eager"
          />

          <p className="fp-script" aria-hidden="true">
            {hero.script[0]}
            <span>{hero.script[1]}</span>
          </p>
        </div>

        <div className="fp-text">
          <p className="fp-mono fp-corner">
            <b>
              {profile.first} {profile.last}
            </b>
            <br />
            <b>{hero.role[0]}</b>
            <br />
            {hero.role[1]}
          </p>

          <div className="fp-mono fp-lede">
            {hero.lede.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <ul className="fp-mono fp-tags" aria-label="Technologies">
            {hero.tags.map((t) => (
              <li key={t}>/ {t}</li>
            ))}
          </ul>
          <p className="fp-mono fp-label">{hero.label}</p>

          <p className="fp-mono fp-body">
            <span className="fp-cap" aria-hidden="true">
              {dropCap}
            </span>
            <span className="sr-only">{dropCap}</span>
            {hero.body.slice(1)}
          </p>

          {hero.notes.map((note, i) => (
            <div key={note.title} className={`fp-note fp-note-${i + 1}`}>
              <p className="fp-mono fp-num">[{i + 1}]</p>
              <h2>{note.title}</h2>
              <p className="fp-mono">
                {note.text} <a href={note.href}>{note.link}</a>
              </p>
            </div>
          ))}

          <button
            type="button"
            className="fp-mono print-btn fp-print"
            aria-pressed={isLight}
            onClick={() => setPrint(isLight ? "dark" : "light")}
          >
            {isLight ? "Print dark" : "Print light"}
          </button>
        </div>
      </div>
    </section>
  );
}
