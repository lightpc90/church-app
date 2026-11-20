"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          /* clipboard unavailable (e.g. insecure context) — number is still selectable */
        }
      }}
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-white px-3 text-sm font-semibold text-ink transition hover:border-ink/30"
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
    >
      {copied ? <Check className="size-4 text-emerald-600" aria-hidden /> : <Copy className="size-4" aria-hidden />}
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
