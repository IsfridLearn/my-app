import Image from "next/image";
import { brands, photos, titles } from "@/lib/content";
import type { Photo } from "@/lib/content";

const FRAMES = [1, 2, 3, 4, 5, 6, 7, 8];

function Plate({
  photo,
  className,
  sizes,
  lang,
}: {
  photo: Photo;
  className: string;
  sizes: string;
  lang?: string;
}) {
  return (
    <figure id={photo.id} className={`plate ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
      />
      <figcaption className="file">
        {photo.file} <span lang={lang}>{photo.label}</span>
      </figcaption>
    </figure>
  );
}

export function Beyond() {
  return (
    <section id="beyond" className="beyond" aria-labelledby="beyond-title">
      <div id={photos.profile.id} className="opener">
        <Image
          src={photos.profile.src}
          alt={photos.profile.alt}
          width={photos.profile.width}
          height={photos.profile.height}
          sizes="100vw"
        />
        <h2 id="beyond-title" className="beyond-title">
          Beyond
          <br />
          <i>the</i>
          <br />
          <i>Screen</i>
        </h2>
      </div>

      <div className="grid beyond-top">
        <div className="sheet" role="img" aria-label="Eight close-ups from shoots and pageants">
          {FRAMES.map((n) => (
            <span key={n} className="frame">
              <Image
                className="frame-dither"
                src={`/photos/frame-${n}-dither.png`}
                alt=""
                width={240}
                height={180}
                unoptimized
              />
              <Image
                className="frame-photo"
                src={`/photos/frame-${n}.webp`}
                alt=""
                width={640}
                height={480}
                unoptimized
              />
            </span>
          ))}
        </div>
        <Plate
          photo={photos.set}
          className="plate-set"
          sizes="(max-width: 1023px) 60vw, 24vw"
        />
      </div>

      <div className="grid gold">
        <Plate photo={photos.gold} className="plate-gold" sizes="(max-width: 1023px) 100vw, 68vw" />
      </div>

      <div className="grid title-plates">
        <Plate
          photo={photos.ginoo}
          className="plate-ginoo"
          sizes="(max-width: 1023px) 100vw, 60vw"
          lang="fil"
        />
        <Plate
          photo={photos.patnubay}
          className="plate-patnubay"
          sizes="(max-width: 1023px) 75vw, 32vw"
          lang="fil"
        />
      </div>

      <div className="ledger">
        <p className="file">Titles</p>
        <ul className="titles">
          {titles.map((t) => (
            <li key={t.name}>
              <span lang={t.lang}>{t.name}</span>
              <span className="file">{t.year}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid brands-row">
        <Plate
          photo={photos.stage}
          className="plate-stage"
          sizes="(max-width: 1023px) 75vw, 34vw"
        />
        <div className="ledger brands">
          <p className="file">Brands</p>
          <ul>
            {brands.map((b) => (
              <li key={b.name}>
                <span>{b.name}</span>
                {b.note && <span className="file">{b.note}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
