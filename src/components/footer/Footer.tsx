import Link from "next/link";
import Logo from "../navbar/Logo";
import SocialMedia from "../social-media/SocialMedia";
import ContactInfo from "../contactInfo/ContactInfo";
import { Container } from "../site/primitives";
import { footerNav, site, weeklyServices } from "@/lib/site";

const columns = [
  { title: "Explore", links: footerNav.explore },
  { title: "Connect", links: footerNav.connect },
  { title: "Community", links: footerNav.community },
];

const Footer = () => {
  const year = new Date().getFullYear();
  const sunday = weeklyServices[0];

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      {/* soft gold glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] size-[36rem] rounded-full bg-gold/10 blur-3xl"
      />
      <Container className="relative pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo invert />
            <p className="mt-6 max-w-sm leading-relaxed text-white/65">
              A parish of the Redeemed Christian Church of God, {site.tagline}. A vibrant community
              devoted to the Word, worship and prayer, and everyone is welcome.
            </p>
            <SocialMedia className="mt-8 text-white/80" />
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">{col.title}</h2>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-white/70 transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">Visit us</h2>
            <ContactInfo invert className="mt-5" />
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
              <p className="font-semibold">Sunday services</p>
              <p className="mt-1 text-white/65">
                {sunday.items
                  .filter((i) => i.name.endsWith("Service"))
                  .map((i) => i.time.split(" –")[0])
                  .join(" & ")}{" "}
                AM
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.fullName}. All rights reserved.
          </p>
          <p>{site.tagline}</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
