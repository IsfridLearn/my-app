import Image from "next/image";
import { SpreadHead } from "../spread-head";
import { experience, photos, spreads } from "@/lib/content";

export function Experience() {
  return (
    <section id="experience" className="spread exp" aria-labelledby="experience-title">
      <SpreadHead id="experience-title" title="Experience" script={spreads.experience} />

      <div className="grid exp-body">
        <div className="exp-text">
          <p className="exp-note">{experience.note}</p>
          <ul className="exp-list">
            {experience.roles.map((role, i) => (
              <li key={role.title}>
                <p className="stack-num">[{i + 1}]</p>
                <h3>{role.title}</h3>
                <p>{role.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <figure id={photos.headshot.id} className="exp-photo">
          <Image
            src={photos.headshot.src}
            alt={photos.headshot.alt}
            width={photos.headshot.width}
            height={photos.headshot.height}
            sizes="(max-width: 1023px) 80vw, 36vw"
          />
          <figcaption className="file">
            {photos.headshot.file} {photos.headshot.label}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
