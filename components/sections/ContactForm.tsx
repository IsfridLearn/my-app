"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { Arrow } from "@/components/ui/Sprite";

type Errors = { replyTo?: string; message?: string };

const looksLikeEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

/** Opens the visitor's email app with the message filled in. Nothing is sent from the site. */
export function ContactForm({ email }: { email: string }) {
  const [name, setName] = useState("");
  const [replyTo, setReplyTo] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [opened, setOpened] = useState(false);
  const replyRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const sendMessage = (event: FormEvent) => {
    event.preventDefault();

    const next: Errors = {};
    if (replyTo.trim() && !looksLikeEmail(replyTo.trim())) {
      next.replyTo = "That email address doesn't look complete. Check it, or leave it empty.";
    }
    if (!message.trim()) next.message = "Write a message first.";
    setErrors(next);
    if (next.replyTo) return replyRef.current?.focus();
    if (next.message) return messageRef.current?.focus();

    const subject = encodeURIComponent(`Hello from ${name.trim() || "your portfolio"}`);
    const replyLine = replyTo.trim() ? `\n\nReply to: ${replyTo.trim()}` : "";
    const body = encodeURIComponent(message + replyLine);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setOpened(true);
  };

  return (
    <form className="contact-form" onSubmit={sendMessage} noValidate>
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
        <span className="file">
          Your email <span className="field-optional">(optional)</span>
        </span>
        <input
          ref={replyRef}
          type="email"
          name="email"
          value={replyTo}
          onChange={(event) => setReplyTo(event.target.value)}
          autoComplete="email"
          aria-invalid={errors.replyTo ? true : undefined}
          aria-describedby={errors.replyTo ? "contact-email-error" : undefined}
        />
        {errors.replyTo && (
          <span id="contact-email-error" className="field-error">
            {errors.replyTo}
          </span>
        )}
      </label>
      <label>
        <span className="file">Message</span>
        <textarea
          ref={messageRef}
          name="message"
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message && (
          <span id="contact-message-error" className="field-error">
            {errors.message}
          </span>
        )}
      </label>
      <button type="submit" className="contact-submit file">
        <span>Open email draft</span>
        <Arrow />
      </button>
      <p className="form-hint" aria-live="polite">
        {opened
          ? `Your email app should now show the draft, ready to send. If nothing opened, write to ${email}.`
          : "This opens your email app with the message ready to send. Nothing is sent from this site."}
      </p>
    </form>
  );
}
