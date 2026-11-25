"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, MapPin, MapPinOff, RotateCw, TimerOff } from "lucide-react";
import { ATTENDANCE, windowLabel, type WindowState } from "@/lib/attendance-rules";
import { buttonVariants } from "../site/primitives";
import { cn } from "@/lib/utils";

type State =
  | { kind: "closed"; reason?: WindowState["reason"] }
  | { kind: "done"; markedAt: string; distanceM?: number }
  | { kind: "locating" }
  | { kind: "sending" }
  | { kind: "error"; title: string; body: string; retry: boolean };

const timeFmt = new Intl.DateTimeFormat("en-NG", { hour: "numeric", minute: "2-digit", timeZone: "Africa/Lagos" });
const WAIT_FOR_FIX_MS = 15_000;

/** Wait for a GPS fix precise enough to judge 100 m (GPS often starts imprecise), or the best one in 15 s. */
function getFix(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    let best: GeolocationPosition | null = null;
    const finish = (pos: GeolocationPosition | null, err?: GeolocationPositionError) => {
      navigator.geolocation.clearWatch(id);
      clearTimeout(timer);
      if (pos) resolve(pos);
      else reject(err);
    };
    const id = navigator.geolocation.watchPosition(
      (pos) => {
        if (!best || pos.coords.accuracy < best.coords.accuracy) best = pos;
        if (pos.coords.accuracy <= ATTENDANCE.maxAccuracyM / 2) finish(pos);
      },
      (err) => finish(best, err),
      { enableHighAccuracy: true, maximumAge: 0, timeout: WAIT_FOR_FIX_MS }
    );
    const timer = setTimeout(() => finish(best, { code: 3, message: "timeout" } as GeolocationPositionError), WAIT_FOR_FIX_MS);
  });
}

export default function AttendanceCheckIn({
  open,
  reason,
  markedAt,
}: {
  open: boolean;
  reason?: WindowState["reason"];
  markedAt: string | null;
}) {
  const [state, setState] = useState<State>(() =>
    markedAt ? { kind: "done", markedAt } : open ? { kind: "locating" } : { kind: "closed", reason }
  );
  const started = useRef(false);

  const checkIn = useCallback(async () => {
    if (!("geolocation" in navigator)) {
      setState({ kind: "error", title: "Location isn't available", body: "This browser can't share your location. Try your phone's browser (Chrome or Safari).", retry: false });
      return;
    }
    setState({ kind: "locating" });
    let pos: GeolocationPosition;
    try {
      pos = await getFix();
    } catch (e) {
      const code = (e as GeolocationPositionError | undefined)?.code;
      setState(
        code === 1
          ? {
              kind: "error",
              title: "Location permission is off",
              body: "Allow location for this site (tap the icon next to the web address, or check your phone's settings), then try again.",
              retry: true,
            }
          : { kind: "error", title: "Couldn't find your location", body: "Turn on location/GPS, step away from thick walls if you can, and try again.", retry: true }
      );
      return;
    }

    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/workers/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }),
      });
      const body = await res.json().catch(() => null);
      if (res.ok && body?.success) {
        setState({ kind: "done", markedAt: body.data.markedAt, distanceM: body.data.distanceM });
        return;
      }
      const code = body?.details?.code;
      if (code === "too-far") {
        setState({
          kind: "error",
          title: "You're not at church yet",
          body: `You seem to be about ${body.details.distanceM} m away. Check-in works within ${ATTENDANCE.radiusM} m of the church.`,
          retry: true,
        });
      } else if (code === "inaccurate") {
        setState({
          kind: "error",
          title: "Your location isn't precise enough",
          body: `Your phone could only locate you to within ${body.details.accuracyM} m. Turn on GPS / precise location and try again.`,
          retry: true,
        });
      } else if (code === "not-sunday" || code === "too-early" || code === "closed") {
        setState({ kind: "closed", reason: code });
      } else {
        setState({ kind: "error", title: "Couldn't mark attendance", body: body?.error ?? "Please try again.", retry: true });
      }
    } catch {
      setState({ kind: "error", title: "No connection", body: "Check your internet connection and try again.", retry: true });
    }
  }, []);

  // Opening the page during the window is enough: check in straight away.
  useEffect(() => {
    if (open && !markedAt && !started.current) {
      started.current = true;
      void checkIn();
    }
  }, [open, markedAt, checkIn]);

  return (
    <div className="mt-8" aria-live="polite">
      {state.kind === "done" && (
        <Panel tone="success" icon={<CheckCircle2 />} title="You're checked in">
          Marked at {timeFmt.format(new Date(state.markedAt))}
          {state.distanceM != null && `, about ${state.distanceM} m from the church`}. Thank you for serving today!
        </Panel>
      )}
      {(state.kind === "locating" || state.kind === "sending") && (
        <Panel tone="info" icon={<Loader2 className="animate-spin" />} title={state.kind === "locating" ? "Finding your location…" : "Checking you in…"}>
          {state.kind === "locating" ? "Your phone may ask to share your location. Tap Allow." : "Almost done."}
        </Panel>
      )}
      {state.kind === "closed" && (
        <Panel tone="muted" icon={<TimerOff />} title={state.reason === "too-early" ? "Check-in opens at 6:30 AM" : "Check-in is closed"}>
          Attendance can only be marked on {windowLabel}. Open this page at church during that time.
        </Panel>
      )}
      {state.kind === "error" && (
        <Panel tone="error" icon={state.title.includes("not at church") ? <MapPinOff /> : <MapPin />} title={state.title}>
          {state.body}
        </Panel>
      )}

      {state.kind === "error" && state.retry && (
        <button type="button" onClick={() => void checkIn()} className={cn(buttonVariants({ size: "lg" }), "mt-5 w-full")}>
          <RotateCw aria-hidden /> Try again
        </button>
      )}
      <Link href="/workers/dashboard" className="mt-6 inline-block text-sm font-semibold text-stone hover:text-ink">
        ← Back to your dashboard
      </Link>
    </div>
  );
}

function Panel({
  tone,
  icon,
  title,
  children,
}: {
  tone: "success" | "info" | "muted" | "error";
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  const tones = {
    success: "bg-emerald-50 text-emerald-900",
    info: "bg-white text-ink border border-line",
    muted: "bg-sand/70 text-ink",
    error: "bg-red-50 text-red-900",
  };
  return (
    <div className={cn("flex gap-4 rounded-3xl p-5", tones[tone])}>
      <span className="mt-0.5 shrink-0 [&_svg]:size-6">{icon}</span>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1 text-sm opacity-80">{children}</p>
      </div>
    </div>
  );
}
