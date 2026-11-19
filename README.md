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

Create `.env.local`:

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | yes | MongoDB connection string (Prisma) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | yes | Clerk |
| `CLERK_SECRET_KEY` | yes | Clerk |
| `ADMIN_EMAILS` | for admin | Comma-separated emails allowed into `/admin` and admin APIs |
| `NEXT_PUBLIC_API_KEY` | yes | Google Maps (browser). Also used for YouTube if `YOUTUBE_API_KEY` is unset |
| `YOUTUBE_API_KEY` | recommended | Server-only YouTube Data API key (keeps it out of the browser bundle) |
| `INSTAGRAM_ACCESS_TOKEN` | optional | Instagram feed on the home page |

## Admin access

Signing in is not enough to reach `/admin`, since anyone can create an account from the navbar.
A user is an admin when **either**:

- their Clerk user has `publicMetadata.role = "admin"` (Clerk dashboard → Users → Metadata), or
- one of their verified email addresses is listed in `ADMIN_EMAILS`.

## API access rules

All model routes share one implementation (`src/lib/api.ts`) with Zod validation (`src/lib/validation.ts`).

| Routes | Read (GET) | Create (POST) | Update / delete |
| --- | --- | --- | --- |
| prayer-request, testimony, enquiry, followUps, naturalGroups/*, ministries/* | admin | public | admin |
| events, houseFellowshipCenters | public | admin | admin |
| workers, users | admin | admin | admin |
