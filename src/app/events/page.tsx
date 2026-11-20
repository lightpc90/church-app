import PageHero from "@/components/site/PageHero";
import { Container, Section, SectionHeading } from "@/components/site/primitives";
import headerImage from "../../../public/fullChoir.jpg";
import EventLayout, { type EventView } from "@/components/UILayouts/EventLayout";
import EmptyEvent from "@/components/UILayouts/EmptyEvent";
import prisma from "@/lib/prisma";
import { parseEventDate } from "@/lib/events";

export const metadata = {
  title: "Events",
  description: "Upcoming conferences, special services and gatherings at RCCG Beautiful Gate Parish.",
};
export const dynamic = "force-dynamic";

const PAST_EVENTS_SHOWN = 10;

async function getEvents() {
  try {
    const rows = await prisma.event.findMany();
    const events: EventView[] = rows.flatMap((e) => {
      const date = parseEventDate(e.datetime);
      return date ? [{ ...e, date }] : [];
    });
    const now = Date.now();
    return {
      upcoming: events
        .filter((e) => e.date.getTime() >= now)
        .sort((a, b) => a.date.getTime() - b.date.getTime()),
      past: events
        .filter((e) => e.date.getTime() < now)
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, PAST_EVENTS_SHOWN),
    };
  } catch (e) {
    console.error("[events] failed to load events:", e);
    return null;
  }
}

function EventList({
  title,
  eyebrow,
  events,
  past,
  emptyText,
}: {
  title: string;
  eyebrow: string;
  events: EventView[];
  past?: boolean;
  emptyText: string;
}) {
  return (
    <div>
      <SectionHeading eyebrow={eyebrow} title={title} />
      <div className="mt-10 grid gap-6">
        {events.length ? (
          events.map((event) => <EventLayout key={event.id} event={event} past={past} />)
        ) : (
          <EmptyEvent text={emptyText} />
        )}
      </div>
    </div>
  );
}

export default async function Page() {
  const events = await getEvents();

  return (
    <>
      <PageHero
        image={headerImage}
        eyebrow="Events"
        title="What's happening at Beautiful Gate"
        description="Conferences, special services and gatherings for the whole church family. Come, and bring someone along."
      />
      <Section>
        <Container className="max-w-5xl space-y-24">
          {events === null ? (
            <p role="alert" className="rounded-3xl bg-red-50 p-6 text-red-900">
              We couldn&apos;t load events right now. Please try again later.
            </p>
          ) : (
            <>
              <EventList eyebrow="Coming up" title="Upcoming events" events={events.upcoming} emptyText="No upcoming events yet. Check back soon!" />
              {events.past.length > 0 && (
                <EventList eyebrow="Look back" title="Past events" events={events.past} past emptyText="No past events" />
              )}
            </>
          )}
        </Container>
      </Section>
    </>
  );
}
