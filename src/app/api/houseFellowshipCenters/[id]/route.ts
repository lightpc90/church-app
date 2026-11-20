import prisma from "@/lib/prisma";
import { itemHandlers } from "@/lib/api";
import { schemas } from "@/lib/validation";

const handlers = itemHandlers(prisma.houseFellowship, schemas.houseFellowship, { read: "public" });

export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
