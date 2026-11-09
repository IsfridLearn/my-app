"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Sprite } from "../pixel";
import { SectionHead } from "../section-head";
import { ICON } from "../sprites";
import { contact } from "@/lib/content";

export function Contact() {
  const email = contact.email.trim();
  const links = contact.links.filter((l) => l.href.trim() !== "");
  const hasAny = email !== "" || links.length > 0;

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

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
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="wrap">
        <SectionHead index="05" id="contact-title" title="Contact" />

        <div className="contact-grid">
          <p className="contact-statement">
            Let&rsquo;s build something <em>together.</em>
          </p>

          <div className="contact-panel">
            <p className="contact-lead">
              A web project, a brand collaboration or a modeling inquiry: say hello.
            </p>

            {!hasAny && (
              <p className="contact-empty">Contact details are coming soon.</p>
            )}

            {hasAny && (
              <ul className="channels">
                {email !== "" && (
                  <li className="channel">
                    <span className="channel-label">
                      <Sprite rows={[...ICON.mail]} unit="2px" /> Email
                    </span>
                    <span className="channel-value">
                      <a href={`mailto:${email}`}>{email}</a>
                      <button type="button" className="copy-btn" onClick={copyEmail}>
                        {copied ? "Copied" : "Copy"}
                      </button>
                    </span>
                  </li>
                )}
                {links.map((l) => (
                  <li key={l.label} className="channel">
                    <span className="channel-label">{l.label}</span>
                    <span className="channel-value">
                      <a href={l.href} target="_blank" rel="noreferrer">
                        {l.handle}
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {email !== "" && (
              <form className="contact-form" onSubmit={send}>
                <label>
                  <span>Your name</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                  />
                </label>
                <label>
                  <span>Message</span>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </label>
                <button type="submit" className="btn">
                  Send message
                </button>
                <p className="form-hint">
                  Opens your email app with the message ready to send.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
