import Link from "next/link";
import { Arrow } from "@/components/ui/Sprite";
import { caseStudyHref, projects } from "@/data/projects";

/** Back to the project deck, and on to the next project's case study. */
export function CaseStudyPager({ id }: { id: string }) {
  const index = projects.findIndex((project) => project.id === id);
  const next = projects[(index + 1) % projects.length];

  return (
    <nav className="cs-pager" aria-label="Projects">
      <Link className="cs-pager-back file" href="/#work">
        <span aria-hidden="true">←</span> Back to projects
      </Link>
      {next.id !== id && (
        <Link className="cs-pager-next" href={caseStudyHref(next)}>
          <span className="file">
            Next project <span aria-hidden="true">→</span>
          </span>
          <span className="cs-pager-title poster">
            {next.title} <Arrow unit="5px" />
          </span>
        </Link>
      )}
    </nav>
  );
}
