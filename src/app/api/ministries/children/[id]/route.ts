import prisma from "@/lib/prisma";
import { itemHandlers } from "@/lib/api";
import { schemas } from "@/lib/validation";

const handlers = itemHandlers(prisma.child, schemas.child, { resource: "registrations" });

export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
