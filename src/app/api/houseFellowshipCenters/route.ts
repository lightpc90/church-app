import prisma from "@/lib/prisma";
import { collectionHandlers } from "@/lib/api";
import { schemas } from "@/lib/validation";

const handlers = collectionHandlers(prisma.houseFellowship, schemas.houseFellowship, {
  read: "public",
  create: "admin",
});

export const GET = handlers.GET;
export const POST = handlers.POST;
