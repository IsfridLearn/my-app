import { SpreadHead } from "../spread-head";
import { spreads, stack } from "@/lib/content";

export function Stack() {
  return (
    <section id="stack" className="spread stack" aria-labelledby="stack-title">
      <SpreadHead id="stack-title" title="Stack" script={spreads.stack} className="spread-right" />
      <div className="stack-rows">
        {stack.map((group, i) => (
          <div key={group.category} className="grid stack-row">
            <div className="stack-meta">
              <p className="stack-num">[{i + 1}]</p>
              <h3>{group.category}</h3>
              {group.note && <p>{group.note}</p>}
            </div>
            <ul className="stack-items">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
