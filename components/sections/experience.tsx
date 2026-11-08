import { SectionHead } from "../section-head";
import { experience } from "@/lib/content";

export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="wrap">
        <SectionHead index="04" id="experience-title" title="Experience" />

        <ol className="timeline">
          {experience.map((r) => (
            <li key={r.title} className="entry">
              <div className="entry-top">
                <h3>{r.title}</h3>
                {r.current && <span className="badge">Current</span>}
              </div>
              <p className="entry-where">{r.where}</p>
              <p className="entry-text">{r.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
