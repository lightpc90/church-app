import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Logo = ({ invert = false, className }: { invert?: boolean; className?: string }) => (
  <Link href="/" className={cn("group flex items-center gap-3", className)} aria-label="RCCG Beautiful Gate, home">
    <span className="relative size-11 shrink-0 overflow-hidden rounded-full bg-white shadow-soft ring-1 ring-black/5">
      <Image src="/images/logo-512.png" alt="" fill sizes="44px" className="scale-[1.35] object-contain" priority />
    </span>
    <span className="leading-tight">
      <span className={cn("block font-display text-lg font-medium tracking-tight transition-colors", invert ? "text-white" : "text-ink")}>
        Beautiful Gate
      </span>
      <span className={cn("block text-[0.68rem] font-semibold uppercase tracking-[0.2em] transition-colors", invert ? "text-white/60" : "text-stone")}>
        RCCG · Lakowe
      </span>
    </span>
  </Link>
);

export default Logo;
