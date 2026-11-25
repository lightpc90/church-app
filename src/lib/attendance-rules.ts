// Workers' Sunday attendance rules. Pure module: used by the API (the real check) and the
// attendance page (to explain what's happening). Times are Lagos time (WAT, UTC+1, no DST).

import { site } from "./site";

export const ATTENDANCE = {
  /** 0 = Sunday */
  day: 0,
  start: { h: 6, m: 30 },
  end: { h: 8, m: 0 },
  radiusM: 100,
  /** Readings less precise than this are rejected: ask the worker to turn on GPS / location */
  maxAccuracyM: 100,
  centre: site.coordinates,
} as const;

const LAGOS_OFFSET_MS = 60 * 60 * 1000;

/** Wall-clock parts of `at` in Lagos. */
export function lagosParts(at: Date = new Date()) {
  const d = new Date(at.getTime() + LAGOS_OFFSET_MS);
  return {
    day: d.getUTCDay(),
    minutes: d.getUTCHours() * 60 + d.getUTCMinutes(),
    dateKey: d.toISOString().slice(0, 10),
  };
}

const minutesOf = (t: { h: number; m: number }) => t.h * 60 + t.m;

export type WindowState = { open: boolean; dateKey: string; reason?: "not-sunday" | "too-early" | "closed" };

export function attendanceWindow(at: Date = new Date()): WindowState {
  const { day, minutes, dateKey } = lagosParts(at);
  if (day !== ATTENDANCE.day) return { open: false, dateKey, reason: "not-sunday" };
  if (minutes < minutesOf(ATTENDANCE.start)) return { open: false, dateKey, reason: "too-early" };
  if (minutes >= minutesOf(ATTENDANCE.end)) return { open: false, dateKey, reason: "closed" };
  return { open: true, dateKey };
}

export const windowLabel = "Sundays, 6:30 – 8:00 AM";

/** Great-circle distance in metres (haversine). */
export function distanceM(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6_371_000;
  const rad = (x: number) => (x * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** The last `count` Sunday date keys (Lagos), newest first, including today if it's Sunday. */
export function recentSundays(count: number, at: Date = new Date()) {
  const { day } = lagosParts(at);
  const base = new Date(at.getTime() + LAGOS_OFFSET_MS - day * 86_400_000);
  return Array.from({ length: count }, (_, i) => new Date(base.getTime() - i * 7 * 86_400_000).toISOString().slice(0, 10));
}
