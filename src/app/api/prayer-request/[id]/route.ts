import prisma from "@/lib/prisma";
import { handledHandler, itemHandlers } from "@/lib/api";
import { schemas } from "@/lib/validation";

const handlers = itemHandlers(prisma.prayerRequest, schemas.prayerRequest, { resource: "prayerRequests" });

export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
export const PATCH = handledHandler(prisma.prayerRequest, "prayerRequests");
