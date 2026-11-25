"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import type { HouseFellowship } from "@prisma/client";
import HouseFellowshipForm from "@/components/UILayouts/HouseFellowshipForm";
import { HouseFellowshipTable } from "../tables";
import { useCan } from "../StaffContext";

export default function HouseFellowshipManager({ data }: { data: HouseFellowship[] }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [, startTransition] = useTransition();
  const canManage = useCan()("manage", "houseFellowships");

  return (
    <>
      <HouseFellowshipTable
        data={data}
        toolbar={
          canManage && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-white transition hover:bg-ink-soft"
            >
              <Plus className="size-4" aria-hidden /> Add center
            </button>
          )
        }
      />
      <AnimatePresence>
        {open && (
          <HouseFellowshipForm
            setOpen={setOpen}
            onCreated={() => {
              setOpen(false);
              startTransition(() => router.refresh());
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
