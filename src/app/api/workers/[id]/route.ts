import prisma from "@/lib/prisma";
import { OBJECT_ID, authorize, fail, itemHandlers, json, parseBody, serverError, type IdContext } from "@/lib/api";
import { schemas, workerStatusSchema } from "@/lib/validation";
import { workerScope } from "@/lib/scopes";

const handlers = itemHandlers(prisma.worker, schemas.worker, { resource: "workers",
  scope: workerScope });

export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;

/** Approve, re-open or deactivate a worker. HODs can only do this for their own department. */
export async function PATCH(req: Request, ctx: IdContext) {
  const { staff, denied } = await authorize("handle", "workers");
  if (denied) return denied;
  const { id } = await ctx.params;
  if (!OBJECT_ID.test(id)) return fail(404, "Not found");
  const body = await parseBody(req, workerStatusSchema);
  if (body.error) return body.error;

  const worker = await prisma.worker.findUnique({ where: { id } });
  if (!worker) return fail(404, "Not found");
  if (staff.role === "hod") {
    const sameDept = !!staff.dept && staff.dept.trim().toLowerCase() === worker.dept.trim().toLowerCase();
    if (!sameDept) return fail(403, "You can only approve workers in your own department.");
  }

  const { status } = body.data;
  try {
    const data = await prisma.worker.update({
      where: { id },
      data: status === "approved" ? { status, approvedBy: staff.name, approvedAt: new Date() } : { status },
    });
    return json({ success: true, data });
  } catch (e) {
    return serverError("update worker", e);
  }
}
