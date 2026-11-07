"use client";

import { useState } from "react";
import { Scene } from "../scene";
import { projects } from "@/lib/content";

const BARS = ["#ece8ff", "#ffc94d", "#3fa9ff", "#ff9ccf", "#8b5cff", "#e23fa6", "#2a1b6e"];

/** The test card shown for an empty slot. */
function NoSignal() {
  return (
    <div className="no-signal" aria-hidden="true">
      <div className="bars">
        {BARS.map((c) => (
          <span key={c} style={{ background: c }} />
        ))}
      </div>
      <p>No signal</p>
    </div>
  );
}

export function Work() {
  const [id, setId] = useState(projects[0].id);
  const project = projects.find((p) => p.id === id) ?? projects[0];

  return (
    <section id="work" className="section wrap" aria-labelledby="work-title">
      <div className="section-head">
        <h2 id="work-title">Work</h2>
      </div>

      <div className="work-grid">
        <article className="crt notched" aria-live="polite">
          <div className="crt-screen" key={project.id}>
            <div className="preview">
              {project.preview === "scene" ? (
                <Scene idPrefix="work" animated={false} className="preview-scene" />
              ) : (
                <NoSignal />
              )}
            </div>

            <div className="crt-info">
              <h3>{project.title}</h3>
              <p>{project.blurb}</p>

              {project.stack.length > 0 && (
                <ul className="chips" aria-label="Built with">
                  {project.stack.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
              )}

              {(project.href || project.source) && (
                <div className="actions">
                  {project.href && (
                    <a
                      className="btn"
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open live site
                    </a>
                  )}
                  {project.source && (
                    <a
                      className="btn btn-ghost"
                      href={project.source}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View code
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </article>

        <ul className="shelf" aria-label="Projects">
          {projects.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                className="cart notched"
                aria-pressed={p.id === id}
                onClick={() => setId(p.id)}
              >
                <span className={`cart-label hue-${p.hue}`} aria-hidden="true" />
                <span className="cart-text">
                  <span className="cart-title">{p.title}</span>
                  <span className="cart-sub">
                    {p.preview === "empty" ? "Empty" : p.stack.join(", ")}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
