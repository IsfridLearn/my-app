import { SectionHead } from "../section-head";
import { projects } from "@/lib/content";

export function Work() {
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="wrap">
        <SectionHead id="work-title" title="Work" />

        <p className="work-lead">
          {projects.length === 1
            ? "One project so far: the site you're looking at."
            : "What I've built so far, and why."}
        </p>

        <ol className="projects">
          {projects.map((p) => (
            <li key={p.id} className="project">
              <div className="project-head">
                <h3>{p.title}</h3>
                <p className="project-blurb">{p.blurb}</p>
                {p.stack.length > 0 && (
                  <p className="project-stack">Built with {p.stack.join(", ")}.</p>
                )}
                {(p.href || p.source) && (
                  <div className="actions">
                    {p.href && (
                      <a className="btn" href={p.href} target="_blank" rel="noreferrer">
                        Open live site
                      </a>
                    )}
                    {p.source && (
                      <a
                        className="btn btn-ghost"
                        href={p.source}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View code
                      </a>
                    )}
                  </div>
                )}
              </div>

              <dl className="notes">
                <div>
                  <dt>Why I made it</dt>
                  <dd>{p.why}</dd>
                </div>
                <div>
                  <dt>My part</dt>
                  <dd>{p.role}</dd>
                </div>
                <div>
                  <dt>Choices</dt>
                  <dd>
                    <ul>
                      {p.choices.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
