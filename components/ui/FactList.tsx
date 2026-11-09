type FactListProps = {
  facts: Array<{ label: string; text: string }>;
  className?: string;
};

/** Label and text pairs numbered [1], [2], and so on. */
export function FactList({ facts, className }: FactListProps) {
  return (
    <dl className={className ? `facts ${className}` : "facts"}>
      {facts.map((fact, index) => (
        <div key={fact.label}>
          <dt>
            <span>[{index + 1}]</span> {fact.label}
          </dt>
          <dd>{fact.text}</dd>
        </div>
      ))}
    </dl>
  );
}
