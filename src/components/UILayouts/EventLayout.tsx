import Image from "next/image";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { formatEventParts } from "@/lib/events";
import { cn } from "@/lib/utils";

export type EventView = {
  id: string;
  name: string;
  desc: string;
  venue: string;
  date: Date;
  reglink?: string | null;
  image?: string | null;
};

const EventLayout = ({ event, past = false }: { event: EventView; past?: boolean }) => {
  const { weekday, day, month, year, time } = formatEventParts(event.date);

  return (
    <article
      className={cn(
        "group grid overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-shadow hover:shadow-lift sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]",
        past && "opacity-80"
      )}
    >
      <div className="relative min-h-48 bg-linear-to-br from-ink to-royal">
        {event.image && (
          <Image
            src={event.image}
            alt=""
            fill
            sizes="(min-width: 640px) 40vw, 100vw"
            // Admin-provided URLs can point at any host, so skip the optimizer allowlist.
            unoptimized
            className={cn("object-cover transition-transform duration-700 group-hover:scale-105", past && "grayscale")}
          />
        )}
        <time
          dateTime={event.date.toISOString()}
          className="absolute top-4 left-4 flex flex-col items-center rounded-2xl bg-white px-4 py-2 text-center shadow-soft"
        >
          <span className="text-xs font-semibold tracking-wider text-ember uppercase">{month}</span>
          <span className="font-display text-3xl leading-none text-ink">{day}</span>
          <span className="text-xs text-stone">{year}</span>
        </time>
      </div>
      <div className="flex flex-col p-6 sm:p-8">
        <h3 className="font-display text-2xl font-medium text-ink">{event.name}</h3>
        <ul className="mt-3 space-y-1.5 text-sm text-stone">
          <li className="flex items-center gap-2">
            <Clock className="size-4 text-royal" aria-hidden /> {weekday}, {time}
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="size-4 text-royal" aria-hidden /> {event.venue}
          </li>
        </ul>
        {event.desc && <p className="mt-4 line-clamp-4 leading-relaxed whitespace-pre-line text-stone">{event.desc}</p>}
        {!past && event.reglink && (
          <a
            href={event.reglink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-1.5 pt-6 font-semibold text-royal hover:underline"
          >
            Register <ArrowUpRight className="size-4" aria-hidden />
          </a>
        )}
      </div>
    </article>
  );
};

export default EventLayout;
