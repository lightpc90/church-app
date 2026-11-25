"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { useConsent } from "./ConsentProvider";

/**
 * Renders a third-party embed (YouTube) only once the visitor has allowed "videos and maps",
 * or chosen to load this one item. Until then, a placeholder explains why.
 */
export default function ConsentGate({
  children,
  title,
  className,
}: {
  /** The embed. As a function it's told whether to autoplay (the visitor just clicked play). */
  children: ReactNode | ((opts: { autoplay: boolean }) => ReactNode);
  /** e.g. the video title, shown on the placeholder */
  title?: string;
  className?: string;
}) {
  const { ready, choices, save } = useConsent();
  const [once, setOnce] = useState(false);

  if (ready && (choices.media || once)) {
    return <>{typeof children === "function" ? children({ autoplay: once && !choices.media }) : children}</>;
  }

  return (
    <div
      className={cn(
        "relative flex aspect-video w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-[1.5rem] bg-ink-soft p-6 text-center text-white",
        className
      )}
    >
      {ready && (
        <>
          <button
            type="button"
            onClick={() => setOnce(true)}
            aria-label={title ? `Play “${title}”` : "Play video"}
            className="inline-flex size-16 items-center justify-center rounded-full bg-white/15 text-white transition hover:scale-105 hover:bg-white/25"
          >
            <Play className="ml-1 size-7 fill-white" aria-hidden />
          </button>
          {title && <p className="line-clamp-2 max-w-md font-display text-lg sm:text-xl">{title}</p>}
          <p className="max-w-md text-xs leading-relaxed text-white/65 sm:text-sm">
            This video is hosted on YouTube. Playing it lets YouTube (Google) store data on your device.{" "}
            <Link href="/cookies" className="font-semibold text-gold underline-offset-2 hover:underline">
              Learn more
            </Link>
          </p>
          <button
            type="button"
            onClick={() => save({ media: true })}
            className="text-xs font-semibold text-white/80 underline underline-offset-2 hover:text-white"
          >
            Always allow videos and maps
          </button>
        </>
      )}
    </div>
  );
}
