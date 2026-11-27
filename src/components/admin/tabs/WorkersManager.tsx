"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Worker } from "@prisma/client";
import { UserPlus } from "lucide-react";
import { WorkersTable } from "../tables";
import { Dialog } from "../table/cells";
import WorkerQuickForm from "../../desk/WorkerQuickForm";

/** Workers tab: the table plus "Add worker" (by phone, for people without email). */
export default function WorkersManager({ data, canAdd, defaultDept }: { data: Worker[]; canAdd: boolean; defaultDept: string | null }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();
  return (
    <>
      <WorkersTable
        data={data}
        toolbar={
          canAdd && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-white transition hover:bg-ink-soft"
            >
              <UserPlus className="size-4" aria-hidden /> Add worker
            </button>
          )
        }
      />
      <Dialog open={open} onClose={() => setOpen(false)} title="Add a worker">
        <p className="mb-4 text-sm text-stone">
          For workers without an email address. Register them with their phone number; they&apos;re approved straight
          away and can be checked in at the workers&apos; desk.
        </p>
        <WorkerQuickForm
          defaultDept={defaultDept}
          onCreated={() => {
            setOpen(false);
            startTransition(() => router.refresh());
          }}
        />
      </Dialog>
    </>
  );
}
