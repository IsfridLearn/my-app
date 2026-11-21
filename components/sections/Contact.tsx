import { ContactWord } from "@/components/sections/ContactWord";
import { CopyEmailButton } from "@/components/sections/CopyEmailButton";
import { Arrow } from "@/components/ui/Sprite";
import { contact } from "@/data/contact";

/** The closing page, type only: the giant CONTACT, then every way to reach me. */
export function Contact() {
  const email = contact.email.trim();
  const links = contact.links.filter((link) => link.href.trim() !== "");

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <h2 id="contact-title" className="ct-title">
        <span className="sr-only">Contact</span>
        <ContactWord />
      </h2>

      <ul className="ct-rows">
        {email && (
          <li className="ct-row">
            <span className="file ct-label">Email</span>
            <a className="ct-value ct-email" href={`mailto:${email}`}>
              {email}
            </a>
            <CopyEmailButton email={email} />
          </li>
        )}
        {links.map((link) => (
          <li key={link.label} className="ct-row">
            <span className="file ct-label">{link.label}</span>
            <a className="ct-value" href={link.href} target="_blank" rel="noreferrer">
              {link.handle} <Arrow />
            </a>
          </li>
        ))}
      </ul>

      <p className="ct-invite">{contact.lead}</p>
    </section>
  );
}
