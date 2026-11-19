import prisma from "@/lib/prisma";
import { collectionHandlers } from "@/lib/api";
import { schemas } from "@/lib/validation";

const handlers = collectionHandlers(prisma.prayerRequest, schemas.prayerRequest, {
  read: "admin",
  create: "public",
});

export const GET = handlers.GET;
export const POST = handlers.POST;
