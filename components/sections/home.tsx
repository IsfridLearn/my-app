"use client";

import { useState } from "react";
import Image from "next/image";
import { Sprite } from "../pixel";
import { ARROW } from "../sprites";
import { prints, profile, projects } from "@/lib/content";

export function Home() {
  const [print, setPrint] = useState<"dark" | "light">("dark");
  const isLight = print === "light";
  const featured = projects[0];

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
        <p className="intro-role">{profile.title}</p>
        <p>{profile.greeting}</p>
        <ul className="file roles" aria-label="Primary technologies">
          {profile.primaryTech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="file intro-links">
          <a className="go" href={`#${featured.id}`}>
            See {featured.title} <Sprite rows={ARROW} unit="2px" />
          </a>
        </div>
      </div>

      <div className="intro-cap">
        <p className="file">
          {isLight ? prints.light.file : prints.dark.file}
          <br />
          Printed dark and light
        </p>
        <button
          type="button"
          className="file print-btn"
          aria-pressed={isLight}
          onClick={() => setPrint(isLight ? "dark" : "light")}
        >
          {isLight ? "Print dark" : "Print light"}
        </button>
        <a className="file go" href="#beyond">
          {profile.alsoNote}
        </a>
      </div>
    </section>
  );
}
