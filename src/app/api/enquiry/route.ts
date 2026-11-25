import prisma from "@/lib/prisma";
import { collectionHandlers } from "@/lib/api";
import { schemas } from "@/lib/validation";

const handlers = collectionHandlers(prisma.enquiry, schemas.enquiry, {
  resource: "enquiries",
  publicCreate: true,
});

export const GET = handlers.GET;
export const POST = handlers.POST;
