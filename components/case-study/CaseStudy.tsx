import Link from "next/link";
import { CaseStudyPager } from "@/components/case-study/CaseStudyPager";
import { CaseSlot, Todo } from "@/components/case-study/Todo";
import { CaseStudyFooter } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Arrow } from "@/components/ui/Sprite";
import { TextList } from "@/components/ui/TextList";
import { projects } from "@/data/projects";
import type { CaseStudyContent } from "@/types";

/**
 * A case study laid out like the DabaShare one, built from a data file.
 * Anything not written yet shows as a marked placeholder instead of being left out.
 */
export function CaseStudy({ content }: { content: CaseStudyContent }) {
  const project = projects.find((entry) => entry.id === content.id);
  if (!project) throw new Error(`No project with the id "${content.id}" in data/projects.ts`);

  return (
    <PageShell activeSection="work" navBase="/" mainClassName="cs" footer={<CaseStudyFooter />}>
      <SectionHeading id="cs-title" title={project.title} script="case study" />

      <section className="grid cs-intro" aria-label="Project introduction">
        <CaseSlot slot={content.lead} className="cs-lead" sizes="(max-width: 1023px) 100vw, 68vw" />
        <div className="cs-intro-text">
          <Link className="file go cs-back" href="/#work">
            Selected Work
          </Link>
          <dl className="facts">
            {content.intro.map((fact, index) => (
              <div key={fact.label}>
                <dt>
                  <span>[{index + 1}]</span> {fact.label}
                </dt>
                <dd>{fact.text ?? <Todo>{fact.todo ?? "This part."}</Todo>}</dd>
              </div>
            ))}
          </dl>
          <p className="cs-status">
            <b>Status:</b> {content.status}
          </p>
        </div>
      </section>

      <section className="grid cs-overview" aria-labelledby="cs-overview-title">
        <h2 id="cs-overview-title" className="cs-h poster cs-overview-h">
          Overview
        </h2>
        <div className="cs-objectives">
          <h3 className="cs-sub">Goals</h3>
          {content.goals ? (
            <TextList items={content.goals} className="cs-list" />
          ) : (
            <Todo>What the project set out to do, and for whom.</Todo>
          )}
        </div>
        <div className="cs-role">
          <h3 className="cs-sub">My role</h3>
          {project.role ? <p>{project.role}</p> : <Todo>Solo or team, and which parts you built.</Todo>}
          <h3 className="cs-sub">Timeline</h3>
          {content.timeline ? <p>{content.timeline}</p> : <Todo>When you built it, and for how long.</Todo>}
          <h3 className="cs-sub">Technologies</h3>
          <TextList items={content.tech} className="cs-tech slash-list poster" />
          {content.techNote && <p>{content.techNote}</p>}
        </div>
      </section>

      <section className="grid cs-direction" aria-labelledby="cs-direction-title">
        <h2 id="cs-direction-title" className="cs-h poster cs-direction-h">
          Design and direction
        </h2>
        <TextList items={content.direction} className="cs-list cs-direction-list" />
        <div className="cs-shots">
          {content.shots.map((slot, index) => (
            <CaseSlot key={index} slot={slot} className="cs-shots-item" sizes="(max-width: 1023px) 100vw, 50vw" />
          ))}
        </div>
      </section>

      <section className="grid cs-features-sec" aria-labelledby="cs-features-title">
        <h2 id="cs-features-title" className="cs-h poster cs-features-h">
          Main features
        </h2>
        <TextList items={content.features} className="cs-ledger cs-feature-list" />
      </section>

      <section className="grid cs-tech-sec" aria-labelledby="cs-build-title">
        <h2 id="cs-build-title" className="cs-h poster cs-tech-h">
          How it&apos;s built
        </h2>
        <dl className="cs-spec">
          {content.implementation.map((entry) => (
            <div key={entry.label}>
              <dt className="poster">{entry.label}</dt>
              <dd>{entry.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="grid cs-learn" aria-labelledby="cs-learn-title">
        <h2 id="cs-learn-title" className="cs-h poster cs-learn-h">
          Challenges and learnings
        </h2>
        {content.challenges ? (
          <ol className="cs-notes">
            {content.challenges.map((item, index) => (
              <li key={item.title}>
                <p className="index-num">[{index + 1}]</p>
                <h3 className="poster">{item.title}</h3>
                <p>{item.challenge}</p>
                <p className="cs-learned">{item.solution}</p>
              </li>
            ))}
          </ol>
        ) : (
          <div className="cs-todo-block">
            <Todo>What was hard while building it, and how you solved it.</Todo>
          </div>
        )}
        <div className="cs-todo-block">
          <h3 className="cs-sub">Key learnings</h3>
          {content.learnings ? (
            <TextList items={content.learnings} className="cs-list" />
          ) : (
            <Todo>What you know now that you didn&apos;t before.</Todo>
          )}
        </div>
      </section>

      <section className="grid cs-next" aria-labelledby="cs-next-title">
        <h2 id="cs-next-title" className="cs-h poster cs-next-h">
          What comes next
        </h2>
        {content.future ? (
          <TextList items={content.future} className="cs-ledger cs-next-list" />
        ) : (
          <div className="cs-next-list">
            <Todo>What you plan to add or fix next.</Todo>
          </div>
        )}
      </section>

      <section className="cs-links" aria-label="Project links">
        {project.source && (
          <a className="cs-repo poster" href={project.source} target="_blank" rel="noreferrer">
            View the code
            <Arrow unit="6px" />
          </a>
        )}
        {content.linkNote && <p className="file">{content.linkNote}</p>}
      </section>

      <CaseStudyPager id={project.id} />
    </PageShell>
  );
}
