"use client";

import { useMemo, useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Event } from "@prisma/client";
import { CalendarPlus, ExternalLink, Loader2, MapPin, Pencil, Trash2 } from "lucide-react";
import { Dialog } from "../table/cells";
import { AdminPanel } from "../AdminCard";
import { fieldClass, labelClass } from "../../forms/fields";
import { FieldError } from "../../forms/FormBits";
import { buttonVariants } from "../../site/primitives";
import { formatEventParts, parseEventDate } from "@/lib/events";
import { cn } from "@/lib/utils";

type Values = { name: string; desc: string; venue: string; datetime: string; reglink: string; image: string };
const blank: Values = { name: "", desc: "", venue: "", datetime: "", reglink: "", image: "" };

async function call(url: string, method: string, body?: unknown) {
  const res = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success) {
    const err = new Error(json?.error === "Validation failed" ? "Please check the highlighted fields." : (json?.error ?? "Something went wrong"));
    (err as Error & { details?: Record<string, string[]> }).details = json?.details;
    throw err;
  }
  return json;
}

/** `now` comes from the server, so rendering stays pure. */
export default function EventsManager({ events, now }: { events: Event[]; now: number }) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [editing, setEditing] = useState<Event | "new" | null>(null);
  const [deleting, setDeleting] = useState<Event | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { upcoming, past } = useMemo(() => {
    const withDate = events.map((e) => ({ e, d: parseEventDate(e.datetime) }));
    return {
      upcoming: withDate.filter((x) => !x.d || x.d.getTime() >= now).sort((a, b) => (a.d?.getTime() ?? 0) - (b.d?.getTime() ?? 0)),
      past: withDate.filter((x) => x.d && x.d.getTime() < now).sort((a, b) => (b.d?.getTime() ?? 0) - (a.d?.getTime() ?? 0)),
    };
  }, [events, now]);

  const refresh = () => startTransition(() => router.refresh());

  async function remove() {
    if (!deleting) return;
    setBusy(true);
    setError(null);
    try {
      await call(`/api/events/${deleting.id}`, "DELETE");
      setDeleting(null);
      refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't delete");
    } finally {
      setBusy(false);
    }
  }

  const row = ({ e, d }: { e: Event; d: Date | null }, isPast = false) => {
    const p = d ? formatEventParts(d) : null;
    return (
      <li key={e.id} className={cn("flex flex-wrap items-center gap-4 px-4 py-4 sm:px-5", isPast && "opacity-70")}>
        <div className="flex w-16 shrink-0 flex-col items-center rounded-2xl bg-sand px-2 py-2 text-center">
          <span className="text-xs font-semibold text-stone uppercase">{p?.month ?? "?"}</span>
          <span className="font-display text-2xl text-ink">{p?.day ?? "--"}</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-ink">{e.name}</p>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-3 text-sm text-stone">
            {p && <span>{p.weekday}, {p.time}</span>}
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" aria-hidden /> {e.venue}
            </span>
            {e.reglink && (
              <a href={e.reglink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-royal hover:underline">
                Registration <ExternalLink className="size-3" aria-hidden />
              </a>
            )}
          </p>
        </div>
        <div className="flex gap-1">
          <button type="button" onClick={() => setEditing(e)} aria-label={`Edit ${e.name}`} className="inline-flex size-10 items-center justify-center rounded-full text-stone hover:bg-sand hover:text-ink">
            <Pencil className="size-4" aria-hidden />
          </button>
          <button type="button" onClick={() => setDeleting(e)} aria-label={`Delete ${e.name}`} className="inline-flex size-10 items-center justify-center rounded-full text-stone hover:bg-red-50 hover:text-ember">
            <Trash2 className="size-4" aria-hidden />
          </button>
        </div>
      </li>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button type="button" onClick={() => setEditing("new")} className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white hover:bg-ink-soft">
          <CalendarPlus className="size-4" aria-hidden /> New event
        </button>
      </div>

      <AdminPanel className="p-0 sm:p-0">
        <h2 className="px-5 pt-5 font-display text-xl font-medium text-ink">Upcoming</h2>
        <ul className="mt-3 divide-y divide-line border-t border-line">
          {upcoming.length ? upcoming.map((x) => row(x)) : <li className="px-5 py-10 text-center text-stone">No upcoming events. Create one to show it on the Events page.</li>}
        </ul>
      </AdminPanel>

      {past.length > 0 && (
        <AdminPanel className="p-0 sm:p-0">
          <h2 className="px-5 pt-5 font-display text-xl font-medium text-ink">Past</h2>
          <ul className="mt-3 divide-y divide-line border-t border-line">{past.map((x) => row(x, true))}</ul>
        </AdminPanel>
      )}

      <Dialog open={editing !== null} onClose={() => setEditing(null)} title={editing === "new" ? "New event" : "Edit event"}>
        {editing !== null && (
          <EventForm
            key={editing === "new" ? "new" : editing.id}
            event={editing === "new" ? null : editing}
            onSaved={() => {
              setEditing(null);
              refresh();
            }}
          />
        )}
      </Dialog>

      <Dialog
        open={!!deleting}
        onClose={() => !busy && setDeleting(null)}
        title="Delete this event?"
        footer={
          <>
            <button type="button" onClick={() => setDeleting(null)} disabled={busy} className="h-10 rounded-full px-5 text-sm font-semibold text-ink hover:bg-ink/5">
              Cancel
            </button>
            <button type="button" onClick={() => void remove()} disabled={busy} className="inline-flex h-10 items-center gap-2 rounded-full bg-ember px-5 text-sm font-semibold text-white disabled:opacity-60">
              {busy && <Loader2 className="size-4 animate-spin" aria-hidden />} Delete
            </button>
          </>
        }
      >
        <p className="text-stone">
          <span className="font-semibold text-ink">{deleting?.name}</span> will be removed from the Events page. This can&apos;t be undone.
        </p>
        {error && <p role="alert" className="mt-3 rounded-2xl bg-red-50 p-3 text-sm text-red-900">{error}</p>}
      </Dialog>
    </div>
  );
}

function EventForm({ event, onSaved }: { event: Event | null; onSaved: () => void }) {
  const [v, setV] = useState<Values>(
    event
      ? { name: event.name, desc: event.desc, venue: event.venue, datetime: event.datetime.slice(0, 16), reglink: event.reglink ?? "", image: event.image ?? "" }
      : blank
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const set = (k: keyof Values, value: string) => setV((s) => ({ ...s, [k]: value }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setErrors({});
    try {
      await call(event ? `/api/events/${event.id}` : "/api/events", event ? "PUT" : "POST", v);
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't save");
      setErrors((err as Error & { details?: Record<string, string[]> }).details ?? {});
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label htmlFor="ev-name" className={labelClass}>Event name</label>
        <input id="ev-name" value={v.name} onChange={(e) => set("name", e.target.value)} required className={fieldClass} />
        <FieldError messages={errors.name} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ev-when" className={labelClass}>Date and time <span className="font-normal text-stone">(Lagos)</span></label>
          <input id="ev-when" type="datetime-local" value={v.datetime} onChange={(e) => set("datetime", e.target.value)} required className={fieldClass} />
          <FieldError messages={errors.datetime} />
        </div>
        <div>
          <label htmlFor="ev-venue" className={labelClass}>Venue</label>
          <input id="ev-venue" value={v.venue} onChange={(e) => set("venue", e.target.value)} required placeholder="Main auditorium" className={fieldClass} />
          <FieldError messages={errors.venue} />
        </div>
      </div>
      <div>
        <label htmlFor="ev-desc" className={labelClass}>Description</label>
        <textarea id="ev-desc" rows={5} value={v.desc} onChange={(e) => set("desc", e.target.value)} required className={cn(fieldClass, "h-auto resize-y py-3")} />
        <FieldError messages={errors.desc} />
      </div>
      <div>
        <label htmlFor="ev-reg" className={labelClass}>Registration link <span className="font-normal text-stone">(optional)</span></label>
        <input id="ev-reg" type="url" value={v.reglink} onChange={(e) => set("reglink", e.target.value)} placeholder="https://forms.gle/…" className={fieldClass} />
        <FieldError messages={errors.reglink} />
      </div>
      <div>
        <label htmlFor="ev-img" className={labelClass}>Image link <span className="font-normal text-stone">(optional)</span></label>
        <input id="ev-img" type="url" value={v.image} onChange={(e) => set("image", e.target.value)} placeholder="https://…/flyer.jpg" className={fieldClass} />
        <p className="mt-1 text-xs text-stone">A link to the flyer, e.g. an image from the church&apos;s Instagram or Google Drive (shared publicly).</p>
        <FieldError messages={errors.image} />
      </div>
      {error && <p role="alert" className="rounded-2xl bg-red-50 p-3 text-sm text-red-900">{error}</p>}
      <button type="submit" disabled={busy} className={cn(buttonVariants({ size: "lg" }), "w-full")}>
        {busy && <Loader2 className="animate-spin" aria-hidden />} {event ? "Save changes" : "Create event"}
      </button>
    </form>
  );
}
