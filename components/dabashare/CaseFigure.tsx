import { ContentImage } from "@/components/ui/ContentImage";
import type { CaseShot } from "@/types";

type CaseFigureProps = {
  shot: CaseShot;
  className: string;
  sizes: string;
};

/** A case-study screenshot with its caption. */
export function CaseFigure({ shot, className, sizes }: CaseFigureProps) {
  return (
    <figure className={`cs-shot ${className}`}>
      <ContentImage image={shot} sizes={sizes} />
      <figcaption className="file">{shot.caption}</figcaption>
    </figure>
  );
}
