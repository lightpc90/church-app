import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { authorize, fail, json, parseBody, serverError } from "@/lib/api";
import { deskMoment } from "@/lib/desk";
import { lagosParts } from "@/lib/attendance-rules";
import { deskChildMarkSchema, deskUndoSchema } from "@/lib/validation";

// Children's check-in at the children's desk. Any day (children's activities aren't only Sunday
// mornings); one record per child per Lagos date.

export async function POST(req: Request) {
  const { staff, denied } = await authorize("handle", "deskChildren");
  if (denied) return denied;
  const body = await parseBody(req, deskChildMarkSchema);
  if (body.error) return body.error;
  const moment = deskMoment(body.data.markedAt);
  if ("error" in moment) return fail(422, moment.error);

  const child = await prisma.child.findUnique({ where: { id: body.data.childId }, select: { id: true } });
  if (!child) return fail(404, "Child not found");

  const where = { childId_date: { childId: child.id, date: moment.dateKey } };
  try {
    // Works even before the unique index exists: check first, then create.
    const existing = await prisma.childAttendance.findUnique({ where });
    if (existing) return json({ success: true, data: existing, alreadyMarked: true });
    const record = await prisma.childAttendance.create({
      data: { childId: child.id, date: moment.dateKey, markedBy: staff.name, markedAt: moment.at },
    });
    return json({ success: true, data: record }, 201);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return json({ success: true, data: await prisma.childAttendance.findUnique({ where }), alreadyMarked: true });
    }
    return serverError("check child in", e);
  }
}

/** Undo a mistaken check-in, same day only. */
export async function DELETE(req: Request) {
  const { denied } = await authorize("handle", "deskChildren");
  if (denied) return denied;
  const body = await parseBody(req, deskUndoSchema);
  if (body.error) return body.error;
  if (body.data.date !== lagosParts().dateKey) return fail(403, "Only today's check-ins can be undone.");
  await prisma.childAttendance.deleteMany({ where: { childId: body.data.id, date: body.data.date } });
  return json({ success: true });
}
