"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import Link from "next/link";
import { ContentImage } from "@/components/ui/ContentImage";
import { caseStudyHref, projectFileNumber } from "@/data/projects";
import type { Project } from "@/types";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Selected Work as cut-paper spreads, one project at a time. The arrows inside the
 * spread, the arrow keys or a sideways swipe change the project.
 */
export function ProjectDossier({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const [inViewRef, seen] = useInView();
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const count = projects.length;
  const show = (index: number) => setActive((index + count) % count);

  // A sideways swipe on a touch screen changes the project; a mostly vertical one still scrolls.
  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    swipe.current = { x: event.clientX, y: event.clientY };
  };
  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) show(dx < 0 ? active + 1 : active - 1);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      show(active + (event.key === "ArrowLeft" ? -1 : 1));
    }
  };

  return (
    <div ref={inViewRef} className="dossier" data-inview={seen || undefined}>
      <div
        className="ds-stage"
        role="group"
        aria-roledescription="carousel"
        aria-label="Projects. Use the left and right arrow keys to change project."
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => (swipe.current = null)}
      >
        {/* Keyed by project, so the entrance replays on every change. */}
        <Spread
          key={projects[active].id}
          project={projects[active]}
          index={active}
          count={count}
          prevTitle={projects[(active - 1 + count) % count].title}
          nextTitle={projects[(active + 1) % count].title}
          onPrev={() => show(active - 1)}
          onNext={() => show(active + 1)}
        />
      </div>
    </div>
  );
}

type SpreadProps = {
  project: Project;
  index: number;
  count: number;
  prevTitle: string;
  nextTitle: string;
  onPrev: () => void;
  onNext: () => void;
};

/** One project: number, cut-paper title, pinned screenshots, details, spec and actions. */
function Spread({ project, index, count, prevTitle, nextTitle, onPrev, onNext }: SpreadProps) {
  const { tone, shots, spec } = project;
  const [main, two, three] = shots;
  const titleId = `sp-title-${project.id}`;
  const status = project.href ? `Live · ${new URL(project.href).host}` : project.label;

  return (
    <article className="sp" data-tone={tone} aria-labelledby={titleId}>
      <span className="sp-field" aria-hidden="true" />
      <span className="sp-band-w" aria-hidden="true" />
      <span className="sp-band" aria-hidden="true" />
      <span className="sp-wipe sp-wipe-red" aria-hidden="true" />
      <span className="sp-wipe sp-wipe-black" aria-hidden="true" />
      <p className="sp-num poster" aria-hidden="true">
        {pad(index + 1)}
      </p>

      <p className="sp-meta">
        {projectFileNumber(index)} / {project.category}
      </p>
      <h3 id={titleId} className="sp-title" style={{ "--len": project.title.length } as CSSProperties}>
        <span className="sp-edge">
          <span className="sp-ink poster">
            <AccentTitle title={project.title} />
          </span>
        </span>
      </h3>

      {main ? (
        <>
          <Link className="sp-shot sp-shot-main" href={caseStudyHref(project)} tabIndex={-1} aria-hidden="true">
            <span className="sp-edge">
              <ContentImage image={main} sizes="(max-width: 999px) 100vw, 48vw" />
            </span>
          </Link>
          {two && (
            <figure className="sp-shot sp-shot-two">
              <span className="sp-edge">
                <ContentImage image={two} sizes="(max-width: 999px) 50vw, 23vw" />
              </span>
            </figure>
          )}
          {three && (
            <figure className="sp-shot sp-shot-three">
              <span className="sp-edge">
                <ContentImage image={three} sizes="(max-width: 999px) 50vw, 18vw" />
              </span>
            </figure>
          )}
        </>
      ) : (
        <div className="sp-poster">
          <ContentImage image={project.cover} className="sp-poster-logo" sizes="(max-width: 999px) 50vw, 20vw" />
          {project.cover.caption && <p className="sp-poster-caption poster">{project.cover.caption}</p>}
        </div>
      )}

      <p className="sp-tape">{status}</p>

      <div className="sp-info">
        <div className="sp-edge">
          <div className="sp-ink">
            <p className="sp-kicker">{project.label}</p>
            <p>{project.blurb}</p>
            <ul className="sp-chips" aria-label="Built with">
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="sp-col">
        <b>Spec</b>
        {spec}
      </p>

      <div className="sp-actions">
        <Link className="sp-cta" href={caseStudyHref(project)}>
          Project details<span className="sr-only">: {project.title}</span> <span aria-hidden="true">↗</span>
        </Link>
        {project.href ? (
          <a className="sp-live" href={project.href} target="_blank" rel="noreferrer">
            Live preview<span className="sr-only">: {project.title}</span> <span aria-hidden="true">↗</span>
          </a>
        ) : (
          project.source && (
            <a className="sp-live" href={project.source} target="_blank" rel="noreferrer">
              Source code<span className="sr-only">: {project.title}</span> <span aria-hidden="true">↗</span>
            </a>
          )
        )}
      </div>

      {count > 1 && (
        <nav className="sp-arrows" aria-label="Projects">
          <button type="button" className="sp-arrow" onClick={onPrev} aria-label={`Previous project: ${prevTitle}`}>
            <span aria-hidden="true">⟵</span>
          </button>
          <p className="sp-count" aria-live="polite">
            {pad(index + 1)} / {pad(count)}
          </p>
          <button type="button" className="sp-arrow" onClick={onNext} aria-label={`Next project: ${nextTitle}`}>
            <span aria-hidden="true">⟶</span>
          </button>
        </nav>
      )}

      <span className="sp-grain" aria-hidden="true" />
    </article>
  );
}

/** The title with a red accent: the last word, or the last two letters of a single word. */
function AccentTitle({ title }: { title: string }) {
  const space = title.lastIndexOf(" ");
  const cut = space > 0 ? space + 1 : Math.max(title.length - 2, 1);
  return (
    <>
      {title.slice(0, cut)}
      <em>{title.slice(cut)}</em>
    </>
  );
}

/** Becomes true once the element is a quarter on screen, so the entrance is seen. */
function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || seen) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [seen]);

  return [ref, seen] as const;
}
