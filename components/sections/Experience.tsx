import Link from "next/link";
import { ContentImage } from "@/components/ui/ContentImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Arrow } from "@/components/ui/Sprite";
import { experience } from "@/data/experience";
import { sectionHeadings } from "@/data/navigation";

/** The roles as case files: a number, the role, what it covers and a preview of the work. */
export function Experience() {
  return (
    <section id="experience" className="spread exp" aria-labelledby="experience-title">
      <SectionHeading id="experience-title" {...sectionHeadings.experience} />

      {/* The note runs along a strip of red tape; the repeats are decoration only. */}
      <div className="exp-tape">
        <p>
          {experience.note}
          <span aria-hidden="true">
            {" "}
            ✕ {experience.note} ✕ {experience.note} ✕ {experience.note}
          </span>
        </p>
      </div>

      <ol className="exp-files">
        {experience.roles.map((role, index) => {
          const [main, second] = role.shots;
          const number = String(index + 1).padStart(2, "0");

          return (
            <li key={role.title} className="xp" data-preview={second ? (index === 1 ? "inset" : "pair") : "single"}>
              <div className="xp-text">
                <p className="xp-num" aria-hidden="true">
                  {number}
                </p>
                <h3 className="xp-title poster">{role.title}</h3>
                <p className="xp-copy">{role.text}</p>
                <ul className="xp-tags file" aria-label="Covers">
                  {role.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <Link className="xp-link file" href={role.link.href}>
                  <span>{role.link.label}</span>
                  <Arrow />
                </Link>
              </div>

              <Link className="xp-preview" href={role.link.href} tabIndex={-1} aria-hidden="true">
                <span className="xp-shot xp-shot-main">
                  <ContentImage image={main} sizes="(max-width: 899px) 92vw, 52vw" />
                </span>
                {second && (
                  <span className="xp-shot xp-shot-second">
                    <ContentImage image={second} sizes="(max-width: 899px) 46vw, 26vw" />
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
