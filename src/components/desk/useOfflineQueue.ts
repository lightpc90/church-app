"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Keeps desk check-ins working through network drops in church. A request that can't reach the
 * server is stored on this device (localStorage) with the time it happened, and sent automatically
 * when the connection returns. Only ids and timestamps are stored, no names or phone numbers.
 */
export type QueuedRequest = { key: string; url: string; method: "POST"; body: Record<string, unknown>; queuedAt: string };
type Outcome = { key: string; ok: boolean; error?: string };

const STORAGE = "bg_desk_queue_v1";
const read = (): QueuedRequest[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE) ?? "[]");
  } catch {
    return [];
  }
};
const write = (q: QueuedRequest[]) => localStorage.setItem(STORAGE, JSON.stringify(q));

export function useOfflineQueue(onSynced?: (results: Outcome[]) => void) {
  const [pending, setPending] = useState<QueuedRequest[]>([]);
  const [online, setOnline] = useState(true);
  const flushing = useRef(false);
  const onSyncedRef = useRef(onSynced);
  useEffect(() => {
    onSyncedRef.current = onSynced;
  }, [onSynced]);

  const flush = useCallback(async () => {
    if (flushing.current || !navigator.onLine) return;
    const queue = read();
    if (!queue.length) return;
    flushing.current = true;
    const results: Outcome[] = [];
    const keep: QueuedRequest[] = [];
    for (const item of queue) {
      try {
        const res = await fetch(item.url, {
          method: item.method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item.body),
        });
        const body = await res.json().catch(() => null);
        // 5xx: try again later. 4xx: the server said no (e.g. too late); report it and drop it.
        if (res.status >= 500) keep.push(item);
        else results.push({ key: item.key, ok: res.ok && !!body?.success, error: body?.error });
      } catch {
        keep.push(item);
      }
    }
    write(keep);
    setPending(keep);
    flushing.current = false;
    if (results.length) onSyncedRef.current?.(results);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable in the browser
    setPending(read());
    setOnline(navigator.onLine);
    const up = () => {
      setOnline(true);
      void flush();
    };
    const down = () => setOnline(false);
    window.addEventListener("online", up);
    window.addEventListener("offline", down);
    const timer = setInterval(() => void flush(), 30_000);
    void flush();
    return () => {
      window.removeEventListener("online", up);
      window.removeEventListener("offline", down);
      clearInterval(timer);
    };
  }, [flush]);

  /**
   * Sends now if possible. Returns the server's JSON, or "queued" if the device is offline
   * (or the request couldn't get through), in which case it will be retried automatically.
   */
  const send = useCallback(async (key: string, url: string, body: Record<string, unknown>) => {
    const queue = (): "queued" => {
      const item: QueuedRequest = { key, url, method: "POST", body: { ...body, markedAt: new Date().toISOString() }, queuedAt: new Date().toISOString() };
      const next = [...read().filter((q) => q.key !== key), item];
      write(next);
      setPending(next);
      return "queued";
    };
    if (!navigator.onLine) return queue();
    try {
      const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.status >= 500) return queue();
      return { status: res.status, body: await res.json().catch(() => null) };
    } catch {
      return queue();
    }
  }, []);

  return { pending, online, send, flush };
}
