"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { SectionHead } from "../section-head";
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
    <section id="contact" className="section band" aria-labelledby="contact-title">
      <div className="wrap">
        <SectionHead index="05" id="contact-title" title="Contact" />

        <div className="window contact-window notched">
          <div className="window-bar">
            <span>contact</span>
          </div>

          <div className="contact-body">
            {!hasAny && (
              <p className="contact-empty">Contact details are coming soon.</p>
            )}

            {hasAny && (
              <ul className="channels">
                {email !== "" && (
                  <li className="channel">
                    <span className="channel-label">Email</span>
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
