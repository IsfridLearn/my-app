import { SECTIONS } from "./nav";

/** A slim numbered index fixed to the right edge on wide screens. */
export function SideRail({ active }: { active: string }) {
  return (
    <nav className="rail" aria-label="Section index">
      <ol>
        {SECTIONS.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="rail-link"
              aria-current={active === s.id ? "true" : undefined}
            >
              <span className="rail-label">{s.label}</span>
              <span className="rail-no">{String(i).padStart(2, "0")}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
