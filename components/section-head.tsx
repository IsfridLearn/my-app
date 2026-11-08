type SectionHeadProps = {
  /** Two-digit section number, e.g. "01". */
  index: string;
  /** Id for aria-labelledby on the section. */
  id: string;
  title: string;
};

export function SectionHead({ index, id, title }: SectionHeadProps) {
  return (
    <div className="section-head">
      <span className="section-index" aria-hidden="true">
        {index}
      </span>
      <h2 id={id}>{title}</h2>
    </div>
  );
}
