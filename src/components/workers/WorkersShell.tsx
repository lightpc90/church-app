import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import churchFront from "../../../public/images/church-front.jpg";

/** Split-screen shell for the workers' portal: photo panel + content panel. */
export default function WorkersShell({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="relative isolate hidden overflow-hidden bg-ink lg:block">
        <Image src={churchFront} alt="" fill priority sizes="50vw" placeholder="blur" className="-z-10 object-cover opacity-60" />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/40 to-transparent" />
        <div className="flex h-full flex-col justify-end p-12 text-white">
          <p className="eyebrow">Workers&apos; portal</p>
          <p className="mt-4 max-w-md font-display text-4xl leading-tight">
            “Whatever you do, work heartily, as for the Lord.”
          </p>
          <p className="mt-3 text-sm font-semibold text-white/60">Colossians 3:23</p>
        </div>
      </div>
      <div className="flex flex-col px-5 pt-28 pb-12 sm:px-12">
        <Link href="/workers" className="inline-flex items-center gap-2 text-sm font-semibold text-stone hover:text-ink">
          <ArrowLeft className="size-4" aria-hidden /> Workers&apos; portal
        </Link>
        <div className="my-auto w-full max-w-md self-center py-10">{children}</div>
      </div>
    </div>
  );
}

export function ComingSoon({ title, description }: { title: string; description: string }) {
  return (
    <WorkersShell>
      <p className="eyebrow">Coming soon</p>
      <h1 className="mt-4 font-display text-4xl font-medium text-ink">{title}</h1>
      <p className="mt-4 text-lg text-stone">{description}</p>
    </WorkersShell>
  );
}
