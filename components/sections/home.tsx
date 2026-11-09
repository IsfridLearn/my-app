import { LocalTime } from "../local-time";
import { Scene } from "../scene";
import { Sprite } from "../pixel";
import { ICON } from "../sprites";
import { capabilities, profile } from "@/lib/content";

// Davao City, as a small coordinate label.
const COORDS = "7.07°N  125.61°E";

const ICON_FOR: Record<string, readonly string[]> = {
  "Web interfaces": ICON.code,
  "Brand ambassadorship": ICON.badge,
  Modeling: ICON.camera,
};

export function Home() {
  return (
    <section id="home" className="home" aria-labelledby="home-title">
      <div className="wrap">
        <div className="home-meta">
          <span>Pixel Atelier</span>
          <span>{COORDS}</span>
          <span>Digital studio portfolio</span>
        </div>

        <h1 id="home-title" className="hero-name">
          <span className="hn-1">{profile.first}</span>{" "}
          <span className="hn-2">{profile.last}</span>
        </h1>

        <div className="home-lower">
          <div className="hero">
            <p className="hero-kicker">
              {profile.roles[0]} <span aria-hidden="true">/</span> {profile.location}
            </p>
            <p className="hero-lede">{profile.greeting}</p>
            <div className="actions">
              <a className="btn" href="#work">
                Explore My Work
                <Sprite rows={[...ICON.arrow].map((r) => r.replace(/u/g, "k"))} unit="2px" />
              </a>
              <a className="btn btn-ghost" href="#contact">
                Let&rsquo;s Connect
              </a>
            </div>
          </div>

          <figure className="plate" aria-hidden="true">
            <div className="frame">
              <i className="crop tl" />
              <i className="crop tr" />
              <i className="crop bl" />
              <i className="crop br" />
              <div className="frame-inner">
                <Scene idPrefix="home" className="plate-scene" />
              </div>
            </div>
            <figcaption>
              <span>Fig. 01 / Sunset study</span>
              <LocalTime />
            </figcaption>
          </figure>
        </div>

        <ul className="index" aria-label="What I do">
          {capabilities.map((c, i) => (
            <li key={c.title} className="index-item">
              <span className="index-no" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="index-head">
                <Sprite rows={[...(ICON_FOR[c.title] ?? ICON.code)]} unit="2px" />
                <p className="index-title">{c.title}</p>
              </div>
              <p className="index-text">{c.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
