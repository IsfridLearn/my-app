"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Arrow } from "@/components/ui/Sprite";

/** Opens the visitor's email app with the message filled in. */
export function ContactForm({ email }: { email: string }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = (event: FormEvent) => {
    event.preventDefault();

    const subject = encodeURIComponent(`Hello from ${name.trim() || "your portfolio"}`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <form className="contact-form" onSubmit={sendMessage}>
      <label>
        <span className="file">Your name</span>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
        />
      </label>
      <label>
        <span className="file">Message</span>
        <textarea
          rows={3}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />
      </label>
      <button type="submit" className="file go">
        Send message <Arrow />
      </button>
      <p className="form-hint">Opens your email app with the message ready to send.</p>
    </form>
  );
}
