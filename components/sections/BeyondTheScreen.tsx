import { PhotoLightbox } from "@/components/sections/PhotoLightbox";
import { ContentImage } from "@/components/ui/ContentImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brands, titles } from "@/data/beyond";
import { sectionHeadings } from "@/data/navigation";
import { contactSheetFrames, photos } from "@/data/photos";
import type { Photo } from "@/types";

type GalleryPhoto = Photo & { lang?: string };

/** Beyond the Screen: the photographs in one even grid, then the titles and the brands. */
export function BeyondTheScreen() {
  // In the order they appear on the page.
  const gallery: GalleryPhoto[] = [
    photos.profile,
    photos.set,
    photos.gold,
    { ...photos.ginoo, lang: "fil" },
    { ...photos.patnubay, lang: "fil" },
    photos.stage,
  ];

  return (
    <section id="beyond" className="spread beyond" aria-labelledby="beyond-title">
      <SectionHeading id="beyond-title" {...sectionHeadings.beyond} />

      <ul className="bx-grid">
        {gallery.map((photo) => (
          <li key={photo.id}>
            <figure id={photo.id} className="plate">
              <button type="button" className="plate-open" data-lightbox={photo.id} aria-label={`View larger: ${photo.label}`}>
                <span className="plate-tag file">{photo.file}</span>
                <span className="plate-img">
                  <ContentImage image={photo} sizes="(max-width: 599px) 92vw, (max-width: 899px) 46vw, 31vw" />
                </span>
                <span className="plate-view file" aria-hidden="true">
                  View
                </span>
              </button>
              <figcaption className="file" lang={photo.lang}>
                {photo.label}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="sheet" role="img" aria-label="Eight close-ups from shoots and pageants">
        {contactSheetFrames.map(({ frame, dither, photo }) => (
          <span key={frame} className="frame">
            <ContentImage className="frame-dither" image={dither} unoptimized />
            <ContentImage className="frame-photo" image={photo} unoptimized />
          </span>
        ))}
      </div>

      <div className="bx-lists">
        <div className="bx-list">
          <h3 className="tape">
            <span className="tape-num">A</span> Pageant titles
          </h3>
          <ul>
            {titles.map((title) => (
              <li key={title.name}>
                <span className="poster" lang={title.lang}>
                  {title.name}
                </span>
                <span className="file">{title.year}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bx-list">
          <h3 className="tape tape-flip">
            <span className="tape-num">B</span> Ambassador and campaigns
          </h3>
          <ul>
            {brands.map((brand) => (
              <li key={brand.name}>
                <span className="poster">{brand.name}</span>
                {brand.note && <span className="file">{brand.note}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <PhotoLightbox photos={gallery} />
    </section>
  );
}
