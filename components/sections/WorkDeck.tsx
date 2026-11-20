"use client";

import { useRef, useState, type KeyboardEvent, type MouseEvent, type PointerEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ContentImage } from "@/components/ui/ContentImage";
import { Arrow } from "@/components/ui/Sprite";
import { caseStudyHref, projectFileNumber } from "@/data/projects";
import type { Project } from "@/types";

type Position = "front" | "next" | "prev" | "away";

/** Where a card sits relative to the one in front. */
function positionOf(index: number, active: number, count: number): Position {
  const distance = (index - active + count) % count;
  if (distance === 0) return "front";
  if (distance === 1) return "next";
  if (distance === count - 1) return "prev";
  return "away";
}

/** The projects as a stack of prints: one in front, its neighbours tilted behind it. */
export function WorkDeck({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const router = useRouter();
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const count = projects.length;
  const show = (index: number) => setActive((index + count) % count);

  // A sideways swipe on a touch screen changes the card; a mostly vertical one still scrolls.
  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    swipe.current = { x: event.clientX, y: event.clientY };
    swiped.current = false;
  };
  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      swiped.current = true;
      show(dx < 0 ? active + 1 : active - 1);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      show(active - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      show(active + 1);
    }
  };

  return (
    <div className="deck">
      <div
        className="deck-stage"
        role="group"
        aria-roledescription="carousel"
        aria-label="Projects. Use the left and right arrow keys to change project."
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => (swipe.current = null)}
      >
        {projects.map((project, index) => {
          const position = positionOf(index, active, count);
          const isFront = position === "front";

          // The front card opens its project from anywhere on it. A card behind
          // comes forward instead. A swipe that just ended is not a click.
          const handleClick = (event: MouseEvent<HTMLElement>) => {
            if (swiped.current) {
              event.preventDefault();
              swiped.current = false;
              return;
            }
            if (!isFront) {
              event.preventDefault();
              show(index);
              return;
            }
            if (!(event.target as HTMLElement).closest("a")) router.push(caseStudyHref(project));
          };

          return (
            <article
              key={project.id}
              className="deck-card"
              data-position={position}
              aria-hidden={!isFront}
              onClick={handleClick}
            >
              <div className="deck-top file">
                <span>{projectFileNumber(index)}</span>
                <span className="deck-category">{project.category}</span>
              </div>

              <DeckCover project={project} />

              <div className="deck-body">
                <h3 className="deck-title poster">{project.title}</h3>
                <p className="deck-blurb">{project.blurb}</p>
                <div className="deck-meta">
                  <ul className="deck-stack" aria-label="Built with">
                    {project.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <span className="deck-label">{project.label}</span>
                </div>
              </div>

              <div className="deck-actions file">
                <Link className="deck-link" href={caseStudyHref(project)} tabIndex={isFront ? 0 : -1}>
                  <span>
                    Project details<span className="sr-only">: {project.title}</span>
                  </span>
                  <Arrow />
                </Link>
                {project.href && (
                  <a
                    className="deck-link deck-live"
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={isFront ? 0 : -1}
                  >
                    <span>
                      Live preview<span className="sr-only">: {project.title}</span>
                    </span>
                    <Arrow />
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {count > 1 && (
        <div className="deck-controls">
          <button
            type="button"
            className="deck-button"
            aria-label="Previous project"
            onClick={() => show(active - 1)}
          >
            <span aria-hidden="true">⟵</span>
          </button>
          <div className="deck-status">
            <p className="deck-count" aria-live="polite">
              <b>{String(active + 1).padStart(2, "0")}</b> / {String(count).padStart(2, "0")}
              <span className="deck-count-title"> — {projects[active].title}</span>
            </p>
            <ul className="deck-ticks">
              {projects.map((project, index) => (
                <li key={project.id}>
                  <button
                    type="button"
                    className="deck-tick"
                    aria-label={`Show ${project.title}`}
                    aria-current={index === active ? "true" : undefined}
                    onClick={() => show(index)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <button
            type="button"
            className="deck-button"
            aria-label="Next project"
            onClick={() => show(active + 1)}
          >
            <span aria-hidden="true">⟶</span>
          </button>
        </div>
      )}
    </div>
  );
}

function DeckCover({ project }: { project: Project }) {
  const { cover } = project;

  if (cover.kind === "logo") {
    return (
      <div className="deck-cover deck-cover-logo">
        <ContentImage image={cover} className="deck-logo" sizes="200px" />
        {cover.caption && <span className="file">{cover.caption}</span>}
      </div>
    );
  }

  return (
    <ContentImage
      image={cover}
      className="deck-cover deck-shot"
      sizes="(max-width: 760px) 100vw, 560px"
    />
  );
}
