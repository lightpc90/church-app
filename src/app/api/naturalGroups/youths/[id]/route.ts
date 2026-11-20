import prisma from "@/lib/prisma";
import { itemHandlers } from "@/lib/api";
import { schemas } from "@/lib/validation";

const handlers = itemHandlers(prisma.youth, schemas.youth, { read: "admin" });

export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
