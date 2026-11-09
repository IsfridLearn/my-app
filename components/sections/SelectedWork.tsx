import { ProjectCard } from "@/components/sections/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionHeadings } from "@/data/navigation";
import { projects } from "@/data/projects";

export function SelectedWork() {
  return (
    <section id="work" className="spread work" aria-labelledby="work-title">
      <SectionHeading id="work-title" {...sectionHeadings.work} />

      <div className="projects">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
