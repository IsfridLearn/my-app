import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";
import { sectionHeadings } from "@/data/navigation";

export function Experience() {
  return (
    <section id="experience" className="spread exp" aria-labelledby="experience-title">
      <SectionHeading id="experience-title" {...sectionHeadings.experience} />

      <div className="grid exp-body">
        <div className="exp-text">
          <p className="exp-note">{experience.note}</p>
          <ul className="exp-list">
            {experience.roles.map((role, index) => (
              <li key={role.title}>
                <p className="index-num">[{index + 1}]</p>
                <h3 className="poster">{role.title}</h3>
                <p>{role.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
