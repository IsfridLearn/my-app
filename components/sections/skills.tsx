import { SectionHead } from "../section-head";
import { skills } from "@/lib/content";

export function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="wrap">
        <SectionHead id="skills-title" title="Skills" />

        <div className="skill-row">
          <p className="skill-intro">{skills.intro}</p>
          <ul className="skill-run">
            {skills.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
