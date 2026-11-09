import { ContentImage } from "@/components/ui/ContentImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";
import { sectionHeadings } from "@/data/navigation";
import { photos } from "@/data/photos";

export function Experience() {
  const { headshot } = photos;

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

        <figure id={headshot.id} className="exp-photo">
          <ContentImage image={headshot} sizes="(max-width: 1023px) 80vw, 36vw" />
          <figcaption className="file">
            {headshot.file} {headshot.label}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
