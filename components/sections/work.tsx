import { Scene } from "../scene";
import { SectionHead } from "../section-head";
import { projects } from "@/lib/content";

export function Work() {
  return (
    <section id="work" className="section band" aria-labelledby="work-title">
      <div className="wrap">
        <SectionHead index="01" id="work-title" title="Work" />

        <ol className="projects">
          {projects.map((p, i) => (
            <li key={p.id} className="project">
              <div className="screen notched" aria-hidden="true">
                <div className="screen-inner">
                  {p.preview === "scene" ? (
                    <Scene
                      idPrefix={`work-${p.id}`}
                      animated={false}
                      className="screen-scene"
                    />
                  ) : (
                    <div className="screen-blank" />
                  )}
                </div>
              </div>

              <div className="project-meta">
                <p className="project-no">{String(i + 1).padStart(2, "0")}</p>
                <h3>{p.title}</h3>
                <p className="project-blurb">{p.blurb}</p>

                {p.stack.length > 0 && (
                  <ul className="chips" aria-label="Built with">
                    {p.stack.map((s) => (
                      <li key={s} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                )}

                {(p.href || p.source) && (
                  <div className="actions">
                    {p.href && (
                      <a
                        className="btn"
                        href={p.href}
                        target="_blank"
                        rel="noreferrer"
                      >
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
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
