"use client";

import { useState } from "react";
import Image from "next/image";
import { prints, profile } from "@/lib/content";

export function Home() {
  const [print, setPrint] = useState<"dark" | "light">("dark");
  const isLight = print === "light";

  return (
    <section id="home" className="intro" data-print={print} aria-labelledby="home-title">
      <div className="stage">
        <h1 id="home-title">
          <span className="name-1">{profile.first}</span>{" "}
          <span className="name-2">{profile.last}</span>
        </h1>
        <Image
          className="fig fig-dark"
          src={prints.dark.src}
          alt={prints.dark.alt}
          width={prints.dark.width}
          height={prints.dark.height}
          sizes="(max-width: 1023px) 70vw, 45vw"
          preload
        />
        <Image
          className="fig fig-light"
          src={prints.light.src}
          alt={prints.light.alt}
          width={prints.light.width}
          height={prints.light.height}
          sizes="(max-width: 1023px) 70vw, 45vw"
          loading="eager"
        />
      </div>

      <div className="intro-text">
        <ul className="file roles" aria-label="Roles">
          {profile.roles.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <p>{profile.greeting}</p>
      </div>

      <div className="intro-cap">
        <p className="file">
          {isLight ? prints.light.file : prints.dark.file}
          <br />
          One portrait, printed dark and light
        </p>
        <button
          type="button"
          className="file print-btn"
          aria-pressed={isLight}
          onClick={() => setPrint(isLight ? "dark" : "light")}
        >
          {isLight ? "Print dark" : "Print light"}
        </button>
      </div>
    </section>
  );
}
