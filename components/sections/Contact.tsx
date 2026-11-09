import { ContactForm } from "@/components/sections/ContactForm";
import { CopyEmailButton } from "@/components/sections/CopyEmailButton";
import { ContentImage } from "@/components/ui/ContentImage";
import { ScriptOverlay } from "@/components/ui/SectionHeading";
import { Arrow } from "@/components/ui/Sprite";
import { contact } from "@/data/contact";
import { sectionHeadings } from "@/data/navigation";
import { photos } from "@/data/photos";

export function Contact() {
  const email = contact.email.trim();
  const hasEmail = email !== "";
  const links = contact.links.filter((link) => link.href.trim() !== "");
  const heading = sectionHeadings.contact;

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div id={photos.eyes.id} className="eyes-band">
        <ContentImage image={photos.eyes} sizes="100vw" />
        <ScriptOverlay className="spread-script contact-script" word={heading.script} />
      </div>

      <h2 id="contact-title" className="file">
        {heading.title}
      </h2>

      {hasEmail && (
        <a className="mail poster" href={`mailto:${email}`}>
          {email}
        </a>
      )}

      <div className="grid contact-low">
        <div className="contact-lead">
          <p>{contact.lead}</p>
          {hasEmail && <CopyEmailButton email={email} />}
        </div>

        <ul className="channels file">
          {links.map((link) => (
            <li key={link.label}>
              <a className="go" href={link.href} target="_blank" rel="noreferrer">
                {link.label} <Arrow />
              </a>
            </li>
          ))}
        </ul>

        {hasEmail && <ContactForm email={email} />}
      </div>
    </section>
  );
}
