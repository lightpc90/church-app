import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { Container } from "./primitives";

/** Full-bleed photographic header used at the top of every inner page. */
export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  imagePosition = "center",
  soft = false,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  image: StaticImageData | string;
  imagePosition?: string;
  /** Soft-focus the photo (use for low-resolution images). */
  soft?: boolean;
  children?: ReactNode;
}) {
  return (
    <header className="relative isolate flex min-h-[62svh] items-end overflow-hidden bg-ink pt-32 pb-14 text-white sm:min-h-[56svh] sm:pb-20">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className={`-z-20 animate-ken-burns object-cover opacity-70 ${soft ? "blur-md" : ""}`}
        style={{ objectPosition: imagePosition }}
      />
      {/* legibility gradients */}
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/60 to-ink/20" />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-ink/70 to-transparent" />
      <Container>
        <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
          <h1 className="font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
              {description}
            </p>
          )}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </Container>
    </header>
  );
}
