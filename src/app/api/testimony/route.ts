import prisma from "@/lib/prisma";
import { collectionHandlers } from "@/lib/api";
import { schemas } from "@/lib/validation";

const handlers = collectionHandlers(prisma.testimony, schemas.testimony, {
  resource: "testimonies",
  publicCreate: true,
  requireConsent: true,
});

export const GET = handlers.GET;
export const POST = handlers.POST;
