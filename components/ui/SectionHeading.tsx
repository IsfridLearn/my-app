type ScriptOverlayProps = {
  word: string;
  className: string;
  lead?: string;
};

/** The white script laid across a headline, such as "the projects". */
export function ScriptOverlay({ word, className, lead = "the" }: ScriptOverlayProps) {
  return (
    <p className={className} aria-hidden="true">
      {lead}
      <span>{word}</span>
    </p>
  );
}

type SectionHeadingProps = {
  id: string;
  title: string;
  script: string;
  className?: string;
};

/** The poster headline used by each section: a huge red title with white script across it. */
export function SectionHeading({ id, title, script, className }: SectionHeadingProps) {
  return (
    <div className={className ? `spread-head ${className}` : "spread-head"}>
      <h2 id={id} className="spread-title poster">
        {title}
      </h2>
      <ScriptOverlay className="spread-script" word={script} />
    </div>
  );
}
