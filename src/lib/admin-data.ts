import "server-only";
import prisma from "./prisma";
import type { StaffMember } from "./auth";
import { workerScope } from "./scopes";
import { recentSundays } from "./attendance-rules";
import { canonicalDept } from "./departments";

const newestFirst = { orderBy: { createdAt: "desc" as const } };

export const adminQueries = {
  prayerRequests: () => prisma.prayerRequest.findMany(newestFirst),
  testimonies: () => prisma.testimony.findMany(newestFirst),
  enquiries: () => prisma.enquiry.findMany(newestFirst),
  followUps: () => prisma.followUp.findMany(newestFirst),
  workers: (staff: StaffMember) => prisma.worker.findMany({ where: workerScope(staff), orderBy: { name: "asc" } }),
  houseFellowships: () => prisma.houseFellowship.findMany({ orderBy: [{ zone: "asc" }, { center: "asc" }] }),
};

// Records created before the handled fields existed have no `handledAt` key at all, which
// Prisma's `null` filter doesn't match on MongoDB, hence the `isSet` branch.
const unhandled = { OR: [{ handledAt: null }, { handledAt: { isSet: false } }] };

/** Items still waiting for someone on the team. Shown on the overview and as sidebar badges. */
export async function getOpenCounts() {
  const [prayers, followUps, enquiries] = await Promise.all([
    prisma.prayerRequest.count({ where: unhandled }),
    prisma.followUp.count({ where: unhandled }),
    prisma.enquiry.count({ where: unhandled }),
  ]);
  return { prayers, followUps, enquiries };
}

export type OpenCounts = Awaited<ReturnType<typeof getOpenCounts>>;

/** Natural groups and ministries, in sidebar order. `key` is the ?group= URL value. */
export const registrationGroups = [
  { key: "elders", label: "Elders", endpoint: "/api/naturalGroups/elders", withGender: true, load: () => prisma.elder.findMany(newestFirst), count: () => prisma.elder.count() },
  { key: "men", label: "Excellent Men", endpoint: "/api/naturalGroups/men", withGender: false, load: () => prisma.men.findMany(newestFirst), count: () => prisma.men.count() },
  { key: "women", label: "Good Women", endpoint: "/api/naturalGroups/women", withGender: false, load: () => prisma.women.findMany(newestFirst), count: () => prisma.women.count() },
  { key: "youths", label: "Ablaze Youth", endpoint: "/api/naturalGroups/youths", withGender: true, load: () => prisma.youth.findMany(newestFirst), count: () => prisma.youth.count() },
  { key: "teens", label: "Teens Ministry", endpoint: "/api/ministries/teens", withGender: true, load: () => prisma.teen.findMany(newestFirst), count: () => prisma.teen.count() },
  { key: "children", label: "Children Ministry", endpoint: "/api/ministries/children", withGender: true, load: () => prisma.child.findMany(newestFirst), count: () => prisma.child.count() },
] as const;

export type RegistrationGroupKey = (typeof registrationGroups)[number]["key"];

const WEEKS = 8;
const DAY = 86_400_000;

/** Monday 00:00 (Lagos time, UTC+1) of the week containing `d`, as a UTC timestamp. */
function weekStart(d: Date) {
  const lagos = new Date(d.getTime() + 3_600_000);
  const day = (lagos.getUTCDay() + 6) % 7; // Monday = 0
  const midnight = Date.UTC(lagos.getUTCFullYear(), lagos.getUTCMonth(), lagos.getUTCDate());
  return midnight - day * DAY - 3_600_000;
}

export type WeeklyPoint = {
  week: string;
  prayer: number;
  testimony: number;
  followUp: number;
  enquiry: number;
};

export type ActivityItem = {
  id: string;
  kind: "Prayer request" | "Testimony" | "New convert" | "Message";
  resource: "prayerRequests" | "testimonies" | "followUps" | "enquiries";
  name: string;
  preview: string;
  createdAt: Date;
  href: string;
};

