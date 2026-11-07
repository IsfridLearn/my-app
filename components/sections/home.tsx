"use client";

import { Sprite } from "../pixel";
import { BUST } from "../sprites";
import { Typewriter } from "../typewriter";
import { profile } from "@/lib/content";

export function Home({ active }: { active: boolean }) {
  return (
    <section id="home" className="home wrap" aria-labelledby="home-title">
      <h1 id="home-title" className="visually-hidden">
        {profile.first} {profile.last}
      </h1>

      <div className="home-stage">
        <div className="portrait" aria-hidden="true">
          <Sprite rows={BUST} />
        </div>

        <div className="dialogue notched">
          <div className="dialogue-head">{profile.first}</div>
          <div className="dialogue-body">
            <Typewriter
              text={profile.greeting}
              active={active}
              className="dialogue-text"
            />
            <nav className="menu-rpg" aria-label="Jump to a section">
              <a href="#work">Work</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
