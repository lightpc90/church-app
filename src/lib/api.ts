import "server-only";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { getAdmin } from "./auth";

/**
 * Shared CRUD route-handler factory.
 *
 * Every model route used to be a hand-copied file that: had no auth (anyone could list or
 * delete prayer requests, workers, users…), wrote the raw request body straight into
 * Prisma, crashed with a 500 on malformed JSON or a malformed id, and never sorted results.
 * This centralises those concerns.
 */

type Access = "public" | "admin";

export type Policy = {
  /** GET list and GET by id */
  read: Access;
  /** POST */
  create: Access;
  /** PUT / DELETE are always admin-only */
};

// Minimal structural type covering the Prisma delegate methods we use.
type Delegate = {
  findMany(args: { orderBy: { createdAt: "desc" } }): Promise<unknown[]>;
  findUnique(args: { where: { id: string } }): Promise<unknown | null>;
  create(args: { data: never }): Promise<unknown>;
  update(args: { where: { id: string }; data: never }): Promise<unknown>;
  delete(args: { where: { id: string } }): Promise<unknown>;
};

type IdContext = { params: Promise<{ id: string }> };

const OBJECT_ID = /^[a-f0-9]{24}$/i;

const json = (body: unknown, status = 200) => NextResponse.json(body, { status });

const fail = (status: number, error: string, details?: unknown) =>
  json({ success: false, error, ...(details ? { details } : {}) }, status);

async function authorize(access: Access) {
  if (access === "public") return null;
  const { status } = await getAdmin();
  if (status === "unauthenticated") return fail(401, "Sign in required");
  if (status === "forbidden") return fail(403, "Admin access required");
  return null;
}

async function parseBody(req: Request, schema: z.ZodType, partial = false) {
  const raw = await req.json().catch(() => undefined);
  if (raw === undefined) return { error: fail(400, "Request body must be valid JSON") };

  const effective: z.ZodType =
    partial && schema instanceof z.ZodObject ? schema.partial() : schema;
  const parsed = effective.safeParse(raw);
  if (!parsed.success) {
    return { error: fail(422, "Validation failed", z.flattenError(parsed.error).fieldErrors) };
  }
  return { data: parsed.data as never };
}

function serverError(action: string, e: unknown) {
  console.error(`[api] ${action} failed:`, e);
  return fail(500, `Failed to ${action}`);
}

function isNotFound(e: unknown) {
  return e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025";
}

export function collectionHandlers(model: Delegate, schema: z.ZodType, policy: Policy) {
  async function GET() {
    const denied = await authorize(policy.read);
    if (denied) return denied;
    try {
      const data = await model.findMany({ orderBy: { createdAt: "desc" } });
      return json({ success: true, data });
    } catch (e) {
      return serverError("fetch data", e);
    }
  }

  async function POST(req: Request) {
    const denied = await authorize(policy.create);
    if (denied) return denied;
    const body = await parseBody(req, schema);
    if (body.error) return body.error;
    try {
      const data = await model.create({ data: body.data });
      return json({ success: true, data }, 201);
    } catch (e) {
      return serverError("create record", e);
    }
  }

  return { GET, POST };
}

export function itemHandlers(model: Delegate, schema: z.ZodType, policy: Pick<Policy, "read">) {
  async function resolveId(ctx: IdContext) {
    const { id } = await ctx.params;
    return OBJECT_ID.test(id) ? id : null;
  }

  async function GET(_req: Request, ctx: IdContext) {
    const denied = await authorize(policy.read);
    if (denied) return denied;
    const id = await resolveId(ctx);
    if (!id) return fail(404, "Not found");
    try {
      const data = await model.findUnique({ where: { id } });
      return data ? json({ success: true, data }) : fail(404, "Not found");
    } catch (e) {
      return serverError("fetch record", e);
    }
  }

  async function PUT(req: Request, ctx: IdContext) {
    const denied = await authorize("admin");
    if (denied) return denied;
    const id = await resolveId(ctx);
    if (!id) return fail(404, "Not found");
    const body = await parseBody(req, schema, true);
    if (body.error) return body.error;
    try {
      const data = await model.update({ where: { id }, data: body.data });
      return json({ success: true, data });
    } catch (e) {
      return isNotFound(e) ? fail(404, "Not found") : serverError("update record", e);
    }
  }

  async function DELETE(_req: Request, ctx: IdContext) {
    const denied = await authorize("admin");
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
export function handledHandler(model: HandledDelegate) {
  return async function PATCH(req: Request, ctx: IdContext) {
    const admin = await getAdmin();
    if (admin.status === "unauthenticated") return fail(401, "Sign in required");
    if (admin.status === "forbidden") return fail(403, "Admin access required");

    const { id } = await ctx.params;
    if (!OBJECT_ID.test(id)) return fail(404, "Not found");
    const body = await parseBody(req, handledBody);
    if (body.error) return body.error;
    const { handled } = body.data as z.infer<typeof handledBody>;

    try {
      const data = await model.update({
        where: { id },
        data: handled
          ? { handledAt: new Date(), handledBy: admin.name ?? "An admin" }
          : { handledAt: null, handledBy: null },
      });
      return json({ success: true, data });
    } catch (e) {
      return isNotFound(e) ? fail(404, "Not found") : serverError("update record", e);
    }
  };
}
