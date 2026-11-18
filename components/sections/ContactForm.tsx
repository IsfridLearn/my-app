"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Arrow } from "@/components/ui/Sprite";

/** Opens the visitor's email app with the message filled in. */
export function ContactForm({ email }: { email: string }) {
  const [name, setName] = useState("");
  const [replyTo, setReplyTo] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = (event: FormEvent) => {
    event.preventDefault();

    const subject = encodeURIComponent(`Hello from ${name.trim() || "your portfolio"}`);
    const replyLine = replyTo.trim() ? `\n\nReply to: ${replyTo.trim()}` : "";
    const body = encodeURIComponent(message + replyLine);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <form className="contact-form" onSubmit={sendMessage}>
      <p className="file contact-form-title">Write a message</p>
      <label>
        <span className="file">Your name</span>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
        />
      </label>
      <label>
        <span className="file">Your email</span>
        <input
          type="email"
          name="email"
          value={replyTo}
          onChange={(event) => setReplyTo(event.target.value)}
          autoComplete="email"
        />
      </label>
      <label>
        <span className="file">Message</span>
        <textarea
          name="message"
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />
      </label>
      <button type="submit" className="contact-submit file">
        <span>Send message</span>
        <Arrow />
      </button>
      <p className="form-hint">Opens your email app with the message ready to send.</p>
    </form>
  );
}
