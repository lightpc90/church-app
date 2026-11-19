import { z } from "zod";

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
