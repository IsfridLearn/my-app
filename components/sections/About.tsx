import { SectionHeading } from "@/components/ui/SectionHeading";
import { brands, titles } from "@/data/beyond";
import { sectionHeadings } from "@/data/navigation";
import { about, hero, profile } from "@/data/profile";

/** Splits a line before its last word, so the last word can carry the tape. */
function lastWord(line: string): [string, string] {
  const cut = line.trimEnd().lastIndexOf(" ");
  return cut < 0 ? ["", line] : [line.slice(0, cut + 1), line.slice(cut + 1)];
}

/**
 * About, centered and typographic: the statement with CAMERA on red tape and CODE
 * on white, the story under it, then the two sides as one quiet pair.
 */
export function About() {
  const [bridge, codeStory, next] = about.paragraphs;
  const [camLead, camWord] = lastWord(about.headline[0]);
  const [codeLead, codeWord] = lastWord(about.headline[1]);
  const ambassador = brands.find((brand) => brand.note === "Brand ambassador");
  const elsewhere = hero.notes.find((note) => note.title === "Elsewhere");

  return (
    <section id="about" className="spread about" aria-labelledby="about-title">
      <SectionHeading id="about-title" {...sectionHeadings.about} className="spread-center" />

      <div className="ab-center">
        <p className="ab-statement poster">
          <span className="ab-line">
            {camLead}
            <em className="ab-cam">{camWord}</em>
          </span>
          <span className="ab-sep" aria-hidden="true" />
          <span className="ab-line">
            {codeLead}
            <em className="ab-code">{codeWord}</em>
          </span>
        </p>

        <p className="file ab-meta">
          <b>05</b> About <span>/</span> {profile.location}
        </p>

        <p className="ab-story">{bridge}</p>

        <div className="ab-pair">
          <div>
            <h3 className="file">Behind the code</h3>
            <p>{codeStory}</p>
          </div>
          <div>
            <h3 className="file">Behind the lens</h3>
            <ul>
              {elsewhere && <li>{elsewhere.text}</li>}
              {ambassador && (
                <li>
                  {ambassador.note}, {ambassador.name}
                </li>
              )}
              {titles.map((title) => (
                <li key={title.name}>
                  <span lang={title.lang}>{title.name}</span> {title.year}
                </li>
              ))}
            </ul>
          </div>
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
      </div>
    </section>
  );
}
