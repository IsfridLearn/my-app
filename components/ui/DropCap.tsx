/** Sets a paragraph's first letter large, while screen readers still read it as one word. */
export function DropCap({ text }: { text: string }) {
  const firstLetter = text.charAt(0);

  return (
    <>
      <span className="drop-cap" aria-hidden="true">
        {firstLetter}
      </span>
      <span className="sr-only">{firstLetter}</span>
      {text.slice(1)}
    </>
  );
}
