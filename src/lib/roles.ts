// Who can do what in the admin dashboard. Pure module: used by server code (API checks,
// page rendering) and client components (hiding buttons). Server checks are the real gate.

export const ROLES = ["superadmin", "admin", "pastor", "hod"] as const;
export type Role = (typeof ROLES)[number];

export const roleLabels: Record<Role, string> = {
  superadmin: "Super admin",
  admin: "Admin",
  pastor: "Pastor",
  hod: "Head of department",
};

export const roleDescriptions: Record<Role, string> = {
  superadmin: "Everything, plus managing the team, notifications and integrations.",
  admin: "Everything on the dashboard, including deleting records. Can't manage the team or notifications.",
  pastor: "Sees prayer requests, testimonies, follow-ups, messages, registrations, workers and attendance, and can mark them handled. Can't delete.",
  hod: "Sees registrations and the workers in their own department, approves their workers and sees their attendance.",
};

export const isRole = (v: unknown): v is Role => typeof v === "string" && (ROLES as readonly string[]).includes(v);

/** Higher wins when someone has several sources of access. */
export const roleRank = (r: Role) => ROLES.length - ROLES.indexOf(r);
export const highestRole = (roles: Role[]) =>
  roles.reduce<Role | null>((best, r) => (!best || roleRank(r) > roleRank(best) ? r : best), null);

export type Resource =
  | "overview"
  | "prayerRequests"
  | "testimonies"
  | "followUps"
  | "enquiries"
  | "registrations"
  | "houseFellowships"
  | "workers"
  | "attendance"
  | "events"
  | "users"
  | "team"
  | "notifications"
  | "integrations";

/** view: read · handle: mark handled / reopen · manage: create, edit, delete */
export type Action = "view" | "handle" | "manage";

const ALL: Action[] = ["view", "handle", "manage"];
const VIEW: Action[] = ["view"];
const PASTORAL: Action[] = ["view", "handle"];

const permissions: Record<Role, Partial<Record<Resource, Action[]>>> = {
  superadmin: {
    overview: VIEW,
    prayerRequests: ALL,
    testimonies: ALL,
    followUps: ALL,
    enquiries: ALL,
    registrations: ALL,
    houseFellowships: ALL,
    workers: ALL,
    attendance: ALL,
    events: ALL,
    users: ALL,
    team: ALL,
    notifications: ALL,
    integrations: ALL,
  },
  admin: {
    overview: VIEW,
    prayerRequests: ALL,
    testimonies: ALL,
    followUps: ALL,
    enquiries: ALL,
    registrations: ALL,
    houseFellowships: ALL,
    workers: ALL,
    attendance: ALL,
    events: ALL,
    users: ALL,
  },
  pastor: {
    overview: VIEW,
    prayerRequests: PASTORAL,
    testimonies: PASTORAL,
    followUps: PASTORAL,
    enquiries: PASTORAL,
    registrations: VIEW,
    houseFellowships: VIEW,
    workers: VIEW,
    attendance: VIEW,
  },
  hod: {
    overview: VIEW,
    registrations: VIEW,
    // "handle" = approve or deactivate workers, limited to their own department (scopes.ts)
    workers: PASTORAL,
    attendance: VIEW,
  },
};

export function can(role: Role | null | undefined, action: Action, resource: Resource) {
  return !!role && !!permissions[role][resource]?.includes(action);
}

/** Maps an admin API collection endpoint to its resource, for client-side button visibility. */
export function resourceForEndpoint(endpoint: string): Resource | null {
  const map: [string, Resource][] = [
    ["/api/prayer-request", "prayerRequests"],
    ["/api/testimony", "testimonies"],
    ["/api/followUps", "followUps"],
    ["/api/enquiry", "enquiries"],
    ["/api/naturalGroups", "registrations"],
    ["/api/ministries", "registrations"],
    ["/api/houseFellowshipCenters", "houseFellowships"],
    ["/api/workers", "workers"],
    ["/api/events", "events"],
    ["/api/users", "users"],
  ];
  return map.find(([prefix]) => endpoint.startsWith(prefix))?.[1] ?? null;
}
