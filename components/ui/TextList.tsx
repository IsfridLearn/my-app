type TextListProps = {
  items: string[];
  className?: string;
  ordered?: boolean;
  label?: string;
};

export function TextList({ items, className, ordered = false, label }: TextListProps) {
  const List = ordered ? "ol" : "ul";

  return (
    <List className={className} aria-label={label}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </List>
  );
}
