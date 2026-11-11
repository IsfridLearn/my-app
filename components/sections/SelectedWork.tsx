import Link from "next/link";
import { WorkDeck } from "@/components/sections/WorkDeck";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionHeadings } from "@/data/navigation";
import { projects } from "@/data/projects";

export function SelectedWork() {
  return (
    <section id="work" className="spread work" aria-labelledby="work-title">
      <SectionHeading id="work-title" {...sectionHeadings.work} />

      <div className="work-inner">
        <div className="work-bar file">
          <p>
            02 <span className="work-dash">—</span> Projects
          </p>
          <Link className="go" href="/work">
            All projects <span aria-hidden="true">→</span>
          </Link>
        </div>

        <WorkDeck projects={projects} />
      </div>
    </section>
  );
}
