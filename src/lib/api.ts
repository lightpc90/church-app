import "server-only";
import { NextResponse, after } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { getStaff, type StaffMember } from "./auth";
import { can, type Action, type Resource } from "./roles";

/**
 * Shared CRUD route-handler factory.
 *
 * Every model route used to be a hand-copied file that: had no auth (anyone could list or
 * delete prayer requests, workers, users…), wrote the raw request body straight into
 * Prisma, crashed with a 500 on malformed JSON or a malformed id, and never sorted results.
 * This centralises those concerns. Who may do what is defined in `roles.ts`.
 */

export type Policy = {
  resource: Resource;
  /** GET list and GET by id without signing in (events, house fellowships) */
  publicRead?: boolean;
  /** POST without signing in (public forms) */
  publicCreate?: boolean;
  /** Extra filter for some roles, e.g. HODs only see workers in their department */
  scope?: (staff: StaffMember) => Record<string, unknown> | undefined;
  /** Runs after the response is sent, e.g. notifications */
  onCreate?: (record: unknown) => Promise<unknown>;
  /**
   * Public forms that collect sensitive data (faith, children) must send `consent: true`, from the
   * form's consent checkbox. Not stored: a record only exists if consent was given.
   */
  requireConsent?: boolean;
};

// Minimal structural type covering the Prisma delegate methods we use.
type Delegate = {
  findMany(args: { where?: object; orderBy: { createdAt: "desc" } }): Promise<unknown[]>;
  findFirst(args: { where: { id: string } }): Promise<unknown | null>;
  create(args: { data: never }): Promise<unknown>;
  update(args: { where: { id: string }; data: never }): Promise<unknown>;
  delete(args: { where: { id: string } }): Promise<unknown>;
};

export type IdContext = { params: Promise<{ id: string }> };

export const OBJECT_ID = /^[a-f0-9]{24}$/i;

export const json = (body: unknown, status = 200) => NextResponse.json(body, { status });

export const fail = (status: number, error: string, details?: unknown) =>
  json({ success: false, error, ...(details ? { details } : {}) }, status);

/** Returns the signed-in staff member if they may do `action` on `resource`, else an error response. */
export async function authorize(
  action: Action,
  resource: Resource
): Promise<{ staff: StaffMember; denied?: never } | { staff?: never; denied: NextResponse }> {
  const staff = await getStaff();
  if (staff.status === "unauthenticated") return { denied: fail(401, "Sign in required") };
  if (staff.status !== "ok" || !can(staff.role, action, resource)) {
    return { denied: fail(403, "You don't have permission to do that") };
  }
  return { staff };
}

type Parsed<S extends z.ZodType> = { data: z.infer<S>; error?: never } | { data?: never; error: NextResponse };

export async function parseBody<S extends z.ZodType>(req: Request, schema: S, partial = false): Promise<Parsed<S>> {
  const raw = await req.json().catch(() => undefined);
  if (raw === undefined) return { error: fail(400, "Request body must be valid JSON") };
  return validate(raw, schema, partial);
}

function validate<S extends z.ZodType>(raw: unknown, schema: S, partial = false): Parsed<S> {
  const effective: z.ZodType = partial && schema instanceof z.ZodObject ? schema.partial() : schema;
  const parsed = effective.safeParse(raw);
  if (!parsed.success) {
    return { error: fail(422, "Validation failed", z.flattenError(parsed.error).fieldErrors) };
  }
  return { data: parsed.data as z.infer<S> };
}

export function serverError(action: string, e: unknown) {
  console.error(`[api] ${action} failed:`, e);
  return fail(500, `Failed to ${action}`);
}

export function isNotFound(e: unknown) {
  return e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025";
}

