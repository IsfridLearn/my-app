import { Sprite } from "../pixel";
import { SectionHead } from "../section-head";
import { buildText } from "../sprites";
import { skills } from "@/lib/content";

const MONO_COLOR = { code: "l", stage: "u" } as const;
const MONOS: Record<string, string[]> = Object.fromEntries(
  skills.map((s) => [s.id, buildText([s.mono], { top: MONO_COLOR[s.kind] })]),
);

const GROUPS = [
  { kind: "code", label: "Development" },
  { kind: "stage", label: "Modeling & ambassadorship" },
] as const;

export function Skills() {
  return (
    <section id="skills" className="section skills-wrap" aria-labelledby="skills-title">
      <div className="wrap">
        <SectionHead index="03" id="skills-title" title="Skills" />

        <div className="skills-grid">
          {GROUPS.map((g) => {
            const items = skills.filter((s) => s.kind === g.kind);
            if (items.length === 0) return null;
            return (
              <div key={g.kind} className="skill-group">
                <h3 className="group-label">{g.label}</h3>
                <ul className="skill-list">
                  {items.map((s) => (
                    <li key={s.id} className="skill">
                      <div className="skill-mono" aria-hidden="true">
                        <Sprite rows={MONOS[s.id]} unit="3px" />
                      </div>
                      <div>
                        <p className="skill-name">{s.name}</p>
                        <p className="skill-note">{s.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
