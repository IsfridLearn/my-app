import Image from "next/image";
import { Scene } from "../scene";
import { Sprite } from "../pixel";
import { ICON } from "../sprites";
import { hasContact, profile } from "@/lib/content";

export function Home() {
  const hasPhoto = profile.photo.trim() !== "";
  const name = `${profile.first} ${profile.last}`;

  return (
    <section id="home" className="home" aria-labelledby="home-title">
      <div className="wrap">
        <h1 id="home-title" className="hero-name">
          <span className="hn-1">{profile.first}</span>{" "}
          <span className="hn-2">{profile.last}</span>
        </h1>

        <div className="home-lower">
          <div className="hero">
            <ul className="role-line" aria-label="Roles">
              {profile.roles.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <p className="hero-lede">{profile.greeting}</p>
            <div className="actions">
              <a className="btn" href="#work">
                See my work
                <Sprite rows={[...ICON.arrow].map((r) => r.replace(/u/g, "k"))} unit="2px" />
              </a>
              {hasContact && (
                <a className="btn btn-ghost" href="#contact">
                  Get in touch
                </a>
              )}
            </div>
          </div>

          <figure className="plate">
            <div className="frame">
              <i className="crop tl" />
              <i className="crop tr" />
              <i className="crop bl" />
              <i className="crop br" />
              <div className={hasPhoto ? "frame-inner portrait" : "frame-inner"}>
                {hasPhoto ? (
                  <Image
                    className="plate-photo"
                    src={profile.photo}
                    alt={name}
                    width={960}
                    height={1200}
                    sizes="(max-width: 900px) 90vw, 440px"
                  />
                ) : (
                  <Scene idPrefix="home" className="plate-scene" />
                )}
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
