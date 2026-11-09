import Image from "next/image";
import { SectionHead } from "../section-head";
import { about, profile } from "@/lib/content";

export function About() {
  const hasPhoto = about.photo.trim() !== "";
  const hasInterests = about.interests.length > 0;
  const hasGoals = about.goals.trim() !== "";

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="wrap">
        <SectionHead id="about-title" title="About" />

        <div className={hasPhoto ? "about-top has-photo" : "about-top"}>
          <div className="about-copy">
            <p className="about-headline">
              <span>{about.headline[0]}</span>
              <span>{about.headline[1]}</span>
            </p>
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {hasInterests && <p>Interests: {about.interests.join(", ")}.</p>}
            {hasGoals && <p>{about.goals}</p>}
          </div>

          {hasPhoto && (
            <Image
              className="about-photo"
              src={about.photo}
              alt={`${profile.first} ${profile.last}`}
              width={800}
              height={1000}
              sizes="(max-width: 900px) 80vw, 340px"
            />
          )}
        </div>
      </div>
    </section>
  );
}
