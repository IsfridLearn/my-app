import { ContentImage } from "@/components/ui/ContentImage";
import type { CaseShot } from "@/types";

type CaseFigureProps = {
  shot: CaseShot;
  className: string;
  sizes: string;
  /** Load first, for the image at the top of a page. */
  preload?: boolean;
};

/** A case-study screenshot with its caption. */
export function CaseFigure({ shot, className, sizes, preload }: CaseFigureProps) {
  return (
    <figure className={`cs-shot ${className}`}>
      <ContentImage image={shot} sizes={sizes} preload={preload} />
      <figcaption className="file">{shot.caption}</figcaption>
    </figure>
  );
}
