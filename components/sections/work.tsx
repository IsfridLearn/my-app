import Image from "next/image";
import { Sprite } from "../pixel";
import { ARROW } from "../sprites";
import { projects } from "@/lib/content";

export const fileNumber = (index: number) => `CODE·${String(index + 1).padStart(2, "0")}`;

export function Work() {
  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <h2 id="work-title" className="file work-title">
        Selected Work
      </h2>

      <div className="projects">
        {projects.map((p, i) => (
          <article key={p.id} id={p.id} className="project grid">
            {p.image && (
              <Image
                className="project-image"
                src={p.image.src}
                alt={p.image.alt}
                width={p.image.width}
                height={p.image.height}
                sizes="(max-width: 1023px) 100vw, 68vw"
              />
            )}

            <div className="project-head">
              <p className="file">{fileNumber(i)}</p>
              <h3>{p.title}</h3>
              <p>{p.blurb}</p>
              <dl className="notes">
                <div>
                  <dt className="file">The idea</dt>
                  <dd>{p.why}</dd>
                </div>
                <div>
                  <dt className="file">My part</dt>
                  <dd>{p.role}</dd>
                </div>
                {p.status && (
                  <div>
                    <dt className="file">Status</dt>
                    <dd>{p.status}</dd>
                  </div>
                )}
              </dl>
            </div>

            {p.more && p.more.length > 0 && (
              <div className="project-more">
                {p.more.map((shot) => (
                  <Image
                    key={shot.src}
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    sizes="(max-width: 1023px) 50vw, 34vw"
                  />
                ))}
              </div>
            )}

            <div className="project-choices">
              <h4 className="file">Technical decisions</h4>
              <ul>
                {p.choices.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>

            <div className="project-foot file">
              {p.stack.length > 0 && <p>{p.stack.join(", ")}</p>}
              {p.href && (
                <a className="go" href={p.href} target="_blank" rel="noreferrer">
                  Open live site <Sprite rows={ARROW} unit="2px" />
                </a>
              )}
              {p.source && (
                <a className="go" href={p.source} target="_blank" rel="noreferrer">
                  View code <Sprite rows={ARROW} unit="2px" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
