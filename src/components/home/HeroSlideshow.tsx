"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Slow cross-fading background slideshow with a gentle zoom on the active slide. */
export default function HeroSlideshow({
  slides,
  interval = 7000,
}: {
  slides: { src: StaticImageData | string; position?: string }[];
  interval?: number;
}) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || slides.length < 2) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), interval);
    return () => clearInterval(id);
  }, [reduce, slides.length, interval]);

  return (
    <div className="absolute inset-0 -z-20" aria-hidden>
      {slides.map((slide, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 transition-opacity duration-[2000ms] ease-in-out",
            i === active ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={slide.src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={cn("object-cover", i === active && !reduce && "animate-ken-burns")}
            style={{ objectPosition: slide.position ?? "center" }}
          />
        </div>
      ))}
      {/* slide indicators */}
      <div className="absolute right-5 bottom-8 z-10 hidden gap-2 sm:right-8 sm:flex">
        {slides.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1 rounded-full bg-white/40 transition-all duration-500",
              i === active ? "w-8 bg-white" : "w-3"
            )}
          />
        ))}
      </div>
    </div>
  );
}
