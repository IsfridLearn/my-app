import Link from "next/link";
import { ProjectDossier } from "@/components/sections/ProjectDossier";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionHeadings } from "@/data/navigation";
import { projects } from "@/data/projects";

export function SelectedWork() {
  return (
    <section id="work" className="spread work" aria-labelledby="work-title">
      <SectionHeading id="work-title" {...sectionHeadings.work} />

      <div className="work-inner">
        <div className="work-bar file">
          <Link className="go" href="/work">
            All projects <span aria-hidden="true">→</span>
          </Link>
        </div>

        <ProjectDossier projects={projects} />
      </div>
    </section>
  );
}
