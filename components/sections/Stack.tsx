import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionHeadings } from "@/data/navigation";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { toolIcons } from "@/data/tool-icons";
import type { SkillGroup } from "@/types";

/** Letters for tools that have no official logo in the icon set. */
const monograms: Record<string, string> = { Java: "J", "Visual Studio Code": "VS", ChatGPT: "GPT" };

/** The projects on this site that list a tool in their stack. */
function usedIn(tool: string): string[] {
  const name = tool.toLowerCase();
  return projects.filter((project) => project.stack.some((item) => item.toLowerCase() === name)).map((project) => project.title);
}

/** The technical arsenal: each group of tools with its own layout, under a strip of red tape. */
export function Stack() {
  // The two compact groups share one row on wide screens.
  const compact = skillGroups.filter((group) => group.layout === "compact");
  const rest = skillGroups.filter((group) => group.layout !== "compact");

  return (
    <section id="stack" className="spread stack" aria-labelledby="stack-title">
      <SectionHeading id="stack-title" {...sectionHeadings.stack} className="spread-right" />

      <div className="arsenal">
        {rest.map((group) => (
          <Group key={group.category} group={group} index={skillGroups.indexOf(group)} />
        ))}
        {compact.length > 0 && (
          <div className="arsenal-pair">
            {compact.map((group) => (
              <Group key={group.category} group={group} index={skillGroups.indexOf(group)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Group({ group, index }: { group: SkillGroup; index: number }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <section className="ars-group" data-layout={group.layout} aria-labelledby={`ars-${index}`}>
      <h3 id={`ars-${index}`} className="tape ars-tape">
        <span className="tape-num">{number}</span> {group.category}
      </h3>
      {group.note && <p className="ars-note">{group.note}</p>}
      <ul className="ars-tools">
        {group.items.map((tool) => (
          <Tool key={tool} name={tool} />
        ))}
      </ul>
    </section>
  );
}

function Tool({ name }: { name: string }) {
  const path = toolIcons[name];
  const projectsUsing = usedIn(name);

  return (
    <li className="tool">
      {path ? (
        <svg className="tool-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d={path} />
        </svg>
      ) : (
        monograms[name] && (
          <span className="tool-icon tool-mono" aria-hidden="true">
            {monograms[name]}
          </span>
        )
      )}
      <span className="tool-name">{name}</span>
      {projectsUsing.length > 0 && <span className="tool-used file">Used in {projectsUsing.join(" · ")}</span>}
    </li>
  );
}
