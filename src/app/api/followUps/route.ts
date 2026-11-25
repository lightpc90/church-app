import prisma from "@/lib/prisma";
import { collectionHandlers } from "@/lib/api";
import { schemas } from "@/lib/validation";
import { notifyNewConvert } from "@/lib/notify";

const handlers = collectionHandlers(prisma.followUp, schemas.followUp, {
  resource: "followUps",
  publicCreate: true,
  onCreate: notifyNewConvert,
});

export const GET = handlers.GET;
export const POST = handlers.POST;
