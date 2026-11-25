import "server-only";
import prisma from "./prisma";

const newestFirst = { orderBy: { createdAt: "desc" as const } };

export const adminQueries = {
  prayerRequests: () => prisma.prayerRequest.findMany(newestFirst),
  testimonies: () => prisma.testimony.findMany(newestFirst),
  enquiries: () => prisma.enquiry.findMany(newestFirst),
  followUps: () => prisma.followUp.findMany(newestFirst),
  workers: () => prisma.worker.findMany({ orderBy: { name: "asc" } }),
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
    ...latestPrayers.map((r) => ({ id: r.id, kind: "Prayer request" as const, name: r.fullname, preview: r.prayerRequest, createdAt: r.createdAt, href: "/admin?menu=prayer-requests" })),
    ...latestTestimonies.map((r) => ({ id: r.id, kind: "Testimony" as const, name: r.fullname, preview: r.testimony, createdAt: r.createdAt, href: "/admin?menu=testimonies" })),
    ...latestFollowUps.map((r) => ({ id: r.id, kind: "New convert" as const, name: r.name, preview: r.address, createdAt: r.createdAt, href: "/admin?menu=follow-up" })),
    ...latestEnquiries.map((r) => ({ id: r.id, kind: "Message" as const, name: r.fullname, preview: r.enquiry, createdAt: r.createdAt, href: "/admin?menu=enquiries" })),
  ]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 6);

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
    workersByDept: workersByDept
      .map((d) => ({ dept: d.dept, count: d._count._all }))
      .sort((a, b) => b.count - a.count),
    registrations: registrationGroups.map((g, i) => ({ key: g.key, label: g.label, count: registrationCounts[i] })),
  };
}
