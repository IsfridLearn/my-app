import Image from "next/image";
import { experience, photos } from "@/lib/content";

export function Experience() {
  return (
    <section id="experience" className="grid experience" aria-labelledby="experience-title">
      <div className="experience-head">
        <h2 id="experience-title" className="file">
          Experience
        </h2>
        <p>{experience.note}</p>
        <figure id={photos.headshot.id} className="plate">
          <Image
            src={photos.headshot.src}
            alt={photos.headshot.alt}
            width={photos.headshot.width}
            height={photos.headshot.height}
            sizes="300px"
          />
          <figcaption className="file">
            {photos.headshot.file} {photos.headshot.label}
          </figcaption>
        </figure>
      </div>
      <ul className="experience-list">
        {experience.roles.map((role) => (
          <li key={role.title}>
            <h3>{role.title}</h3>
            <p>{role.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
