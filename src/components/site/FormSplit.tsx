import type { ReactNode } from "react";
import { Card, Container, Section } from "./primitives";

/** Two-column layout: explanatory copy on the left, form card on the right. */
export default function FormSplit({
  intro,
  formTitle,
  formDescription,
  children,
  id,
}: {
  intro: ReactNode;
  formTitle: string;
  formDescription?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <Section id={id}>
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">{intro}</div>
        </div>
        <Card className="lg:col-span-7 lg:p-10">
          <h2 className="font-display text-3xl font-medium text-ink">{formTitle}</h2>
          {formDescription && <p className="mt-2 text-stone">{formDescription}</p>}
          <div className="mt-8">{children}</div>
        </Card>
      </Container>
    </Section>
  );
}

/** Small checklist used in form intros ("what happens next"). */
export function Assurances({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ul className="mt-10 space-y-6">
      {items.map((item, i) => (
        <li key={item.title} className="flex gap-4">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold-soft font-display text-lg text-ink">
            {i + 1}
          </span>
          <div>
            <p className="font-semibold text-ink">{item.title}</p>
            <p className="mt-1 text-stone">{item.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
