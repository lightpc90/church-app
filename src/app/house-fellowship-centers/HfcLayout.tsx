import { MapPin, Phone } from "lucide-react";
import type { HouseFellowshipType } from "@/components/types/types";

const Contact = ({ role, name, phone }: { role: string; name: string; phone?: string | null }) => (
  <div className="flex items-center justify-between gap-3 border-t border-line pt-3">
    <div className="min-w-0">
      <p className="text-xs font-semibold tracking-wider text-stone uppercase">{role}</p>
      <p className="truncate font-medium text-ink">{name}</p>
    </div>
    {phone && (
      <a
        href={`tel:${phone.replace(/\s/g, "")}`}
        aria-label={`Call ${name}`}
        className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-sand text-ink transition hover:bg-ink hover:text-white"
      >
        <Phone className="size-4" aria-hidden />
      </a>
    )}
  </div>
);

const HfcLayout = ({ center }: { center: HouseFellowshipType }) => (
  <article className="flex h-full flex-col gap-3 rounded-3xl border border-line bg-white p-6 shadow-soft">
    <h4 className="font-display text-xl font-medium text-ink">{center.center} Center</h4>
    {center.address && (
      <p className="flex gap-2 text-sm text-stone">
        <MapPin className="mt-0.5 size-4 shrink-0 text-royal" aria-hidden />
        {center.address}
      </p>
    )}
    <div className="mt-auto space-y-3">
      <Contact role="Host" name={center.host} phone={center.host_phone} />
      <Contact role="Teacher" name={center.teacher} phone={center.teacher_phone} />
    </div>
  </article>
);

export default HfcLayout;
