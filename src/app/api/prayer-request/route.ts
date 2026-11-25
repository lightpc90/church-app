import prisma from "@/lib/prisma";
import { collectionHandlers } from "@/lib/api";
import { schemas } from "@/lib/validation";
import { notifyPrayerRequest } from "@/lib/notify";

const handlers = collectionHandlers(prisma.prayerRequest, schemas.prayerRequest, {
  resource: "prayerRequests",
  publicCreate: true,
  requireConsent: true,
  onCreate: notifyPrayerRequest,
});

export const GET = handlers.GET;
export const POST = handlers.POST;
