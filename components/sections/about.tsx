import { Sprite } from "../pixel";
import { CAMERA, CROWN, LAPTOP, MEDAL } from "../sprites";
import { stats } from "@/lib/content";

const EQUIPMENT = [
  { slot: "Head", item: "Crown", note: "Pageant King", rows: CROWN, unit: "8px" },
  { slot: "Main hand", item: "Laptop", note: "BSIT student", rows: LAPTOP, unit: "4px" },
  { slot: "Off hand", item: "Camera", note: "Model for brands", rows: CAMERA, unit: "6px" },
  {
    slot: "Badge",
    item: "Medal",
    note: "Brand ambassador, Holy Cross of Davao College",
    rows: MEDAL,
    unit: "6px",
  },
];

export function About() {
  return (
    <section id="about" className="section wrap" aria-labelledby="about-title">
      <div className="section-head">
        <h2 id="about-title">About</h2>
      </div>

      <div className="sheet">
        <dl className="stats">
          {stats.map(([label, value]) => (
            <div key={label} className="stat">
              <dt>{label}</dt>
              <span className="leader" aria-hidden="true" />
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <div className="gear notched">
          <h3 className="gear-title">Equipped</h3>
          <ul className="gear-grid">
            {EQUIPMENT.map((e) => (
              <li key={e.item} className="gear-slot">
                <div className="gear-art" aria-hidden="true">
                  <Sprite rows={e.rows} unit={e.unit} />
                </div>
                <p className="gear-item">{e.item}</p>
                <p className="gear-note">
                  <span className="visually-hidden">{e.slot}: </span>
                  {e.note}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
