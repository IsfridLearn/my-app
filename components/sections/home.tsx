import { LocalTime } from "../local-time";
import { Scene } from "../scene";
import { capabilities, profile } from "@/lib/content";

// A short card of facts that already exist elsewhere on the site.
const CARD: Array<[string, string]> = [
  ["Program", "BSIT"],
  ["Based in", "Davao City"],
  ["Ambassador", "Holy Cross of Davao College"],
];

export function Home() {
  return (
    <section id="home" className="home" aria-labelledby="home-title">
      <div className="home-stage">
        <Scene idPrefix="home" className="home-bg" />
        <div className="home-shade" aria-hidden="true" />

        <div className="wrap home-inner">
          <div className="home-meta">
            <span>Portfolio</span>
            <span>
              {profile.roles[0]} <span aria-hidden="true">/</span> {profile.location}
            </span>
          </div>

          <h1 id="home-title" className="hero-name">
            <span>{profile.first}</span> <span>{profile.last}</span>
          </h1>

          <div className="home-bottom">
            <div className="hero">
              <p className="hero-lede">{profile.greeting}</p>
              <div className="actions">
                <a className="btn" href="#work">
                  Explore My Work
                </a>
                <a className="btn btn-ghost" href="#contact">
                  Let&rsquo;s Connect
                </a>
              </div>
            </div>

            <aside className="hero-card notched" aria-label="At a glance">
              <p className="hero-card-title">At a glance</p>
              <dl>
                {CARD.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
                <div>
                  <dt>Local time</dt>
                  <dd>
                    <LocalTime />
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </div>

      <div className="wrap">
        <ul className="capabilities" aria-label="What I do">
          {capabilities.map((c, i) => (
            <li key={c.title} className="capability">
              <span className="capability-no" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="capability-title">{c.title}</p>
              <p className="capability-text">{c.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
