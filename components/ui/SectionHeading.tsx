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
  /** "h1" when the headline is the page title, as on project pages. */
  as?: "h1" | "h2";
};

/** The poster headline used by each section: a huge red title with white script across it. */
export function SectionHeading({ id, title, script, className, as: Heading = "h2" }: SectionHeadingProps) {
  return (
    <div className={className ? `spread-head ${className}` : "spread-head"}>
      <Heading id={id} className="spread-title poster">
        {title}
      </Heading>
      <ScriptOverlay className="spread-script" word={script} />
    </div>
  );
}
