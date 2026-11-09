import Link from "next/link";
import { ContentImage } from "@/components/ui/ContentImage";
import { FactList } from "@/components/ui/FactList";
import { Arrow } from "@/components/ui/Sprite";
import { TextList } from "@/components/ui/TextList";
import { projectFileNumber } from "@/data/projects";
import type { Project } from "@/types";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const facts = [
    { label: "The idea", text: project.why },
    { label: "My part", text: project.role },
    ...(project.status ? [{ label: "Status", text: project.status }] : []),
  ];
  const extraShots = project.more ?? [];

  return (
    <article id={project.id} className="project grid">
      {project.image && (
        <ContentImage
          className="project-image"
          image={project.image}
          sizes="(max-width: 1023px) 100vw, 68vw"
        />
      )}

      <div className="project-head">
        <p className="file">{projectFileNumber(index)}</p>
        <h3 className="poster">{project.title}</h3>
        <p className="project-blurb">{project.blurb}</p>
        <FactList facts={facts} className="notes" />
      </div>

      {extraShots.length > 0 && (
        <div className="project-more">
          {extraShots.map((shot) => (
            <ContentImage key={shot.src} image={shot} sizes="(max-width: 1023px) 50vw, 34vw" />
          ))}
        </div>
      )}

      <div className="project-choices">
        <h4 className="poster">Technical decisions</h4>
        <TextList items={project.choices} />
      </div>

      <div className="project-foot file">
        {project.stack.length > 0 && <p>{project.stack.join(", ")}</p>}
        {project.caseStudy && (
          <Link className="go" href={project.caseStudy}>
            Read the case study <Arrow />
          </Link>
        )}
        {project.href && (
          <a className="go" href={project.href} target="_blank" rel="noreferrer">
            Open live site <Arrow />
          </a>
        )}
        {project.source && (
          <a className="go" href={project.source} target="_blank" rel="noreferrer">
            View code <Arrow />
          </a>
        )}
      </div>
    </article>
  );
}
