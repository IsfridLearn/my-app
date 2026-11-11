import { CaseFigure } from "@/components/dabashare/CaseFigure";
import type { CaseShotSlot } from "@/types";

/** A visible gap in a case study, for something only Andrei can write. */
export function Todo({ children }: { children: string }) {
  return (
    <p className="cs-todo">
      <span className="file">To write</span> {children}
    </p>
  );
}

type CaseSlotProps = {
  slot: CaseShotSlot;
  className: string;
  sizes: string;
};

/** A screenshot, or a marked frame where one still needs to be added. */
export function CaseSlot({ slot, className, sizes }: CaseSlotProps) {
  if ("todo" in slot) {
    return (
      <figure className={`cs-shot ${className}`}>
        <div className="cs-todo-frame file">Screenshot to add</div>
        <figcaption className="file">{slot.todo}</figcaption>
      </figure>
    );
  }

  return <CaseFigure shot={slot} className={className} sizes={sizes} />;
}
