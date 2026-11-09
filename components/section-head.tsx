type SectionHeadProps = {
  /** Id for aria-labelledby on the section. */
  id: string;
  title: string;
};

export function SectionHead({ id, title }: SectionHeadProps) {
  return (
    <div className="section-head">
      <h2 id={id}>{title}</h2>
    </div>
  );
}
