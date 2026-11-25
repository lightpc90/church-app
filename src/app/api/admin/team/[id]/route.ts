import prisma from "@/lib/prisma";
import { OBJECT_ID, authorize, fail, isNotFound, json, parseBody, serverError, type IdContext } from "@/lib/api";
import { memberUpdateSchema as updateSchema } from "@/lib/validation";

async function target(ctx: IdContext) {
  const { id } = await ctx.params;
  if (!OBJECT_ID.test(id)) return null;
  return prisma.teamMember.findUnique({ where: { id } });
}

export async function PATCH(req: Request, ctx: IdContext) {
  const { staff, denied } = await authorize("manage", "team");
  if (denied) return denied;
  const member = await target(ctx);
  if (!member) return fail(404, "Not found");
  // Stops a super admin from accidentally locking themselves out.
  if (member.email === staff.email) return fail(400, "You can't change your own role. Ask another super admin.");
  const body = await parseBody(req, updateSchema);
  if (body.error) return body.error;
  const role = body.data.role ?? member.role;
  try {
    const data = await prisma.teamMember.update({
      where: { id: member.id },
      data: {
        ...body.data,
        dept: role === "hod" ? (body.data.dept !== undefined ? body.data.dept : member.dept) : null,
        name: body.data.name !== undefined ? body.data.name : member.name,
      },
    });
    return json({ success: true, data });
  } catch (e) {
    return isNotFound(e) ? fail(404, "Not found") : serverError("update team member", e);
  }
}

export async function DELETE(_req: Request, ctx: IdContext) {
  const { staff, denied } = await authorize("manage", "team");
  if (denied) return denied;
  const member = await target(ctx);
  if (!member) return fail(404, "Not found");
  if (member.email === staff.email) return fail(400, "You can't remove yourself. Ask another super admin.");
  try {
    await prisma.teamMember.delete({ where: { id: member.id } });
    return json({ success: true });
  } catch (e) {
    return isNotFound(e) ? fail(404, "Not found") : serverError("remove team member", e);
  }
}
