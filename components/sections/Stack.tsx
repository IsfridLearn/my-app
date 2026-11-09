import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextList } from "@/components/ui/TextList";
import { sectionHeadings } from "@/data/navigation";
import { skillGroups } from "@/data/skills";

export function Stack() {
  return (
    <section id="stack" className="spread stack" aria-labelledby="stack-title">
      <SectionHeading id="stack-title" {...sectionHeadings.stack} className="spread-right" />

      <div className="stack-rows">
        {skillGroups.map((group, index) => (
          <div key={group.category} className="grid stack-row">
            <div className="stack-meta">
              <p className="index-num">[{index + 1}]</p>
              <h3>{group.category}</h3>
              {group.note && <p>{group.note}</p>}
            </div>
            <TextList items={group.items} className="stack-items slash-list poster" />
          </div>
        ))}
      </div>
    </section>
  );
}
