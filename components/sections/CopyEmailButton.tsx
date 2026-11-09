"use client";

import { useState } from "react";

const COPIED_MESSAGE_MS = 1800;

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), COPIED_MESSAGE_MS);
    } catch {
      // Clipboard can be blocked; the address is still visible to copy by hand.
    }
  };

  return (
    <button type="button" className="file print-btn" onClick={copyEmail}>
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}
