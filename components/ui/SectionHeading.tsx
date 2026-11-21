type ScriptOverlayProps = {
  word: string;
  className: string;
  lead?: string;
};

/** The red tag laid across a headline, such as "The projects". */
export function ScriptOverlay({ word, className, lead = "the" }: ScriptOverlayProps) {
  return (
    <p className={className} aria-hidden="true">
      {lead} {word}
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

/** The poster headline used by each section: a huge red title with a red tag across it. */
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
