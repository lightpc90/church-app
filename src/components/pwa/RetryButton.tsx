"use client";

import { RotateCw } from "lucide-react";

/** Goes back to the page the visitor wanted (?from=/some/page), or reloads. Same-site paths only. */
export default function RetryButton() {
  return (
    <button
      type="button"
      onClick={() => {
        const from = new URLSearchParams(window.location.search).get("from");
        if (from && from.startsWith("/") && !from.startsWith("//")) window.location.href = from;
        else window.location.reload();
      }}
      className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-white hover:bg-ink-soft"
    >
      <RotateCw className="size-4" aria-hidden /> Try again
    </button>
  );
}
