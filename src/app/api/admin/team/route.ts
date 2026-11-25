import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { authorize, fail, json, parseBody, serverError } from "@/lib/api";
import { memberSchema } from "@/lib/validation";

// Super admins only (the "team" resource). Lists and adds dashboard users by email.


export async function GET() {
  const { denied } = await authorize("view", "team");
  if (denied) return denied;
  try {
    const data = await prisma.teamMember.findMany({ orderBy: { email: "asc" } });
    return json({ success: true, data });
  } catch (e) {
    return serverError("fetch team", e);
  }
}

export async function POST(req: Request) {
  const { staff, denied } = await authorize("manage", "team");
  if (denied) return denied;
  const body = await parseBody(req, memberSchema);
  if (body.error) return body.error;
  const { dept, ...rest } = body.data;
  try {
    const data = await prisma.teamMember.create({
      data: { ...rest, name: rest.name ?? null, dept: rest.role === "hod" ? (dept ?? null) : null, addedBy: staff.name },
    });
    return json({ success: true, data }, 201);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return fail(409, "That email is already on the team. Change their role in the list instead.");
    }
    return serverError("add team member", e);
  }
}
