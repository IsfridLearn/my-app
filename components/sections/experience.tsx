import { SectionHead } from "../section-head";
import { experience } from "@/lib/content";

export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="wrap">
        <SectionHead id="experience-title" title="Experience" />

        <ol className="timeline">
          {experience.map((r) => (
            <li key={r.title} className="entry">
              <h3>{r.title}</h3>
              <p className="entry-where">{r.where}</p>
              <p className="entry-text">{r.text}</p>
              <span className="entry-now">{r.now ? "Now" : ""}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
