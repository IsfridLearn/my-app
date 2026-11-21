import { ContactForm } from "@/components/sections/ContactForm";
import { CopyEmailButton } from "@/components/sections/CopyEmailButton";
import { ContentImage } from "@/components/ui/ContentImage";
import { Arrow } from "@/components/ui/Sprite";
import { contact } from "@/data/contact";
import { photos } from "@/data/photos";

/** The closing page: a strip of the eyes photograph, one giant word, then every way to reach me. */
export function Contact() {
  const email = contact.email.trim();
  const hasEmail = email !== "";
  const links = contact.links.filter((link) => link.href.trim() !== "");

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <figure id={photos.eyes.id} className="eyes-band">
        <ContentImage image={photos.eyes} sizes="100vw" />
        <figcaption className="file">
          <b>{photos.eyes.file}</b> {photos.eyes.label}
        </figcaption>
      </figure>

      {/* The A is swapped for a red cut-paper cross. */}
      <h2 id="contact-title" className="ct-title">
        <span className="sr-only">Contact</span>
        <span className="ct-word poster" aria-hidden="true">
          CONT<span className="ct-x">✕</span>CT
        </span>
      </h2>

      <div className="ct-body">
        <div className="ct-reach">
          <p className="ct-invite">{contact.lead}</p>

          {hasEmail && (
            <div className="ct-email">
              <p className="file ct-label">Email</p>
              <a className="ct-mail" href={`mailto:${email}`}>
                {email}
              </a>
              <CopyEmailButton email={email} />
            </div>
          )}

          {links.length > 0 && (
            <ul className="ct-links">
              {links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noreferrer">
                    <span className="file ct-label">{link.label}</span>
                    <span className="ct-handle poster">
                      {link.handle} <Arrow />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {hasEmail && <ContactForm email={email} />}
      </div>
    </section>
  );
}
