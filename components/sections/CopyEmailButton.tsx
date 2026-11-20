"use client";

import { useState } from "react";

const FEEDBACK_MS = 2200;

export function CopyEmailButton({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      // Some browsers block the clipboard; the address stays visible to copy by hand.
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), FEEDBACK_MS);
  };

  const label = state === "copied" ? "Copied ✓" : state === "failed" ? "Couldn't copy, select it instead" : "Copy email";

  return (
    <button type="button" className="file print-btn copy-email" data-state={state} onClick={copyEmail}>
      <span aria-live="polite">{label}</span>
    </button>
  );
}