export async function getOverview() {
  const now = new Date();
  const thisWeek = weekStart(now);
  const since = new Date(thisWeek - (WEEKS - 1) * 7 * DAY);
  const lastSevenDays = new Date(now.getTime() - 7 * DAY);
  const recent = { where: { createdAt: { gte: since } }, select: { createdAt: true } } as const;
  const latest = { orderBy: { createdAt: "desc" as const }, take: 5 };

  const [
    counts,
    newThisWeek,
    [prayerDates, testimonyDates, followUpDates, enquiryDates],
    [latestPrayers, latestTestimonies, latestFollowUps, latestEnquiries],
    workersByDept,
    registrationCounts,
    open,
  ] = await Promise.all([
    Promise.all([
      prisma.prayerRequest.count(),
      prisma.testimony.count(),
      prisma.followUp.count(),
      prisma.enquiry.count(),
      prisma.houseFellowship.count(),
      prisma.worker.count(),
    ]),
    Promise.all(
      [prisma.prayerRequest, prisma.testimony, prisma.followUp, prisma.enquiry].map((m) =>
        (m as typeof prisma.prayerRequest).count({ where: { createdAt: { gte: lastSevenDays } } })
      )
    ),
    Promise.all([
      prisma.prayerRequest.findMany(recent),
      prisma.testimony.findMany(recent),
      prisma.followUp.findMany(recent),
      prisma.enquiry.findMany(recent),
    ]),
    Promise.all([
      prisma.prayerRequest.findMany(latest),
      prisma.testimony.findMany(latest),
      prisma.followUp.findMany(latest),
      prisma.enquiry.findMany(latest),
    ]),
    prisma.worker.groupBy({ by: ["dept"], _count: { _all: true } }),
    Promise.all(registrationGroups.map((g) => g.count())),
    getOpenCounts(),
  ]);

  const [prayers, testimonies, followUps, enquiries, houseFellowships, workers] = counts;

  // Weekly buckets, oldest first.
  const weekly: WeeklyPoint[] = Array.from({ length: WEEKS }, (_, i) => {
    const start = thisWeek - (WEEKS - 1 - i) * 7 * DAY;
    const label = new Intl.DateTimeFormat("en-NG", { day: "numeric", month: "short", timeZone: "Africa/Lagos" }).format(start);
    return { week: label, prayer: 0, testimony: 0, followUp: 0, enquiry: 0 };
  });
  const bucket = (dates: { createdAt: Date }[], key: keyof Omit<WeeklyPoint, "week">) => {
    for (const { createdAt } of dates) {
      const i = Math.round((weekStart(createdAt) - (thisWeek - (WEEKS - 1) * 7 * DAY)) / (7 * DAY));
      if (i >= 0 && i < WEEKS) weekly[i][key]++;
    }
  };
  bucket(prayerDates, "prayer");
  bucket(testimonyDates, "testimony");
  bucket(followUpDates, "followUp");
  bucket(enquiryDates, "enquiry");

  const activity: ActivityItem[] = [
    ...latestPrayers.map((r) => ({ id: r.id, kind: "Prayer request" as const, resource: "prayerRequests" as const, name: r.fullname, preview: r.prayerRequest, createdAt: r.createdAt, href: "/admin?menu=prayer-requests" })),
    ...latestTestimonies.map((r) => ({ id: r.id, kind: "Testimony" as const, resource: "testimonies" as const, name: r.fullname, preview: r.testimony, createdAt: r.createdAt, href: "/admin?menu=testimonies" })),
    ...latestFollowUps.map((r) => ({ id: r.id, kind: "New convert" as const, resource: "followUps" as const, name: r.name, preview: r.address, createdAt: r.createdAt, href: "/admin?menu=follow-up" })),
    ...latestEnquiries.map((r) => ({ id: r.id, kind: "Message" as const, resource: "enquiries" as const, name: r.fullname, preview: r.enquiry, createdAt: r.createdAt, href: "/admin?menu=enquiries" })),
  ]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 20);

  return {
    totals: { prayers, testimonies, followUps, enquiries, houseFellowships, workers },
    open,
    newThisWeek: {
      prayers: newThisWeek[0],
      testimonies: newThisWeek[1],
      followUps: newThisWeek[2],
      enquiries: newThisWeek[3],
    },
    weekly,
    activity,
    // Department is free text: merge "Choir" and "choir".
    workersByDept: [
      ...workersByDept
        .reduce((m, d) => {
          const name = canonicalDept(d.dept);
          const key = name.toLowerCase();
          const prev = m.get(key);
          m.set(key, { dept: prev?.dept ?? name, count: (prev?.count ?? 0) + d._count._all });
          return m;
        }, new Map<string, { dept: string; count: number }>())
        .values(),
    ].sort((a, b) => b.count - a.count),
    registrations: registrationGroups.map((g, i) => ({ key: g.key, label: g.label, count: registrationCounts[i] })),
  };
}

/* ───────────── workers' attendance ───────────── */

const approvedWorker = { OR: [{ status: "approved" }, { status: null }, { status: { isSet: false } }] };

export type AttendanceRow = {
  id: string;
  name: string;
  dept: string;
  phone: string | null;
  email: string | null;
  present: boolean;
  markedAt: Date | null;
  distanceM: number | null;
};

/** One Sunday's attendance (default: the latest), limited to the HOD's department for HODs. */
export async function loadAttendance(staff: StaffMember, requested?: string) {
  const sundays = recentSundays(12);
  const date = requested && sundays.includes(requested) ? requested : sundays[0];
  const scope = workerScope(staff);

  const [workers, records, trend] = await Promise.all([
    prisma.worker.findMany({
      where: { AND: [approvedWorker, scope ?? {}] },
      select: { id: true, name: true, email: true, phone: true, dept: true },
    }),
    prisma.attendance.findMany({
      where: { date, ...(scope ? { worker: scope } : {}) },
      include: { worker: { select: { name: true, email: true, phone: true } } },
    }),
    prisma.attendance.groupBy({
      by: ["date"],
      where: { date: { in: sundays }, ...(scope ?? {}) },
      _count: { _all: true },
    }),
  ]);

  const present = new Set(records.map((r) => r.workerId));
  const rows: AttendanceRow[] = [
    ...records.map((r) => ({
      id: r.workerId,
      name: r.worker.name ?? r.worker.email ?? "-",
      dept: canonicalDept(r.dept),
      phone: r.worker.phone,
      email: r.worker.email,
      present: true,
      markedAt: r.markedAt,
      distanceM: r.distanceM,
    })),
    ...workers
      .filter((w) => !present.has(w.id))
      .map((w) => ({ id: w.id, name: w.name ?? w.email ?? "-", dept: canonicalDept(w.dept), phone: w.phone, email: w.email, present: false, markedAt: null, distanceM: null })),
  ];

  const depts = new Map<string, { dept: string; present: number; total: number }>();
  for (const r of rows) {
    const key = r.dept.trim().toLowerCase();
    const d = depts.get(key) ?? { dept: r.dept.trim(), present: 0, total: 0 };
    d.total++;
    if (r.present) d.present++;
    depts.set(key, d);
  }
  const counts = new Map(trend.map((t) => [t.date, t._count._all]));

  return {
    date,
    sundays,
    rows,
    presentCount: records.length,
    expected: rows.length,
    byDept: [...depts.values()].sort((a, b) => b.total - a.total),
    trend: sundays.slice().reverse().map((d) => ({ date: d, count: counts.get(d) ?? 0 })),
    scopedDept: scope ? staff.dept : null,
  };
}
