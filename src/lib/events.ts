// Event.datetime is stored as the string from <input type="datetime-local"> (no offset).
// Interpret naive values as church-local time so "18:00" means 6pm in Lagos regardless of
// the server's timezone (Vercel runs in UTC).
export const CHURCH_TIME_ZONE = "Africa/Lagos";
const CHURCH_UTC_OFFSET = "+01:00";

export function parseEventDate(value: string): Date | null {
  const hasOffset = /([zZ]|[+-]\d{2}:?\d{2})$/.test(value);
  const d = new Date(hasOffset ? value : `${value}${CHURCH_UTC_OFFSET}`);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatEventParts(date: Date) {
  const fmt = (opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-NG", { timeZone: CHURCH_TIME_ZONE, ...opts }).format(date);
  return {
    weekday: fmt({ weekday: "short" }),
    day: fmt({ day: "2-digit" }),
    month: fmt({ month: "short" }),
    year: fmt({ year: "numeric" }),
    time: fmt({ hour: "numeric", minute: "2-digit", hour12: true }),
  };
}
