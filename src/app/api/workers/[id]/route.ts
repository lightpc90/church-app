import prisma from "@/lib/prisma";
import { itemHandlers } from "@/lib/api";
import { schemas } from "@/lib/validation";
import { workerScope } from "@/lib/scopes";

const handlers = itemHandlers(prisma.worker, schemas.worker, { resource: "workers",
  scope: workerScope });

export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
