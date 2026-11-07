"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { contact, profile } from "@/lib/content";

export function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked; the address is still visible to copy by hand.
    }
  };

  const send = (e: FormEvent) => {
    e.preventDefault();
    const subject = `Hello from ${name.trim() || "your portfolio"}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(message)}`;
  };

  return (
    <section id="contact" className="section wrap" aria-labelledby="contact-title">
      <div className="section-head">
        <h2 id="contact-title">Contact</h2>
      </div>

      <div className="term notched">
        <div className="term-bar">contact.exe</div>
        <div className="term-body">
          <p className="term-line">
            <span className="prompt">&gt;</span> whoami
          </p>
          <p className="term-out">
            {profile.first} {profile.last}, BSIT student in {profile.location}.
          </p>

          <p className="term-line">
            <span className="prompt">&gt;</span> email
          </p>
          <p className="term-out">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>{" "}
            <button type="button" className="term-btn" onClick={copyEmail}>
              {copied ? "Copied" : "Copy"}
            </button>
          </p>

          <p className="term-line">
            <span className="prompt">&gt;</span> links
          </p>
          <ul className="term-out term-links">
            {contact.links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noreferrer">
                  {l.label}
                </a>{" "}
                {l.handle}
              </li>
            ))}
          </ul>

          <p className="term-line">
            <span className="prompt">&gt;</span> compose
          </p>
          <form className="term-form" onSubmit={send}>
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
              Send
            </button>
            <p className="term-hint">Opens your email app with the message ready to send.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
