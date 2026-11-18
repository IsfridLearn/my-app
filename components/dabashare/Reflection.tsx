import { Arrow } from "@/components/ui/Sprite";
import { TextList } from "@/components/ui/TextList";
import { dabashareCase } from "@/data/dabashare";

/** Lessons learned, what comes next and the link to the code. */
export function Reflection() {
  const { closing, future, futureIntro, keyLearnings, learnings, linkNote, repository } = dabashareCase;

  return (
    <>
      <section className="grid cs-learn" aria-labelledby="cs-learn-title">
        <h2 id="cs-learn-title" className="cs-h poster cs-learn-h">
          Challenges and learnings
        </h2>
        <ol className="cs-notes">
          {learnings.map((learning, index) => (
            <li key={learning.title}>
              <p className="index-num">[{index + 1}]</p>
              <h3 className="poster">{learning.title}</h3>
              <p>{learning.challenge}</p>
              <p className="cs-learned">{learning.learned}</p>
            </li>
          ))}
        </ol>
        <div className="cs-prose">
          <h3 className="cs-sub">Key learnings</h3>
          {keyLearnings.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="grid cs-next" aria-labelledby="cs-next-title">
        <h2 id="cs-next-title" className="cs-h poster cs-next-h">
          What comes next
        </h2>
        <div className="cs-next-list cs-next-body">
          <p>{futureIntro}</p>
          <TextList items={future} className="cs-ledger" />
          <p>{closing}</p>
        </div>
      </section>

      <section className="cs-links" aria-label="Project links">
        <a className="cs-repo poster" href={repository} target="_blank" rel="noreferrer">
          View the code
          <Arrow unit="6px" />
        </a>
        <p className="file">{linkNote}</p>
      </section>
    </>
  );
}
