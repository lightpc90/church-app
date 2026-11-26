# RCCG Beautiful Gate Parish — website

Next.js 16 (App Router) · React 19 · Clerk auth · Prisma 6 + MongoDB · Tailwind CSS 4.

Design tokens (colours, fonts, radii) live in `src/app/globals.css`; church details, service times and navigation live in `src/lib/site.ts`; shared UI primitives are in `src/components/site/`.

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | `prisma generate` + production build |
| `npm run lint` | ESLint (flat config, `eslint.config.mjs`) |
| `npm run typecheck` | TypeScript, no emit |

## Environment variables

Copy `.env.example` to `.env` (gitignored) and fill it in:

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | yes | MongoDB connection string (Prisma) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | yes | Clerk |
| `CLERK_SECRET_KEY` | yes | Clerk |
| `SUPER_ADMIN_EMAILS` | yes | Comma-separated emails that are always super admins (manage the team and notifications) |
| `ADMIN_EMAILS` | optional | Comma-separated emails that are always admins |
| `RESEND_API_KEY` | for email alerts | [Resend](https://resend.com) **sending-only** API key, restricted to your domain |
| `NOTIFY_EMAIL_FROM` | for email alerts | Sender, e.g. `RCCG Beautiful Gate <alerts@mail.your-domain>`. Before the domain is verified: `… <onboarding@resend.dev>` (only delivers to the Resend account's own email) |
| `NOTIFY_PRAYER_EMAILS`, `NOTIFY_CONVERT_EMAILS` | optional | Default recipients (comma separated); a list saved on the Notifications tab replaces them |
| `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_FROM` | optional | Paid WhatsApp fallback. Free WhatsApp (CallMeBot) needs no server setup |
| `CRON_SECRET` | for Instagram | Random string; Vercel Cron sends it to `/api/cron/instagram-refresh` |
| `TWILIO_PRAYER_TEMPLATE_SID`, `TWILIO_CONVERT_TEMPLATE_SID` | optional | Meta-approved Twilio templates (`{{1}}` name, `{{2}}` phone, `{{3}}` request/address) |
| `NEXT_PUBLIC_API_KEY` | yes | Google Maps (browser). Also used for YouTube if `YOUTUBE_API_KEY` is unset |
| `YOUTUBE_API_KEY` | recommended | Server-only YouTube Data API key (keeps it out of the browser bundle) |
| `INSTAGRAM_ACCESS_TOKEN` | optional | Instagram feed on the home page |

## Dashboard access and roles

Signing in is not enough to reach `/admin`, since anyone can create an account from the navbar.
Each person gets one of four roles (defined in `src/lib/roles.ts`):

| Role | Can |
| --- | --- |
| Super admin | Everything, plus the **Team & Roles** and **Notifications** tabs |
| Admin | Everything else, including deleting records and managing house fellowships |
| Pastor | See prayer requests, testimonies, follow-ups, messages, registrations, workers, house fellowships; mark items handled. No deleting |
| HOD | See registrations, and workers in their own department (if one is set) |

A role comes from any of these (highest wins), matched on the user's **verified** Clerk emails:

- `SUPER_ADMIN_EMAILS` / `ADMIN_EMAILS` env vars (can't be changed from the dashboard, so nobody gets locked out),
- the **Team & Roles** tab (super admins add people by email; they don't need an account yet),
- Clerk `publicMetadata.role` set to `superadmin`, `admin`, `pastor` or `hod`.

## Notifications

Super admins set these on the **Notifications** tab: WhatsApp alerts on/off, email alerts on/off, the
WhatsApp number and email addresses for new prayer requests, and for new converts. Alerts are sent
after the form response (Next `after()`), so a slow provider never slows down the form.

- **WhatsApp (free)**: [CallMeBot](https://www.callmebot.com/blog/free-api-whatsapp-messages/). The
  owner of each receiving number sends the bot "I allow callmebot to send me messages" once and gets an
  API key, which is saved next to the number. Prayer request text is left out of WhatsApp unless the
  super admin opts in (it passes through a third party).
- **Email**: Resend's official SDK (`src/lib/email.ts`, `sendNotification`). Each event is sent with an
  idempotency key (`prayer-request/<id>`, `new-convert/<id>`), so a repeat within 24 hours is delivered
  once. Network errors, 429s (honouring `retry-after`) and 5xx are retried up to 4 times with backoff;
  other 4xx errors and quota errors aren't. Sent email IDs are logged as `[email] sent <id>`.
- Failures show as a banner on the Notifications tab; "Send test" buttons check each channel.

## Workers and Sunday attendance

- `/workers` routes people: signed out → sign in / create account (Clerk: **email or Google**; phone
  sign-in is deliberately off, since Clerk charges for SMS in production; workers give their phone number
  on the registration form instead); signed in but not registered → `/workers/register`; registered →
  `/workers/dashboard`.
- Registration (`PUT /api/workers/me`): name, phone, department, gender, optional birthday/area/serving
  since. Email comes from the Clerk account. New workers are **pending** until an admin, or the HOD of
  that department, approves them (Workers tab). Changing department needs re-approval. An earlier
  admin-created worker record with the same verified email is linked automatically.
- Attendance (`/workers/attendance`, `POST /api/workers/attendance`): approved workers only, **Sundays
  6:30–8:00 AM Lagos time**, within **100 m** of `site.coordinates`, GPS accuracy ≤ 100 m. Opening the
  page during the window checks in automatically. One record per worker per Sunday; only the distance
  and accuracy are stored, not coordinates. Rules live in `src/lib/attendance-rules.ts`.
- Departments: `src/lib/departments.ts`. To merge departments, add the old names to `DEPARTMENT_ALIASES`;
  stored records keep their name and are mapped everywhere (HOD scope, approvals, reports), so no data
  migration is needed. Media and Technical / Sound are merged into **Media/Technical**.
- Dashboard **Attendance** tab: per Sunday, present / no check-in, by department, last 12 Sundays, CSV.
  HODs see their department only. Departments are listed in `src/lib/departments.ts`.
- Limitation: a determined person can fake their phone's location; HODs should sanity-check.

## Instagram feed

Uses the Instagram API with Instagram Login (`graph.instagram.com`). `INSTAGRAM_ACCESS_TOKEN` is the
starting long-lived token; a weekly Vercel Cron job (`vercel.json` → `/api/cron/instagram-refresh`,
protected by `CRON_SECRET`) renews it and stores it in the `IntegrationToken` collection, so it no
longer expires after 60 days. Changing the env token replaces the stored one.
Super admins can paste a new token on the dashboard's **Integrations** tab (checked with Instagram, stored,
never shown again) and renew it on demand.

## Privacy and cookies

- `/privacy` and `/cookies` (linked in the footer, with a **Cookie settings** button).
- First-visit consent banner (`src/components/consent/`): **Essential** (Clerk sign-in, the `bg_consent`
  cookie, 6 months) is always on; **Videos and maps** (YouTube, Google Maps) is opt-in. Until then,
  embeds show a placeholder with "play once" / "always allow". There are no analytics or ad cookies:
  if you add any, add a consent category, update `/cookies` and bump `VERSION` in `ConsentProvider`.
- Forms that collect faith or children's data have a required consent checkbox, also enforced by the
  API (`requireConsent` in `src/lib/api.ts`); the contact form shows a short privacy note instead.

## API access rules

All model routes share one implementation (`src/lib/api.ts`) with Zod validation (`src/lib/validation.ts`).
Each route names its resource; what each role may do is in `src/lib/roles.ts`.

| Routes | Read (GET) | Create (POST) | Update / delete |
| --- | --- | --- | --- |
| prayer-request, testimony, enquiry, followUps, naturalGroups/*, ministries/* | by role | public | admin+ |
| events, houseFellowshipCenters | public | admin+ | admin+ |
| workers, users | by role | admin+ | admin+ |
| `PATCH` prayer-request, followUps, enquiry (mark handled) | | | pastor+ |
| admin/team, admin/notifications | super admin | super admin | super admin |

## Admin dashboard

`/admin` reads straight from the database; each role sees only its tabs:

- **Overview**: totals, new this week, submissions per week, latest activity
- **Prayer Requests, Testimonies, Follow Up, Messages**: everything submitted through the website forms
- **Registrations**: natural groups and ministries (children shown with their guardian)
- **House Fellowships**: add and remove centers shown on the public page
- **Workers**
- **Team & Roles**, **Notifications** (super admins)

Every table supports search, sorting, CSV export (opens in Excel), reading the full message, and
call / WhatsApp / email / delete actions per row. Deletes go through the admin-only API.
