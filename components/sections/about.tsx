import { Sprite } from "../pixel";
import { SectionHead } from "../section-head";
import { CAMERA, LAPTOP, MEDAL } from "../sprites";
import { facts } from "@/lib/content";

const ROLES = [
  {
    title: "Developer",
    note: "BSIT student, 2nd year",
    rows: LAPTOP,
    unit: "3px",
  },
  {
    title: "Model",
    note: "Works with brands beyond the college",
    rows: CAMERA,
    unit: "4px",
  },
  {
    title: "Brand ambassador",
    note: "Holy Cross of Davao College",
    rows: MEDAL,
    unit: "3px",
  },
];

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="wrap">
        <SectionHead index="02" id="about-title" title="About" />

        <div className="about-grid">
          <dl className="facts">
            {facts.map(([label, value]) => (
              <div key={label} className="fact">
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <ul className="roles" aria-label="Roles">
            {ROLES.map((r) => (
              <li key={r.title} className="role">
                <div className="role-art" aria-hidden="true">
                  <Sprite rows={r.rows} unit={r.unit} />
                </div>
                <div>
                  <p className="role-title">{r.title}</p>
                  <p className="role-note">{r.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
