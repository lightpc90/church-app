"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Baby, Check, CloudOff, Loader2, RefreshCw, Search, Undo2, WifiOff } from "lucide-react";
import { Dialog } from "../admin/table/cells";
import { useOfflineQueue } from "./useOfflineQueue";
import { fieldClass, labelClass } from "../forms/fields";
import { FieldError } from "../forms/FormBits";
import { buttonVariants } from "../site/primitives";
import { cn } from "@/lib/utils";

type DeskChild = { id: string; fullname: string; gender: string; dob: string; guardian_fullname: string; guardian_phone: string };
type Mark = { markedAt: string; pending?: boolean };

const timeFmt = new Intl.DateTimeFormat("en-NG", { hour: "numeric", minute: "2-digit", timeZone: "Africa/Lagos" });
const URL = "/api/desk/children/attendance";

const ageOf = (dob: string) => {
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  if (now < new Date(now.getFullYear(), d.getMonth(), d.getDate())) age--;
  return age;
};

export default function ChildrenDesk({
  dateKey,
  dateLabel,
  kids: initialChildren,
  marks: initialMarks,
}: {
  dateKey: string;
  dateLabel: string;
  kids: DeskChild[];
  marks: { childId: string; markedAt: string }[];
}) {
  const [kids, setKids] = useState(initialChildren);
  const [marks, setMarks] = useState<Record<string, Mark>>(() => Object.fromEntries(initialMarks.map((m) => [m.childId, { markedAt: m.markedAt }])));
  const [q, setQ] = useState("");
  const [show, setShow] = useState<"todo" | "done" | "all">("todo");
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);
  const [registering, setRegistering] = useState(false);

  const { pending, online, send, flush } = useOfflineQueue((results) => {
    setMarks((m) => {
      const next = { ...m };
      for (const r of results) {
        const id = r.key.replace(/^child:/, "");
        if (r.ok && next[id]) next[id] = { ...next[id], pending: false };
        if (!r.ok) delete next[id];
      }
      return next;
    });
    const failed = results.filter((r) => !r.ok);
    setNotice(failed.length ? { ok: false, text: `${failed.length} saved check-in(s) were refused: ${failed[0].error ?? "error"}` } : { ok: true, text: `${results.length} saved check-in(s) synced.` });
  });
  const pendingIds = useMemo(() => new Set(pending.filter((p) => p.key.startsWith("child:")).map((p) => p.key.slice(6))), [pending]);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    const digits = term.replace(/\D/g, "");
    return kids
      .filter(
        (c) =>
          !term ||
          c.fullname.toLowerCase().includes(term) ||
          c.guardian_fullname.toLowerCase().includes(term) ||
          (digits.length >= 3 && c.guardian_phone.replace(/\D/g, "").includes(digits))
      )
      .filter((c) => {
        const done = !!marks[c.id] || pendingIds.has(c.id);
        return show === "all" || (show === "done" ? done : !done);
      })
      .sort((a, b) => a.fullname.localeCompare(b.fullname));
  }, [kids, marks, q, show, pendingIds]);

  const doneCount = kids.filter((c) => marks[c.id] || pendingIds.has(c.id)).length;

  async function checkIn(c: DeskChild) {
    setBusy(c.id);
    setNotice(null);
    const res = await send(`child:${c.id}`, URL, { childId: c.id });
    if (res === "queued") {
      setMarks((m) => ({ ...m, [c.id]: { markedAt: new Date().toISOString(), pending: true } }));
      setNotice({ ok: true, text: `${c.fullname}: saved on this device. It will sync when the connection is back.` });
    } else if (res.body?.success) {
      setMarks((m) => ({ ...m, [c.id]: { markedAt: res.body.data.markedAt } }));
      setNotice({ ok: true, text: res.body.alreadyMarked ? `${c.fullname} was already checked in.` : `${c.fullname} checked in.` });
    } else {
      setNotice({ ok: false, text: res.body?.error ?? "Couldn't check in" });
    }
    setBusy(null);
  }

  async function undo(c: DeskChild) {
    setBusy(c.id);
    try {
      const res = await fetch(URL, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: c.id, date: dateKey }) });
      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.success) throw new Error(body?.error ?? "Couldn't undo");
      setMarks((m) => {
        const next = { ...m };
        delete next[c.id];
        return next;
      });
      setNotice({ ok: true, text: `Check-in for ${c.fullname} removed.` });
    } catch (e) {
      setNotice({ ok: false, text: e instanceof Error ? e.message : "Couldn't undo (are you online?)" });
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-900">
          <Baby className="size-4" aria-hidden /> {dateLabel}
        </span>
        <span className="text-sm text-stone tabular-nums">
          {doneCount} of {kids.length} checked in
        </span>
        {!online && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-soft px-3 py-1.5 text-xs font-semibold text-ink">
            <WifiOff className="size-3.5" aria-hidden /> Offline: check-ins are saved on this device
          </span>
        )}
        {pendingIds.size > 0 && (
          <button type="button" onClick={() => void flush()} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink">
            <CloudOff className="size-3.5" aria-hidden /> {pendingIds.size} waiting to sync <RefreshCw className="size-3.5" aria-hidden />
          </button>
        )}
        <button
          type="button"
          onClick={() => setRegistering(true)}
          className="ml-auto inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white hover:bg-ink-soft"
        >
          <Baby className="size-4" aria-hidden /> Register a child
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[16rem] flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-stone" aria-hidden />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search child, parent or phone"
            aria-label="Search children"
            className="h-14 w-full rounded-2xl border border-line bg-white pr-4 pl-12 text-lg text-ink outline-hidden focus:border-royal focus:ring-4 focus:ring-royal/10"
          />
        </div>
        <div role="group" aria-label="Show" className="inline-flex rounded-full border border-line bg-white p-1">
          {(
            [
              ["todo", "Not yet"],
              ["done", "Checked in"],
              ["all", "All"],
            ] as const
          ).map(([k, label]) => (
            <button key={k} type="button" aria-pressed={show === k} onClick={() => setShow(k)} className={cn("h-10 rounded-full px-4 text-sm font-semibold", show === k ? "bg-ink text-white" : "text-stone hover:text-ink")}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {notice && (
        <p role="status" className={cn("rounded-2xl p-3 text-sm", notice.ok ? "bg-emerald-50 text-emerald-900" : "bg-red-50 text-red-900")}>
          {notice.text}
        </p>
      )}

      <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
        {list.length === 0 && (
          <li className="px-5 py-12 text-center text-stone">
            {q ? `No child matches “${q}”. Register them if they're new.` : show === "todo" ? "Every registered child is checked in." : "No children registered yet."}
          </li>
        )}
        {list.map((c) => {
          const m = marks[c.id];
          const waiting = m?.pending || pendingIds.has(c.id);
          const age = ageOf(c.dob);
          return (
            <li key={c.id} className="flex flex-wrap items-center gap-3 px-4 py-3 sm:px-5">
              <div className="min-w-0 flex-1">
                <p className="text-lg font-semibold text-ink">
                  {c.fullname}
                  <span className="ml-2 text-sm font-normal text-stone">
                    <span className="capitalize">{c.gender}</span>
                    {age != null && ` · ${age} ${age === 1 ? "yr" : "yrs"}`}
                  </span>
                </p>
                <p className="text-sm text-stone">
                  {c.guardian_fullname} · …{c.guardian_phone.replace(/\D/g, "").slice(-4)}
                </p>
              </div>
              {m || waiting ? (
                <div className="flex items-center gap-3">
                  <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold", waiting ? "bg-gold-soft text-ink" : "bg-emerald-50 text-emerald-800")}>
                    {waiting ? <CloudOff className="size-4" aria-hidden /> : <Check className="size-4" aria-hidden />}
                    {waiting ? "Saved, will sync" : timeFmt.format(new Date(m!.markedAt))}
                  </span>
                  {m && !waiting && (
                    <button type="button" disabled={busy === c.id} onClick={() => void undo(c)} aria-label={`Undo check-in for ${c.fullname}`} className="inline-flex size-10 items-center justify-center rounded-full text-stone hover:bg-sand hover:text-ink">
                      <Undo2 className="size-4" aria-hidden />
                    </button>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  disabled={busy === c.id}
                  onClick={() => void checkIn(c)}
                  className="inline-flex h-12 min-w-[9rem] items-center justify-center gap-2 rounded-full bg-emerald-700 px-5 font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60"
                >
                  {busy === c.id ? <Loader2 className="size-5 animate-spin" aria-hidden /> : <Check className="size-5" aria-hidden />}
                  Check in
                </button>
              )}
            </li>
          );
        })}
      </ul>

      <Dialog open={registering} onClose={() => setRegistering(false)} title="Register a child">
        <ChildQuickForm
          onCreated={async (child, checkInNow) => {
            setKids((k) => [...k, child]);
            setRegistering(false);
            setQ(child.fullname);
            setShow("all");
            if (checkInNow) await checkIn(child);
            else setNotice({ ok: true, text: `${child.fullname} registered.` });
          }}
        />
      </Dialog>
    </div>
  );
}

function ChildQuickForm({ onCreated }: { onCreated: (c: DeskChild, checkInNow: boolean) => void }) {
  const blank = { guardian_fullname: "", guardian_phone: "", guardian_email: "", guardian_gender: "", fullname: "", gender: "", dob: "" };
  const [v, setV] = useState(blank);
  const [agreed, setAgreed] = useState(false);
  const [checkInNow, setCheckInNow] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const set = (k: keyof typeof v, value: string) => setV((s) => ({ ...s, [k]: value }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setErrors({});
    try {
      const res = await fetch("/api/desk/children", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...v, guardianAgreed: agreed }) });
      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.success) {
        if (body?.details && !body.details.existingId) setErrors(body.details);
        throw new Error(body?.error === "Validation failed" ? "Please check the highlighted fields." : (body?.error ?? "Couldn't register"));
      }
      onCreated(body.data, checkInNow);
      setV(blank);
      setAgreed(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't register");
    } finally {
      setBusy(false);
    }
  }

  const gender = (name: "gender" | "guardian_gender", legend: string) => (
    <fieldset>
      <legend className={labelClass}>{legend}</legend>
      <div className="flex gap-2">
        {(["male", "female"] as const).map((g) => (
          <label key={g} className="flex flex-1 cursor-pointer items-center justify-center rounded-xl border border-line bg-white px-3 py-3 text-sm font-medium capitalize has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-white">
            <input type="radio" name={`cq-${name}`} value={g} checked={v[name] === g} onChange={() => set(name, g)} required className="sr-only" />
            {g}
          </label>
        ))}
      </div>
      <FieldError messages={errors[name]} />
    </fieldset>
  );

  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      <p className="eyebrow sm:col-span-2">Child</p>
      <div className="sm:col-span-2">
        <label htmlFor="cq-fullname" className={labelClass}>Child&apos;s full name</label>
        <input id="cq-fullname" value={v.fullname} onChange={(e) => set("fullname", e.target.value)} required className={fieldClass} />
        <FieldError messages={errors.fullname} />
      </div>
      {gender("gender", "Child's gender")}
      <div>
        <label htmlFor="cq-dob" className={labelClass}>Date of birth</label>
        <input id="cq-dob" type="date" max={new Date().toISOString().slice(0, 10)} value={v.dob} onChange={(e) => set("dob", e.target.value)} required className={fieldClass} />
        <FieldError messages={errors.dob} />
      </div>
      <p className="eyebrow mt-2 sm:col-span-2">Parent / guardian</p>
      <div>
        <label htmlFor="cq-gname" className={labelClass}>Full name</label>
        <input id="cq-gname" value={v.guardian_fullname} onChange={(e) => set("guardian_fullname", e.target.value)} required className={fieldClass} />
        <FieldError messages={errors.guardian_fullname} />
      </div>
      <div>
        <label htmlFor="cq-gphone" className={labelClass}>Phone number</label>
        <input id="cq-gphone" type="tel" inputMode="tel" value={v.guardian_phone} onChange={(e) => set("guardian_phone", e.target.value)} required className={fieldClass} />
        <FieldError messages={errors.guardian_phone} />
      </div>
      <div>
        <label htmlFor="cq-gemail" className={labelClass}>
          Email <span className="font-normal text-stone">(optional)</span>
        </label>
        <input id="cq-gemail" type="email" value={v.guardian_email} onChange={(e) => set("guardian_email", e.target.value)} className={fieldClass} />
        <FieldError messages={errors.guardian_email} />
      </div>
      {gender("guardian_gender", "Parent / guardian's gender")}
      <label className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4 text-sm text-ink sm:col-span-2">
        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} required className="mt-0.5 size-5 accent-ink" />
        <span>
          The parent or guardian is here and agrees that the church may keep these details to register the child and
          record their attendance. <a href="/privacy" target="_blank" className="font-semibold text-royal hover:underline">Privacy policy</a>
        </span>
      </label>
      <FieldError messages={errors.guardianAgreed} />
      <label className="flex items-center gap-3 text-sm text-ink sm:col-span-2">
        <input type="checkbox" checked={checkInNow} onChange={(e) => setCheckInNow(e.target.checked)} className="size-5 accent-ink" />
        Check them in for today straight away
      </label>
      {error && <p role="alert" className="rounded-2xl bg-red-50 p-3 text-sm text-red-900 sm:col-span-2">{error}</p>}
      <button type="submit" disabled={busy} className={cn(buttonVariants({ size: "lg" }), "sm:col-span-2")}>
        {busy && <Loader2 className="animate-spin" aria-hidden />} Register child
      </button>
    </form>
  );
}
