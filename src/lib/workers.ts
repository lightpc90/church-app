import "server-only";
import { cache } from "react";
import { auth, currentUser } from "@clerk/nextjs/server";
import type { Worker } from "@prisma/client";
import prisma from "./prisma";

export type WorkerStatus = "pending" | "approved" | "inactive";
/** Records created before approval existed have no status: they count as approved. */
export const workerStatus = (w: Pick<Worker, "status">): WorkerStatus =>
  w.status === "pending" || w.status === "inactive" ? w.status : "approved";

export type CurrentWorker =
  | { signedIn: false }
  | {
      signedIn: true;
      userId: string;
      email: string | null;
      phone: string | null;
      name: string;
      image: string | null;
      worker: Worker | null;
    };

/**
 * The signed-in person and their worker record, if any. A record an admin created earlier with
 * the same verified email is linked to this account the first time they visit. Cached per request.
 */
export const getCurrentWorker = cache(async (): Promise<CurrentWorker> => {
  const { userId } = await auth();
  if (!userId) return { signedIn: false };
  const user = await currentUser();
  if (!user) return { signedIn: false };

  const verifiedEmail =
    user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId && e.verification?.status === "verified") ??
    user.emailAddresses.find((e) => e.verification?.status === "verified");
  const verifiedPhone =
    user.phoneNumbers.find((p) => p.id === user.primaryPhoneNumberId && p.verification?.status === "verified") ??
    user.phoneNumbers.find((p) => p.verification?.status === "verified");
  const email = verifiedEmail?.emailAddress.toLowerCase() ?? null;
  const phone = verifiedPhone?.phoneNumber ?? null;

  let worker = await prisma.worker.findFirst({ where: { clerkUserId: userId } });
  if (!worker && email) {
    const legacy = await prisma.worker.findFirst({
      where: { email: { equals: email, mode: "insensitive" }, OR: [{ clerkUserId: null }, { clerkUserId: { isSet: false } }] },
    });
    if (legacy) worker = await prisma.worker.update({ where: { id: legacy.id }, data: { clerkUserId: userId } });
  }

  return {
    signedIn: true,
    userId,
    email,
    phone,
    name: [user.firstName, user.lastName].filter(Boolean).join(" ") || user.username || "",
    image: user.imageUrl ?? null,
    worker,
  };
});
