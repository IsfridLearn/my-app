import { ContentImage } from "@/components/ui/ContentImage";
import { DropCap } from "@/components/ui/DropCap";
import { portraitArt, prints } from "@/data/photos";
import { about } from "@/data/profile";

export function About() {
  const [firstParagraph, ...otherParagraphs] = about.paragraphs;

  return (
    <section id="about" className="spread about grid" aria-labelledby="about-title">
      <figure className="about-fig">
        <ContentImage
          className="about-outline"
          image={portraitArt.outlineLight}
          sizes="(max-width: 1023px) 80vw, 46vw"
        />
        <ContentImage
          className="about-print"
          image={prints.light}
          sizes="(max-width: 1023px) 70vw, 40vw"
        />
      </figure>

      <div className="about-text">
        <p className="file">About</p>
        <h2 id="about-title">
          <span className="about-red poster">{about.headline[0]}</span>{" "}
          <span className="about-script">{about.headline[1]}</span>
        </h2>

        <div className="about-body">
          <p>
            <DropCap text={firstParagraph} />
          </p>
          {otherParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
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
