"use client";

import { useId, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { Scene } from "../scene";
import { SectionHead } from "../section-head";
import { profile, projects } from "@/lib/content";
import type { Project } from "@/lib/content";

const TABS = [
  { id: "problem", label: "Problem" },
  { id: "part", label: "My part" },
  { id: "decisions", label: "Decisions" },
] as const;
type TabId = (typeof TABS)[number]["id"];

function Case({ project, index }: { project: Project; index: number }) {
  const uid = useId();
  const [tab, setTab] = useState<TabId>("problem");
  const [playing, setPlaying] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + TABS.length) % TABS.length;
    setTab(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <li className="project">
      <div className="project-visual">
        <div className="frame">
          <i className="crop tl" />
          <i className="crop tr" />
          <i className="crop bl" />
          <i className="crop br" />
          <div className="frame-inner" aria-hidden="true">
            {project.preview === "scene" ? (
              <Scene
                idPrefix={`work-${project.id}`}
                animated={playing}
                className="frame-scene"
              />
            ) : (
              <div className="frame-blank" />
            )}
          </div>
        </div>
        <div className="project-caption">
          <div>
            <p>{project.title}</p>
            <p className="project-caption-sub">{profile.location}</p>
          </div>
          <span>({project.category})</span>
        </div>
        {project.preview === "scene" && (
          <button
            type="button"
            className="screen-toggle"
            aria-pressed={playing}
            onClick={() => setPlaying((p) => !p)}
          >
            {playing ? "Pause the scene" : "Play the scene"}
          </button>
        )}
      </div>

      <div className="project-meta">
        <p className="project-no">
          {String(index + 1).padStart(2, "0")} <span>/ {project.category}</span>
        </p>
        <h3>{project.title}</h3>
        <p className="project-blurb">{project.blurb}</p>

        <div className="tabs" role="tablist" aria-label={`${project.title} details`}>
          {TABS.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`${uid}-panel`}
              tabIndex={tab === t.id ? 0 : -1}
              className="tab"
              onClick={() => setTab(t.id)}
              onKeyDown={(e) => onKey(e, i)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div
          className="tab-panel"
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-tab-${tab}`}
        >
          {tab === "problem" && <p>{project.problem}</p>}
          {tab === "part" && <p>{project.contribution}</p>}
          {tab === "decisions" && (
            <ul>
              {project.decisions.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          )}
        </div>

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
              <a className="btn" href={project.href} target="_blank" rel="noreferrer">
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
    </li>
  );
}

export function Work() {
  const categories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category))),
    [],
  );
  const [category, setCategory] = useState("All");
  const shown = projects.filter((p) => category === "All" || p.category === category);

  return (
    <section id="work" className="section band" aria-labelledby="work-title">
      <div className="wrap">
        <SectionHead index="01" id="work-title" title="Work" />

        <p className="work-lead">A selection of work, and the thinking behind it.</p>

        {categories.length > 1 && (
          <div className="filters" role="group" aria-label="Filter projects">
            {["All", ...categories].map((c) => (
              <button
                key={c}
                type="button"
                className="filter"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        <ol className="projects">
          {shown.map((p, i) => (
            <Case key={p.id} project={p} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
