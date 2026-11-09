import Image from "next/image";
import { about, prints } from "@/lib/content";

export function About() {
  const [first, ...rest] = about.paragraphs;

  return (
    <section id="about" className="spread about grid" aria-labelledby="about-title">
      <figure className="about-fig">
        <Image className="about-outline" src="/photos/hero-outline-light.webp" alt="" width={913} height={1164} sizes="(max-width: 1023px) 80vw, 46vw" />
        <Image
          className="about-print"
          src={prints.light.src}
          alt={prints.light.alt}
          width={prints.light.width}
          height={prints.light.height}
          sizes="(max-width: 1023px) 70vw, 40vw"
        />
      </figure>

      <div className="about-text">
        <p className="file">About</p>
        <h2 id="about-title">
          <span className="about-red">{about.headline[0]}</span>{" "}
          <span className="about-script">{about.headline[1]}</span>
        </h2>
        <div className="about-body">
          <p>
            <span className="fp-cap" aria-hidden="true">
              {first.charAt(0)}
            </span>
            <span className="sr-only">{first.charAt(0)}</span>
            {first.slice(1)}
          </p>
          {rest.map((p) => (
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
  );
}
