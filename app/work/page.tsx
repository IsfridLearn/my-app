import type { Metadata } from "next";
import Link from "next/link";
import { CaseStudyFooter } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Arrow } from "@/components/ui/Sprite";
import { caseStudyHref, projectFileNumber, projects } from "@/data/projects";
import { pageMetadata } from "@/data/site";

export const metadata: Metadata = pageMetadata(
  "All projects | Andrei Sanchez",
  "Every project by Andrei Sanchez, each with its own case study.",
  "/work",
);

export default function WorkIndexPage() {
  return (
    <PageShell activeSection="work" navBase="/" mainClassName="work-index" footer={<CaseStudyFooter />}>
      <SectionHeading as="h1" id="work-index-title" title="All projects" script="archive" />
      <ul className="work-list">
        {projects.map((project, index) => (
          <li key={project.id}>
            <Link className="work-row" href={caseStudyHref(project)}>
              <span className="file">{projectFileNumber(index)}</span>
              <span className="work-row-title poster">{project.title}</span>
              <span className="work-row-meta file">
                <span>{project.category}</span>
                <span>{project.label}</span>
              </span>
              <Arrow unit="4px" />
              <span className="work-row-blurb">{project.blurb}</span>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
