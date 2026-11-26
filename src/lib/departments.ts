// Departments a worker can choose when registering. The church should confirm this list
// (docs/HANDOFF.md). Pure module: used on the server and in the registration form.

export const DEPARTMENTS = [
  "Choir",
  "Media/Technical",
  "Ushering",
  "Protocol",
  "Sanitation",
  "Security",
  "Hospitality",
  "Welfare",
  "Prayer / Intercessory",
  "Evangelism / Follow-up",
  "Sunday School Teachers",
  "Children Ministry",
  "Teens Ministry",
  "Drama",
  "Finance",
] as const;

export const OTHER_DEPARTMENT = "Other";

/**
 * Older names that now belong to a merged department. Stored records keep the name they were saved
 * with; everything that groups, filters or compares departments goes through `canonicalDept`, so no
 * database migration is needed when departments are merged. Add a line here for future merges.
 */
export const DEPARTMENT_ALIASES: Record<string, readonly string[]> = {
  "Media/Technical": ["Media", "Technical / Sound", "Technical", "Sound", "Media / Technical", "Media & Technical"],
};

/** The current name for a department, e.g. "media" or "Technical / Sound" → "Media/Technical". */
export function canonicalDept(name: string): string {
  const trimmed = name.trim();
  const lower = trimmed.toLowerCase();
  for (const [canon, aliases] of Object.entries(DEPARTMENT_ALIASES)) {
    if (canon.toLowerCase() === lower || aliases.some((a) => a.toLowerCase() === lower)) return canon;
  }
  return DEPARTMENTS.find((d) => d.toLowerCase() === lower) ?? trimmed;
}

/** Every stored spelling that means the same department, for database filters. */
export function deptVariants(name: string): string[] {
  const canon = canonicalDept(name);
  return [canon, ...(DEPARTMENT_ALIASES[canon] ?? [])];
}

export const sameDept = (a: string, b: string) => canonicalDept(a).toLowerCase() === canonicalDept(b).toLowerCase();
