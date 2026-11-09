"use client";

import { useState } from "react";
import Image from "next/image";
import type { FormEvent } from "react";
import { Sprite } from "../pixel";
import { ARROW } from "../sprites";
import { contact, photos } from "@/lib/content";

export function Contact() {
  const email = contact.email.trim();
  const links = contact.links.filter((l) => l.href.trim() !== "");

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  // Nothing to show until real details are added in lib/content.ts.
  if (email === "" && links.length === 0) return null;

  const at = email.indexOf("@");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked; the address is still visible to copy by hand.
    }
  };

  const send = (e: FormEvent) => {
    e.preventDefault();
    const subject = `Hello from ${name.trim() || "your portfolio"}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(message)}`;
  };

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div id={photos.eyes.id} className="eyes-band">
        <Image
          src={photos.eyes.src}
          alt={photos.eyes.alt}
          width={photos.eyes.width}
          height={photos.eyes.height}
          sizes="100vw"
        />
      </div>

      <h2 id="contact-title" className="file">
        Contact
      </h2>

      {email !== "" && (
        <a className="mail" href={`mailto:${email}`}>
          <span>{email.slice(0, at)}</span>
          <span>{email.slice(at)}</span>
        </a>
      )}

      <div className="grid contact-low">
        <div className="contact-lead">
          <p>A brand collaboration, a modeling inquiry or a web project: write to me.</p>
          {email !== "" && (
            <button type="button" className="file print-btn" onClick={copyEmail}>
              {copied ? "Copied" : "Copy email"}
            </button>
          )}
        </div>

        <ul className="channels file">
          {links.map((l) => (
            <li key={l.label}>
              <a className="go" href={l.href} target="_blank" rel="noreferrer">
                {l.label} <Sprite rows={ARROW} unit="2px" />
              </a>
            </li>
          ))}
        </ul>

        {email !== "" && (
          <form className="contact-form" onSubmit={send}>
            <label>
              <span className="file">Your name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </label>
            <label>
              <span className="file">Message</span>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </label>
            <button type="submit" className="file go">
              Send message <Sprite rows={ARROW} unit="2px" />
            </button>
            <p className="form-hint">Opens your email app with the message ready to send.</p>
          </form>
        )}
      </div>
    </section>
  );
}
