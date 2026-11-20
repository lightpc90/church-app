"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import HfcLayout from "./HfcLayout";
import { groupedByZone } from "@/lib/groupedByZone";
import { fieldClass } from "@/components/forms/fields";
import type { HouseFellowshipType } from "@/components/types/types";
import { cn } from "@/lib/utils";

const HfcDirectory = ({ centers }: { centers: HouseFellowshipType[] }) => {
  const [query, setQuery] = useState("");

  const zones = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? centers.filter((c) =>
          [c.center, c.zone, c.address, c.host, c.teacher].some((v) => v?.toLowerCase().includes(q))
        )
      : centers;
    return groupedByZone(filtered);
  }, [centers, query]);

  const zoneNames = Object.keys(zones);
  const total = zoneNames.reduce((n, z) => n + zones[z].length, 0);

  return (
    <>
      <div className="sticky top-24 z-10 -mx-2 rounded-3xl bg-ivory/85 p-2 backdrop-blur-xl">
        <div className="relative max-w-xl">
          <label htmlFor="hfc-search" className="sr-only">
            Search house fellowship centers
          </label>
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-stone" aria-hidden />
          <input
            id="hfc-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by area, zone, center, host or teacher"
            className={cn(fieldClass, "rounded-full pl-11")}
          />
        </div>
      </div>
      <p className="mt-4 text-sm text-stone" aria-live="polite">
        {total} {total === 1 ? "center" : "centers"}
        {query && <> matching “{query}”</>}
      </p>

      <div className="mt-10 space-y-14">
        {zoneNames.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-line bg-white/60 p-10 text-center text-stone">
            {query ? `No centers match “${query}”.` : "No house fellowship centers listed yet."}
          </div>
        ) : (
          zoneNames.map((zone) => (
            <section key={zone} aria-labelledby={`zone-${zone}`}>
              <h3 id={`zone-${zone}`} className="flex items-baseline gap-3 font-display text-3xl font-medium text-ink">
                {zone} Zone
                <span className="font-sans text-sm font-semibold text-stone">{zones[zone].length}</span>
              </h3>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {zones[zone].map((center) => (
                  <HfcLayout key={center.id} center={center} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </>
  );
};

export default HfcDirectory;