export function collectionHandlers(model: Delegate, schema: z.ZodType, policy: Policy) {
  async function GET() {
    let where: object | undefined;
    if (!policy.publicRead) {
      const { staff, denied } = await authorize("view", policy.resource);
      if (denied) return denied;
      where = policy.scope?.(staff);
    }
    try {
      const data = await model.findMany({ ...(where ? { where } : {}), orderBy: { createdAt: "desc" } });
      return json({ success: true, data });
    } catch (e) {
      return serverError("fetch data", e);
    }
  }

  async function POST(req: Request) {
    if (!policy.publicCreate) {
      const { denied } = await authorize("manage", policy.resource);
      if (denied) return denied;
    }
    const raw = await req.json().catch(() => undefined);
    if (raw === undefined) return fail(400, "Request body must be valid JSON");
    if (policy.requireConsent) {
      const consent = (raw as { consent?: unknown } | null)?.consent;
      if (consent !== true && consent !== "true") {
        return fail(422, "Validation failed", { consent: ["Please tick the box to agree before sending."] });
      }
    }
    // Unknown keys (including `consent`) are stripped by the schema.
    const body = validate(raw, schema);
    if (body.error) return body.error;
    try {
      const data = await model.create({ data: body.data as never });
      if (policy.onCreate) {
        const notify = policy.onCreate;
        after(() => notify(data).catch((e) => console.error(`[api] after-create hook failed:`, e)));
      }
      return json({ success: true, data }, 201);
    } catch (e) {
      return serverError("create record", e);
    }
  }

  return { GET, POST };
}

export function itemHandlers(model: Delegate, schema: z.ZodType, policy: Pick<Policy, "resource" | "publicRead" | "scope">) {
  async function resolveId(ctx: IdContext) {
    const { id } = await ctx.params;
    return OBJECT_ID.test(id) ? id : null;
  }

  async function GET(_req: Request, ctx: IdContext) {
    let scope: object | undefined;
    if (!policy.publicRead) {
      const { staff, denied } = await authorize("view", policy.resource);
      if (denied) return denied;
      scope = policy.scope?.(staff);
    }
    const id = await resolveId(ctx);
    if (!id) return fail(404, "Not found");
    try {
      const data = await model.findFirst({ where: { ...scope, id } });
      return data ? json({ success: true, data }) : fail(404, "Not found");
    } catch (e) {
      return serverError("fetch record", e);
    }
  }

  async function PUT(req: Request, ctx: IdContext) {
    const { denied } = await authorize("manage", policy.resource);
    if (denied) return denied;
    const id = await resolveId(ctx);
    if (!id) return fail(404, "Not found");
    const body = await parseBody(req, schema, true);
    if (body.error) return body.error;
    try {
      const data = await model.update({ where: { id }, data: body.data as never });
      return json({ success: true, data });
    } catch (e) {
      return isNotFound(e) ? fail(404, "Not found") : serverError("update record", e);
    }
  }

  async function DELETE(_req: Request, ctx: IdContext) {
    const { denied } = await authorize("manage", policy.resource);
    if (denied) return denied;
    const id = await resolveId(ctx);
    if (!id) return fail(404, "Not found");
    try {
      await model.delete({ where: { id } });
      return json({ success: true });
    } catch (e) {
      return isNotFound(e) ? fail(404, "Not found") : serverError("delete record", e);
    }
  }

  return { GET, PUT, DELETE };
}

type HandledDelegate = {
  update(args: {
    where: { id: string };
    data: { handledAt: Date | null; handledBy: string | null };
  }): Promise<unknown>;
};

const handledBody = z.object({ handled: z.boolean() });

/**
 * PATCH /api/…/[id] with `{ "handled": true | false }`: marks a prayer request, follow-up or
 * message as dealt with (or re-opens it). Who and when are taken from the session, never the body.
 */
export function handledHandler(model: HandledDelegate, resource: Resource) {
  return async function PATCH(req: Request, ctx: IdContext) {
    const { staff, denied } = await authorize("handle", resource);
    if (denied) return denied;

    const { id } = await ctx.params;
    if (!OBJECT_ID.test(id)) return fail(404, "Not found");
    const body = await parseBody(req, handledBody);
    if (body.error) return body.error;

    try {
      const data = await model.update({
        where: { id },
        data: body.data.handled ? { handledAt: new Date(), handledBy: staff.name } : { handledAt: null, handledBy: null },
      });
      return json({ success: true, data });
    } catch (e) {
      return isNotFound(e) ? fail(404, "Not found") : serverError("update record", e);
    }
  };
}
