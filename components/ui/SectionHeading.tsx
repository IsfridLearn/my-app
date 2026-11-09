/** The poster headline used by each section: a huge red title with white script across it. */
export function SpreadHead({
  id,
  title,
  script,
  className,
}: {
  id: string;
  title: string;
  script: string;
  className?: string;
}) {
  return (
    <div className={className ? `spread-head ${className}` : "spread-head"}>
      <h2 id={id} className="spread-title">
        {title}
      </h2>
      <p className="spread-script" aria-hidden="true">
        the
        <span>{script}</span>
      </p>
    </div>
  );
}
