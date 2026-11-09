import Image from "next/image";
import { about, prints } from "@/lib/content";

export function About() {
  return (
    <>
      <div className="dither-edge" aria-hidden="true" />
      <section id="about" className="about grid" aria-labelledby="about-title">
        <figure className="about-fig">
          <Image
            src={prints.light.src}
            alt={prints.light.alt}
            width={prints.light.width}
            height={prints.light.height}
            sizes="(max-width: 1023px) 90vw, 42vw"
          />
        </figure>

        <div className="about-text">
          <p className="file">About</p>
          <h2 id="about-title">
            <span className="camera">{about.headline[0]}</span>{" "}
            <span className="code">{about.headline[1]}</span>
          </h2>
          <div className="about-body">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {about.interview.length > 0 && (
            <dl className="interview">
              {about.interview.map((item) => (
                <div key={item.question}>
                  <dt>{item.question}</dt>
                  <dd>{item.answer}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>
    </>
  );
}
