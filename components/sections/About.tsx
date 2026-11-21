import { ContentImage } from "@/components/ui/ContentImage";
import { DropCap } from "@/components/ui/DropCap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brands, titles } from "@/data/beyond";
import { sectionHeadings } from "@/data/navigation";
import { portraitArt, prints } from "@/data/photos";
import { about, hero, profile } from "@/data/profile";

/**
 * Two sides of one person: the statement beside a large portrait, then the code
 * and the camera as two panels. Every line comes from the existing content.
 */
export function About() {
  const [bridge, codeStory, next] = about.paragraphs;
  const ambassador = brands.find((brand) => brand.note === "Brand ambassador");
  const elsewhere = hero.notes.find((note) => note.title === "Elsewhere");

  return (
    <section id="about" className="spread about" aria-labelledby="about-title">
      <SectionHeading id="about-title" {...sectionHeadings.about} />

      <div className="ab-lead">
        <figure className="about-fig">
          <ContentImage className="about-outline" image={portraitArt.outlineLight} sizes="(max-width: 899px) 80vw, 40vw" />
          <ContentImage className="about-print" image={prints.light} sizes="(max-width: 899px) 70vw, 36vw" />
        </figure>

        <div className="ab-statement">
          <p className="ab-big poster">
            <span className="ab-red">{about.headline[0]}</span>
            <span>{about.headline[1]}</span>
          </p>
          <p className="file ab-meta">
            <b>05</b> About <span>/</span> {profile.location}
          </p>
          <p className="ab-bridge">
            <DropCap text={bridge} />
          </p>
        </div>
      </div>

      <div className="ab-sides">
        <article className="ab-panel ab-code">
          <h3 className="tape">
            <span className="tape-num">01</span> Behind the code
          </h3>
          <p>{codeStory}</p>
        </article>

        <article className="ab-panel ab-lens">
          <h3 className="tape tape-flip">
            <span className="tape-num">02</span> Behind the lens
          </h3>
          <ul className="ab-lens-list">
            {elsewhere && (
              <li>
                <span className="file">{elsewhere.title}</span>
                <span>{elsewhere.text}</span>
              </li>
            )}
            {ambassador && (
              <li>
                <span className="file">{ambassador.note}</span>
                <span>{ambassador.name}</span>
              </li>
            )}
            {titles.map((title) => (
              <li key={title.name}>
                <span className="file">{title.year}</span>
                <span lang={title.lang}>{title.name}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>

      {about.interview.length > 0 && (
        <dl className="interview">
          {about.interview.map((item) => (
            <div key={item.question}>
              <dt>{item.question}</dt>
              <dd>{item.answer}</dd>
            </div>
          ))}
        </dl>
      )}

      {next && (
        <p className="ab-next">
          <span className="file">Next</span> {next}
        </p>
      )}
    </section>
  );
}
