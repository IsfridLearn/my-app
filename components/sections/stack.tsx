import { stack } from "@/lib/content";

export function Stack() {
  return (
    <section id="stack" className="stack" aria-labelledby="stack-title">
      <h2 id="stack-title" className="file">
        Stack
      </h2>
      <div>
        {stack.map((group) => (
          <div key={group.category} className="grid stack-row">
            <div className="stack-meta">
              <p className="file">{group.category}</p>
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
