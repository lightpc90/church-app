import { z } from "zod";
import prisma from "@/lib/prisma";
import { authorize, fail, json, serverError } from "@/lib/api";
import { samePhone } from "@/lib/desk";
import { childDeskSchema } from "@/lib/validation";

// Register a child at the children's desk, with the parent or guardian present.
export async function POST(req: Request) {
  const { denied } = await authorize("handle", "deskChildren");
  if (denied) return denied;
  const raw = await req.json().catch(() => undefined);
  if (raw === undefined) return fail(400, "Request body must be valid JSON");
  const parsed = childDeskSchema.safeParse(raw);
  if (!parsed.success) return fail(422, "Validation failed", z.flattenError(parsed.error).fieldErrors);
  // guardianAgreed is checked by the schema; it isn't stored.
  const data = { ...parsed.data, guardianAgreed: undefined };
  delete data.guardianAgreed;

  // Same child name under the same guardian phone = already registered.
  const sameName = await prisma.child.findMany({
    where: { fullname: { equals: data.fullname, mode: "insensitive" } },
    select: { id: true, guardian_phone: true },
  });
  const dup = sameName.find((c) => samePhone(c.guardian_phone, data.guardian_phone));
  if (dup) return fail(409, `${data.fullname} is already registered with this guardian.`, { existingId: dup.id });

  try {
    const child = await prisma.child.create({ data });
    return json({ success: true, data: child }, 201);
  } catch (e) {
    return serverError("register child", e);
  }
}
