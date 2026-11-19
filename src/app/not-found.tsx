import { ArrowRight } from "lucide-react";
import { ButtonLink, Container } from "@/components/site/primitives";
import { connectNav } from "@/lib/site";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink pt-28 pb-20 text-white">
      <div aria-hidden className="absolute -top-40 -right-40 -z-10 size-[40rem] rounded-full bg-royal/40 blur-3xl" />
      <Container>
        <p className="eyebrow">404 · Page not found</p>
        <h1 className="mt-6 max-w-3xl font-display text-5xl leading-tight font-medium sm:text-7xl">
          This door isn&apos;t open, but the Beautiful Gate is.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/70">
          The page you&apos;re looking for may have moved. Here are some places to go instead.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/" variant="gold" size="lg">
            Back to home <ArrowRight />
          </ButtonLink>
          {connectNav.slice(0, 3).map((l) => (
            <ButtonLink key={l.href} href={l.href} variant="light" size="lg">
              {l.label}
            </ButtonLink>
          ))}
        </div>
      </Container>
    </section>
  );
}
