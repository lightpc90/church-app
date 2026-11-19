import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const ContactInfo = ({ invert = false, className }: { invert?: boolean; className?: string }) => {
  const muted = invert ? "text-white/70" : "text-stone";
  const icon = cn("mt-0.5 size-5 shrink-0", invert ? "text-gold" : "text-royal");
  const link = invert ? "hover:text-white" : "hover:text-ink";
  return (
    <ul className={cn("space-y-4 text-[0.95rem] leading-relaxed", muted, className)}>
      <li className="flex gap-3">
        <MapPin className={icon} aria-hidden />
        <address className="not-italic">{site.address}</address>
      </li>
      <li className="flex gap-3">
        <Phone className={icon} aria-hidden />
        <span className="flex flex-col">
          {site.phones.map((p) => (
            <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className={link}>
              {p}
            </a>
          ))}
        </span>
      </li>
      <li className="flex gap-3">
        <Mail className={icon} aria-hidden />
        <a href={`mailto:${site.email}`} className={cn("break-all", link)}>
          {site.email}
        </a>
      </li>
    </ul>
  );
};

export default ContactInfo;
