"use client";

import { useState, type KeyboardEvent, type MouseEvent } from "react";
import Link from "next/link";
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
  const count = projects.length;
  const show = (index: number) => setActive((index + count) % count);

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
      >
        {projects.map((project, index) => {
          const position = positionOf(index, active, count);
          const isFront = position === "front";

          // A card behind the front one comes forward when clicked, instead of following its link.
          const handleClick = (event: MouseEvent<HTMLElement>) => {
            if (isFront) return;
            event.preventDefault();
            show(index);
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

              <Link className="deck-link file" href={caseStudyHref(project)} tabIndex={isFront ? 0 : -1}>
                <span>
                  View case study<span className="sr-only">: {project.title}</span>
                </span>
                <Arrow />
              </Link>
            </article>
          );
        })}
      </div>

      {count > 1 && (
        <div className="deck-controls">
          <button type="button" className="deck-button" onClick={() => show(active - 1)}>
            <span aria-hidden="true">←</span> Prev
          </button>
          <p className="deck-count" aria-live="polite">
            <b>{String(active + 1).padStart(2, "0")}</b> / {String(count).padStart(2, "0")}
            <span className="sr-only">: {projects[active].title}</span>
          </p>
          <button type="button" className="deck-button" onClick={() => show(active + 1)}>
            Next <span aria-hidden="true">→</span>
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
