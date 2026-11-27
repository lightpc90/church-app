"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { Show, SignInButton } from "@clerk/nextjs";
import AccountButton from "./AccountButton";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import Logo from "./Logo";
import SocialMedia from "../social-media/SocialMedia";
import { ButtonLink } from "../site/primitives";
import { connectNav, primaryNav } from "@/lib/site";
import { cn } from "@/lib/utils";

// Routes whose top is light (no dark photo hero), so the bar starts solid.
const LIGHT_TOP_PREFIXES = ["/workers", "/privacy", "/cookies", "/offline"];

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

export default function Navbar() {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset on route change
    setMenuOpen(false);
  }, [pathname]);

  // Lock scroll + Escape to close while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const lightTop = LIGHT_TOP_PREFIXES.some((p) => pathname.startsWith(p));
  const solid = (scrolled || lightTop) && !menuOpen;
  const connectActive = connectNav.some((l) => isActive(pathname, l.href));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          solid
            ? "border-b border-line/70 bg-ivory/85 py-3 shadow-soft backdrop-blur-xl"
            : "border-b border-transparent bg-transparent py-5"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
          <Logo invert={!solid} />

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {primaryNav.map((link) => (
              <NavItem key={link.href} href={link.href} active={isActive(pathname, link.href)} solid={solid}>
                {link.label}
              </NavItem>
            ))}
            <Dropdown.Root modal={false}>
              <Dropdown.Trigger
                className={cn(
                  navItemClass(solid, connectActive),
                  "group inline-flex items-center gap-1 outline-hidden"
                )}
              >
                Get Connected
                <ChevronDown className="size-4 transition-transform group-data-[state=open]:rotate-180" aria-hidden />
              </Dropdown.Trigger>
              <Dropdown.Portal>
                <Dropdown.Content
                  align="center"
                  sideOffset={14}
                  className="z-[60] w-[34rem] rounded-3xl border border-line bg-white p-3 shadow-lift data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:slide-in-from-top-2 data-[state=closed]:animate-out data-[state=closed]:fade-out"
                >
                  <div className="grid grid-cols-2 gap-1">
                    {connectNav.map((link) => (
                      <Dropdown.Item key={link.href} asChild>
                        <Link
                          href={link.href}
                          className="block rounded-2xl p-4 outline-hidden transition-colors hover:bg-sand focus:bg-sand"
                        >
                          <span className="block font-semibold text-ink">{link.label}</span>
                          <span className="mt-0.5 block text-sm text-stone">{link.description}</span>
                        </Link>
                      </Dropdown.Item>
                    ))}
                  </div>
                </Dropdown.Content>
              </Dropdown.Portal>
            </Dropdown.Root>
            <NavItem href="/contact-us" active={isActive(pathname, "/contact-us")} solid={solid}>
              Contact
            </NavItem>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center sm:flex">
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button
                    type="button"
                    className={cn(
                      "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                      solid ? "text-stone hover:text-ink" : "text-white/75 hover:text-white"
                    )}
                  >
                    Sign in
                  </button>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <AccountButton />
              </Show>
            </div>
            <ButtonLink href="/online-giving" variant="gold" size="sm" className="hidden sm:inline-flex">
              Give
            </ButtonLink>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((o) => !o)}
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full transition-colors lg:hidden",
                solid ? "bg-ink/5 text-ink hover:bg-ink/10" : "bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
              )}
            >
              {menuOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink text-white lg:hidden"
          >
            <motion.nav
              aria-label="Mobile"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="mx-auto flex min-h-full max-w-xl flex-col px-6 pt-28 pb-10"
            >
              <ul className="space-y-1">
                {[...primaryNav, { label: "Contact", href: "/contact-us" }].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive(pathname, link.href) ? "page" : undefined}
                      className="block py-2 font-display text-4xl text-white/90 transition-colors hover:text-gold aria-[current=page]:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="eyebrow mt-10 mb-3">Get connected</p>
              <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                {connectNav.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center justify-between rounded-xl px-1 py-2.5 text-lg text-white/80 hover:text-white"
                    >
                      {link.label}
                      <ArrowUpRight className="size-4 text-white/40" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-10">
                <div className="flex flex-wrap items-center gap-3">
                  <ButtonLink href="/online-giving" variant="gold" size="lg">
                    Give online
                  </ButtonLink>
                  <Show when="signed-out">
                    <SignInButton mode="modal">
                      <button type="button" className="px-3 py-2 text-white/75 hover:text-white">
                        Sign in
                      </button>
                    </SignInButton>
                  </Show>
                  <Show when="signed-in">
                    <AccountButton />
                  </Show>
                </div>
                <SocialMedia className="mt-8 text-white/70" />
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const navItemClass = (solid: boolean, active: boolean) =>
  cn(
    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
    solid
      ? active
        ? "text-ink"
        : "text-stone hover:text-ink"
      : active
        ? "text-white"
        : "text-white/75 hover:text-white",
    active &&
      "after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-gold"
  );

function NavItem({
  href,
  active,
  solid,
  children,
}: {
  href: string;
  active: boolean;
  solid: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} aria-current={active ? "page" : undefined} className={navItemClass(solid, active)}>
      {children}
    </Link>
  );
}
