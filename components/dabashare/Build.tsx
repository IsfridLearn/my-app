import { CaseFigure } from "@/components/dabashare/CaseFigure";
import { TextList } from "@/components/ui/TextList";
import { dabashareCase } from "@/data/dabashare";

type FeatureColumnProps = {
  className: string;
  title: string;
  note: string;
  items: string[];
};

function FeatureColumn({ className, title, note, items }: FeatureColumnProps) {
  return (
    <div className={className}>
      <h3 className="cs-big poster">{title}</h3>
      <p className="cs-big-note">{note}</p>
      <TextList items={items} className="cs-ledger" />
    </div>
  );
}

/** What the project does, followed by how it is built. */
export function Build() {
  const { code, features, implementation, shots } = dabashareCase;

  return (
    <>
      <section className="cs-features" aria-labelledby="cs-features-title">
        <h2 id="cs-features-title" className="cs-h poster cs-pad">
          Key features
        </h2>
        <div className="grid">
          <FeatureColumn className="cs-works" {...features.works} />
          <FeatureColumn className="cs-sim" {...features.simulated} />
        </div>
      </section>

      <section className="grid cs-tech-sec" aria-labelledby="cs-build-title">
        <h2 id="cs-build-title" className="cs-h poster cs-tech-h">
          Technical implementation
        </h2>
        <dl className="cs-spec">
          {implementation.map((item) => (
            <div key={item.label}>
              <dt className="poster">{item.label}</dt>
              <dd>{item.text}</dd>
            </div>
          ))}
        </dl>
        <figure className="cs-code">
          <figcaption className="file">{code.caption}</figcaption>
          <pre tabIndex={0}>
            <code>{code.source}</code>
          </pre>
        </figure>
        <CaseFigure shot={shots.phone} className="cs-phone" sizes="(max-width: 1023px) 60vw, 22vw" />
      </section>
    </>
  );
}
