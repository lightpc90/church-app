import { z } from "zod";
import { ROLES } from "./roles";

const text = (max = 200) => z.string().trim().min(1, "Required").max(max);

// Phone numbers are stored as strings so leading zeros (e.g. 0812...) and "+234" survive.
const phone = z
  .string()
  .trim()
  .regex(/^\+?[0-9\s-]{7,20}$/, "Enter a valid phone number");

const optionalPhone = z
  .union([phone, z.literal("")])
  .optional()
  .transform((v) => v || undefined);

// Empty string from a form field means "not provided".
const optionalEmail = z
  .union([z.email("Enter a valid email").max(200), z.literal("")])
  .optional()
  .transform((v) => v || undefined);

const gender = z.enum(["male", "female"], "Select a gender");

export const schemas = {
  prayerRequest: z.object({
    fullname: text(),
    phone,
    email: optionalEmail,
    prayerRequest: text(5000),
  }),
  testimony: z.object({
    fullname: text(),
    phone,
    email: optionalEmail,
    testimony: text(5000),
  }),
  enquiry: z.object({
    fullname: text(),
    phone,
    email: optionalEmail,
    enquiry: text(5000),
  }),
  followUp: z.object({
    name: text(),
    phone,
    email: optionalEmail,
    address: text(500),
  }),
  houseFellowship: z.object({
    center: text(),
    address: text(500),
    zone: text(),
    teacher: text(),
    teacher_phone: optionalPhone,
    host: text(),
    host_phone: optionalPhone,
  }),
  event: z.object({
    name: text(),
    desc: text(5000),
    venue: text(),
    // ISO-like datetime string from <input type="datetime-local">
    datetime: z
      .string()
      .trim()
      .refine((v) => !Number.isNaN(Date.parse(v)), "Enter a valid date and time"),
    reglink: z.union([z.url(), z.literal("")]).optional().transform((v) => v || undefined),
    image: z.union([z.url(), z.literal("")]).optional().transform((v) => v || undefined),
  }),
  elder: z.object({ fullname: text(), phone, email: optionalEmail, gender }),
  men: z.object({ fullname: text(), phone, email: optionalEmail }),
  women: z.object({ fullname: text(), phone, email: optionalEmail }),
  youth: z.object({ fullname: text(), phone, email: optionalEmail, gender }),
  teen: z.object({ fullname: text(), phone, email: optionalEmail, gender }),
  child: z.object({
    fullname: text(),
    gender,
    dob: z
      .string()
      .trim()
      .refine((v) => !Number.isNaN(Date.parse(v)), "Enter a valid date of birth"),
    guardian_fullname: text(),
    guardian_phone: phone,
    guardian_email: optionalEmail,
    guardian_gender: gender,
  }),
  worker: z.object({
    email: z.email().max(200),
    name: text().optional(),
    username: text().optional(),
    image: z.url().optional(),
    phone: optionalPhone,
    dept: text(),
  }),
  user: z.object({
    email: z.email().max(200),
    name: text().optional(),
    username: text().optional(),
    image: z.url().optional(),
    phone: optionalPhone,
  }),
} as const;

export type SchemaName = keyof typeof schemas;
export type FormInput<K extends SchemaName> = z.input<(typeof schemas)[K]>;

/** Team & Roles tab: a dashboard user. Empty name/dept mean "not set"; omitted means "unchanged". */
const optionalText = z
  .string()
  .trim()
  .max(120)
  .optional()
  .transform((v) => (v === undefined ? undefined : v || null));

export const memberSchema = z.object({
  email: z.string().trim().toLowerCase().max(200).pipe(z.email("Enter a valid email")),
  name: optionalText,
  role: z.enum(ROLES, "Choose a role"),
  dept: optionalText,
});

export const memberUpdateSchema = memberSchema.omit({ email: true }).partial();

/** Workers' self-registration on /workers. Email comes from the signed-in account, never the form. */
export const workerSelfSchema = z
  .object({
    name: text(120),
    phone,
    dept: text(80),
    deptOther: z.string().trim().max(80).optional(),
    gender: z.enum(["male", "female"], "Select a gender"),
    birthday: z
      .union([z.string().regex(/^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, "Choose a valid day and month"), z.literal("")])
      .optional()
      .transform((v) => v || null),
    area: z.string().trim().max(80).optional().transform((v) => v || null),
    servingSince: z
      .union([z.coerce.number().int().min(1952).max(new Date().getFullYear()), z.literal("")])
      .optional()
      .transform((v) => (v === "" || v === undefined ? null : v)),
  })
  .transform(({ deptOther, ...w }) => ({ ...w, dept: w.dept === "Other" && deptOther ? deptOther : w.dept }))
  .refine((w) => w.dept !== "Other", { message: "Tell us which department", path: ["deptOther"] });

export const attendanceMarkSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  accuracy: z.number().min(0).max(100_000),
});

export const workerStatusSchema = z.object({ status: z.enum(["approved", "pending", "inactive"]) });

/** A worker added by an admin, HOD or the workers' desk (people without email). */
export const workerAddSchema = z
  .object({
    name: text(120),
    phone,
    email: optionalEmail,
    dept: text(80),
    deptOther: z.string().trim().max(80).optional(),
    gender: z.enum(["male", "female"], "Select a gender"),
    area: z.string().trim().max(80).optional().transform((v) => v || null),
  })
  .transform(({ deptOther, ...w }) => ({ ...w, dept: w.dept === "Other" && deptOther ? deptOther : w.dept }))
  .refine((w) => w.dept !== "Other", { message: "Tell us which department", path: ["deptOther"] });

const objectId = z.string().regex(/^[a-f0-9]{24}$/i, "Invalid id");
/** When a desk device was offline, it sends the time the check-in actually happened. */
const markedAt = z.iso.datetime({ offset: true }).optional();

export const deskWorkerMarkSchema = z.object({ workerId: objectId, markedAt });
export const deskChildMarkSchema = z.object({ childId: objectId, markedAt });
export const deskUndoSchema = z.object({ id: objectId, date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) });

/** A child registered at the children's desk, with the parent or guardian present. */
export const childDeskSchema = schemas.child.extend({
  guardianAgreed: z.literal(true, "Confirm the parent or guardian agreed"),
});
