import prisma from "@/lib/prisma";
import { collectionHandlers } from "@/lib/api";
import { schemas } from "@/lib/validation";
import { workerScope } from "@/lib/scopes";

const handlers = collectionHandlers(prisma.worker, schemas.worker, {
  resource: "workers",
  scope: workerScope,
});

export const GET = handlers.GET;
export const POST = handlers.POST;
