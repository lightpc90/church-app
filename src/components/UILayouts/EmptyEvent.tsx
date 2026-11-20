import { CalendarX2 } from "lucide-react";

const EmptyEvent = ({ text }: { text?: string }) => (
  <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-line bg-white/60 px-6 py-14 text-center">
    <CalendarX2 className="size-8 text-stone" aria-hidden />
    <p className="text-stone">{text}</p>
  </div>
);

export default EmptyEvent;
