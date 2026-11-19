import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = [
  { label: "Instagram", href: site.socials.instagram, Icon: FaInstagram },
  { label: "Facebook", href: site.socials.facebook, Icon: FaFacebookF },
  { label: "YouTube", href: site.socials.youtube, Icon: FaYoutube },
];

const SocialMedia = ({ className, showHandle = false }: { className?: string; showHandle?: boolean }) => (
  <div className={cn("flex items-center gap-2", className)}>
    {links.map(({ label, href, Icon }) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${site.name} on ${label}`}
        className="inline-flex size-10 items-center justify-center rounded-full border border-current/20 transition-colors hover:border-current/60 hover:bg-current/5"
      >
        <Icon className="size-4" aria-hidden />
      </a>
    ))}
    {showHandle && <span className="ml-2 text-sm font-medium">{site.socials.handle}</span>}
  </div>
);

export default SocialMedia;
