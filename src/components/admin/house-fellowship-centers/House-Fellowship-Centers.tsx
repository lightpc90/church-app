"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/site/primitives";
import { AdminPanel, AdminSection } from "../AdminCard";
import { DataTable } from "@/components/ui/data-table";
import { houseFellowshipColumns } from "@/components/ui/houseFellowshipColumns";
import { useState, useEffect, useCallback } from "react";
import HouseFellowshipForm from "@/components/UILayouts/HouseFellowshipForm";
import { AnimatePresence } from "framer-motion";
import type { HouseFellowshipType } from "@/components/types/types";

const HouseFellowshipCenters = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<HouseFellowshipType[]>([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/houseFellowshipCenters", { cache: "no-store" });
      const body = await response.json().catch(() => null);
      if (!response.ok || !body?.success) {
        throw new Error(body?.error ?? "Failed to load house fellowship centers");
      }
      setData(body.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load house fellowship centers");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load
    fetchData();
  }, [fetchData]);

  return (
    <AdminSection
      title="House fellowship centers"
      description="Centers listed on the public House Fellowships page."
      action={
        <Button onClick={() => setOpen(true)}>
          <Plus aria-hidden /> Add center
        </Button>
      }
    >
      {error && (
        <p role="alert" className="rounded-2xl bg-red-50 p-4 text-red-900">
          {error}{" "}
          <button type="button" className="font-semibold underline" onClick={fetchData}>
            Retry
          </button>
        </p>
      )}
      <AdminPanel>
        {loading ? (
          <div className="space-y-3" aria-busy="true">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-10 animate-pulse rounded-xl bg-sand" />
            ))}
          </div>
        ) : (
          <DataTable columns={houseFellowshipColumns} data={data} />
        )}
      </AdminPanel>
      <AnimatePresence>
        {open && (
          <HouseFellowshipForm
            setOpen={setOpen}
            onCreated={() => {
              setOpen(false);
              fetchData();
            }}
          />
        )}
      </AnimatePresence>
    </AdminSection>
  );
};

export default HouseFellowshipCenters;
