import type { ReactNode } from "react";
import { Container } from "./primitives";

/** Plain, readable layout for policy pages, with a contents list. */
export default function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  contents,
  children,
}: {
  eyebrow: string;
  title: string;
  /** e.g. "25 November 2026" */
  updated: string;
  intro: ReactNode;
  contents: { id: string; label: string }[];
  children: ReactNode;
}) {
  return (
    <div className="bg-ivory pt-32 pb-24 sm:pt-40">
      <Container className="max-w-3xl">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 font-display text-4xl font-medium text-ink sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-stone">Last updated {updated}</p>
        <div className="mt-8 text-lg leading-relaxed text-stone">{intro}</div>

        <nav aria-label="On this page" className="mt-10 rounded-3xl border border-line bg-white p-6">
          <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">On this page</p>
          <ol className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            {contents.map((c, i) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className="text-ink hover:text-royal">
                  <span className="mr-2 text-stone tabular-nums">{i + 1}.</span>
                  {c.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="prose-legal">{children}</div>
      </Container>
    </div>
  );
}
