import Image from "next/image";
import { Sprite } from "../pixel";
import { SectionHead } from "../section-head";
import { ICON } from "../sprites";
import { about, facts, profile } from "@/lib/content";

const ROLES = [
  {
    title: "Developer",
    note: "BSIT student, 2nd year",
    rows: ICON.code,
    unit: "3px",
  },
  {
    title: "Model",
    note: "Works with brands beyond the college",
    rows: ICON.camera,
    unit: "3px",
  },
  {
    title: "Brand ambassador",
    note: "Holy Cross of Davao College",
    rows: ICON.badge,
    unit: "3px",
  },
];

// The line from the original site, used as the section's opening statement.
const QUOTE = "I'm building my future, one line of code at a time.";

export function About() {
  const hasPhoto = about.photo.trim() !== "";
  const hasInterests = about.interests.length > 0;
  const hasGoals = about.goals.trim() !== "";

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="wrap">
        <SectionHead index="02" id="about-title" title="About" />

        <div className="about-top">
          <blockquote className="about-quote">
            <p>{QUOTE}</p>
            <footer>
              {profile.first} {profile.last}, {profile.location}
            </footer>
          </blockquote>

          {hasPhoto && (
            <figure className="about-photo notched">
              <Image
                src={about.photo}
                alt={`${profile.first} ${profile.last}`}
                width={640}
                height={800}
                sizes="(max-width: 900px) 80vw, 320px"
              />
            </figure>
          )}
        </div>

        <div className="about-grid">
          <dl className="facts">
            {facts.map(([label, value]) => (
              <div key={label} className="fact">
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <div>
            <ul className="roles" aria-label="Roles">
              {ROLES.map((r) => (
                <li key={r.title} className="role">
                  <div className="role-art" aria-hidden="true">
                    <Sprite rows={[...r.rows]} unit={r.unit} />
                  </div>
                  <div>
                    <p className="role-title">{r.title}</p>
                    <p className="role-note">{r.note}</p>
                  </div>
                </li>
              ))}
            </ul>

            {(hasInterests || hasGoals) && (
              <div className="about-more">
                {hasInterests && (
                  <>
                    <h3 className="group-label">Interests</h3>
                    <ul className="chips">
                      {about.interests.map((i) => (
                        <li key={i} className="chip">
                          {i}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {hasGoals && (
                  <>
                    <h3 className="group-label">Goals</h3>
                    <p>{about.goals}</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
