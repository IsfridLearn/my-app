import { Scene } from "../scene";
import { profile } from "@/lib/content";

export function Home() {
  return (
    <section id="home" className="home" aria-labelledby="home-title">
      <div className="wrap home-grid">
        <div className="hero">
          <p className="eyebrow">
            {profile.roles[0]} <span aria-hidden="true">/</span> {profile.location}
          </p>
          <h1 id="home-title" className="hero-name">
            <span>{profile.first}</span> <span>{profile.last}</span>
          </h1>
          <p className="hero-lede">{profile.greeting}</p>

          <ul className="role-tags" aria-label="Roles">
            {profile.roles.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>

          <div className="actions">
            <a className="btn" href="#work">
              View work
            </a>
            <a className="btn btn-ghost" href="#contact">
              Get in touch
            </a>
          </div>
        </div>

        <figure className="window notched" aria-hidden="true">
          <div className="window-bar">
            <span>andrei-sanchez</span>
            <span>portfolio</span>
          </div>
          <div className="window-screen">
            <Scene idPrefix="home" animated={false} className="window-scene" />
          </div>
          <div className="window-status">
            <span>{profile.location}</span>
          </div>
        </figure>
      </div>
    </section>
  );
}
