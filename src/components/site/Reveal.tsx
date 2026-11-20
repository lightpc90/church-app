import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Fades content up as it scrolls into view.
 * Pure CSS (scroll-driven animation, see `.reveal` in globals.css): content is visible by default
 * and only animates in browsers that support `animation-timeline: view()`, so it can never get
 * stuck hidden if JavaScript is slow or a scroll observer misses.
 */
export default function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  /** kept for call-site compatibility; staggering isn't possible with scroll timelines */
  delay?: number;
  className?: string;
}) {
  return <div className={cn("reveal", className)}>{children}</div>;
}
