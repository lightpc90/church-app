"use client";

import { useMemo, useState } from "react";
import { Check, CloudOff, Loader2, RefreshCw, Search, Undo2, UserPlus, WifiOff } from "lucide-react";
import { Dialog } from "../admin/table/cells";
import WorkerQuickForm from "./WorkerQuickForm";
import { useOfflineQueue } from "./useOfflineQueue";
import { cn } from "@/lib/utils";

type DeskWorker = { id: string; name: string | null; phone: string | null; dept: string };
type Mark = { markedAt: string; method: string | null; pending?: boolean };

const timeFmt = new Intl.DateTimeFormat("en-NG", { hour: "numeric", minute: "2-digit", timeZone: "Africa/Lagos" });
const URL = "/api/desk/workers/attendance";

export default function WorkerDesk({
  dateKey,
  dateLabel,
  windowOpen,
  windowNote,
  workers: initialWorkers,
  marks: initialMarks,
  defaultDept,
}: {
  dateKey: string;
  dateLabel: string;
  windowOpen: boolean;
  windowNote: string;
  workers: DeskWorker[];
  marks: { workerId: string; markedAt: string; method: string | null }[];
  defaultDept: string | null;
}) {
  const [workers, setWorkers] = useState(initialWorkers);
  const [marks, setMarks] = useState<Record<string, Mark>>(() =>
    Object.fromEntries(initialMarks.map((m) => [m.workerId, { markedAt: m.markedAt, method: m.method }]))
  );
  const [q, setQ] = useState("");
  const [show, setShow] = useState<"todo" | "done" | "all">("todo");
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);
  const [registering, setRegistering] = useState(false);

  const { pending, online, send, flush } = useOfflineQueue((results) => {
    setMarks((m) => {
      const next = { ...m };
      for (const r of results) {
        const id = r.key.replace(/^worker:/, "");
        if (r.ok && next[id]) next[id] = { ...next[id], pending: false };
        if (!r.ok) delete next[id];
      }
      return next;
    });
    const failed = results.filter((r) => !r.ok);
    setNotice(
      failed.length
        ? { ok: false, text: `${failed.length} saved check-in(s) were refused when syncing: ${failed[0].error ?? "error"}` }
        : { ok: true, text: `${results.length} saved check-in(s) synced.` }
    );
  });

  // Marks still waiting on this device (e.g. after a page reload while offline).
  const pendingIds = useMemo(() => new Set(pending.map((p) => p.key.replace(/^worker:/, ""))), [pending]);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    const digits = term.replace(/\D/g, "");
    return workers
      .filter((w) => {
        if (!term) return true;
        return (
          (w.name ?? "").toLowerCase().includes(term) ||
          w.dept.toLowerCase().includes(term) ||
          (digits.length >= 3 && (w.phone ?? "").replace(/\D/g, "").includes(digits))
        );
      })
      .filter((w) => {
        const done = !!marks[w.id] || pendingIds.has(w.id);
        return show === "all" || (show === "done" ? done : !done);
      })
      .sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
  }, [workers, marks, q, show, pendingIds]);

  const doneCount = workers.filter((w) => marks[w.id] || pendingIds.has(w.id)).length;

  async function mark(w: DeskWorker) {
    setBusy(w.id);
    setNotice(null);
    const res = await send(`worker:${w.id}`, URL, { workerId: w.id });
    if (res === "queued") {
      setMarks((m) => ({ ...m, [w.id]: { markedAt: new Date().toISOString(), method: "desk", pending: true } }));
      setNotice({ ok: true, text: `${w.name}: saved on this device. It will sync when the connection is back.` });
    } else if (res.body?.success) {
      setMarks((m) => ({ ...m, [w.id]: { markedAt: res.body.data.markedAt, method: res.body.data.method } }));
      setNotice({ ok: true, text: res.body.alreadyMarked ? `${w.name} was already checked in.` : `${w.name} checked in.` });
    } else {
      setNotice({ ok: false, text: res.body?.error ?? "Couldn't check in" });
    }
    setBusy(null);
  }

  async function undo(w: DeskWorker) {
    setBusy(w.id);
    setNotice(null);
    try {
      const res = await fetch(URL, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: w.id, date: dateKey }) });
      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.success) throw new Error(body?.error ?? "Couldn't undo");
      setMarks((m) => {
        const next = { ...m };
        delete next[w.id];
        return next;
      });
      setNotice({ ok: true, text: `Check-in for ${w.name} removed.` });
    } catch (e) {
      setNotice({ ok: false, text: e instanceof Error ? e.message : "Couldn't undo (are you online?)" });
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <div
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold",
            windowOpen ? "bg-emerald-50 text-emerald-800" : "bg-sand text-stone"
          )}
        >
          <span className={cn("size-2 rounded-full", windowOpen ? "bg-emerald-600" : "bg-stone/50")} aria-hidden />
          {dateLabel} · {windowNote}
        </div>
        <span className="text-sm text-stone tabular-nums">
          {doneCount} of {workers.length} checked in
        </span>
        {!online && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-soft px-3 py-1.5 text-xs font-semibold text-ink">
            <WifiOff className="size-3.5" aria-hidden /> Offline: check-ins are saved on this device
          </span>
        )}
        {pending.length > 0 && (
          <button
            type="button"
            onClick={() => void flush()}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink"
          >
            <CloudOff className="size-3.5" aria-hidden /> {pending.length} waiting to sync
            <RefreshCw className="size-3.5" aria-hidden />
          </button>
        )}
        <button
          type="button"
          onClick={() => setRegistering(true)}
          className="ml-auto inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white hover:bg-ink-soft"
        >
          <UserPlus className="size-4" aria-hidden /> Register new worker
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[16rem] flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-stone" aria-hidden />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, phone or department"
            aria-label="Search workers"
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
            <button
              key={k}
              type="button"
              aria-pressed={show === k}
              onClick={() => setShow(k)}
              className={cn("h-10 rounded-full px-4 text-sm font-semibold", show === k ? "bg-ink text-white" : "text-stone hover:text-ink")}
            >
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
            {q ? `Nobody matches “${q}”. Register them if they're new.` : show === "todo" ? "Everyone is checked in." : "No workers yet."}
          </li>
        )}
        {list.map((w) => {
          const m = marks[w.id];
          const waiting = m?.pending || pendingIds.has(w.id);
          return (
            <li key={w.id} className="flex flex-wrap items-center gap-3 px-4 py-3 sm:px-5">
              <div className="min-w-0 flex-1">
                <p className="text-lg font-semibold text-ink">{w.name ?? "-"}</p>
                <p className="text-sm text-stone">
                  {w.dept}
                  {w.phone && ` · …${w.phone.replace(/\D/g, "").slice(-4)}`}
                </p>
              </div>
              {m || waiting ? (
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold",
                      waiting ? "bg-gold-soft text-ink" : "bg-emerald-50 text-emerald-800"
                    )}
                  >
                    {waiting ? <CloudOff className="size-4" aria-hidden /> : <Check className="size-4" aria-hidden />}
                    {waiting ? "Saved, will sync" : `${timeFmt.format(new Date(m!.markedAt))}${m!.method === "desk" ? " · desk" : " · own phone"}`}
                  </span>
                  {m && !waiting && m.method === "desk" && (
                    <button
                      type="button"
                      disabled={busy === w.id}
                      onClick={() => void undo(w)}
                      aria-label={`Undo check-in for ${w.name}`}
                      className="inline-flex size-10 items-center justify-center rounded-full text-stone hover:bg-sand hover:text-ink"
                    >
                      <Undo2 className="size-4" aria-hidden />
                    </button>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  disabled={!windowOpen || busy === w.id}
                  onClick={() => void mark(w)}
                  className="inline-flex h-12 min-w-[9rem] items-center justify-center gap-2 rounded-full bg-emerald-700 px-5 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-stone/30"
                >
                  {busy === w.id ? <Loader2 className="size-5 animate-spin" aria-hidden /> : <Check className="size-5" aria-hidden />}
                  Check in
                </button>
              )}
            </li>
          );
        })}
      </ul>

      <Dialog open={registering} onClose={() => setRegistering(false)} title="Register a new worker">
        <p className="mb-4 text-sm text-stone">
          For workers without an email or smartphone. They&apos;re approved straight away. If they later sign up on the
          Workers&apos; portal with the same phone number, their account is linked to this record.
        </p>
        <WorkerQuickForm
          defaultDept={defaultDept}
          onCreated={(w) => {
            setWorkers((list) => [...list, w]);
            setRegistering(false);
            setQ(w.name ?? "");
            setShow("all");
            setNotice({ ok: true, text: `${w.name} registered.${windowOpen ? " Tap Check in to mark them present." : ""}` });
          }}
        />
      </Dialog>
    </div>
  );
}
