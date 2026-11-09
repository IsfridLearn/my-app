import { ContentImage } from "@/components/ui/ContentImage";
import { ScriptOverlay } from "@/components/ui/SectionHeading";
import { brands, titles } from "@/data/beyond";
import { sectionHeadings } from "@/data/navigation";
import { contactSheetFrames, photos } from "@/data/photos";
import type { Photo } from "@/types";

type PlateProps = {
  photo: Photo;
  className: string;
  sizes: string;
  lang?: string;
};

function Plate({ photo, className, sizes, lang }: PlateProps) {
  return (
    <figure id={photo.id} className={`plate ${className}`}>
      <ContentImage image={photo} sizes={sizes} />
      <figcaption className="file">
        {photo.file} <span lang={lang}>{photo.label}</span>
      </figcaption>
    </figure>
  );
}

export function BeyondTheScreen() {
  const heading = sectionHeadings.beyond;

  return (
    <section id="beyond" className="spread beyond" aria-labelledby="beyond-title">
      <div id={photos.profile.id} className="opener">
        <ContentImage image={photos.profile} sizes="100vw" />
        <h2 id="beyond-title" className="beyond-title poster">
          {heading.title}
        </h2>
        <ScriptOverlay className="spread-script beyond-script" word={heading.script} />
      </div>

      <div className="grid beyond-top">
        <div className="sheet" role="img" aria-label="Eight close-ups from shoots and pageants">
          {contactSheetFrames.map(({ frame, dither, photo }) => (
            <span key={frame} className="frame">
              <ContentImage className="frame-dither" image={dither} unoptimized />
              <ContentImage className="frame-photo" image={photo} unoptimized />
            </span>
          ))}
        </div>
        <Plate photo={photos.set} className="plate-set" sizes="(max-width: 1023px) 60vw, 24vw" />
      </div>

      <div className="grid title-plates">
        <Plate
          photo={photos.ginoo}
          className="plate-ginoo"
          sizes="(max-width: 1023px) 100vw, 44vw"
          lang="fil"
        />
        <Plate
          photo={photos.patnubay}
          className="plate-patnubay"
          sizes="(max-width: 1023px) 75vw, 24vw"
          lang="fil"
        />
        <Plate photo={photos.gold} className="plate-gold" sizes="(max-width: 1023px) 100vw, 36vw" />
      </div>

      <div className="ledger">
        <p className="index-num ledger-head">[1] Titles</p>
        <ul className="titles">
          {titles.map((title) => (
            <li key={title.name} className="poster">
              <span lang={title.lang}>{title.name}</span>
              <span className="ledger-year">{title.year}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid brands-row">
        <Plate photo={photos.stage} className="plate-stage" sizes="(max-width: 1023px) 75vw, 34vw" />
        <div className="ledger brands">
          <p className="index-num">[2] Brands</p>
          <ul>
            {brands.map((brand) => (
              <li key={brand.name} className="poster">
                <span>{brand.name}</span>
                {brand.note && <span className="file">{brand.note}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
