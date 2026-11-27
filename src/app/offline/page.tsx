import { WifiOff } from "lucide-react";
import { Container } from "@/components/site/primitives";
import ContactInfo from "@/components/contactInfo/ContactInfo";
import RetryButton from "@/components/pwa/RetryButton";
import { site, weeklyServices } from "@/lib/site";

export const metadata = { title: "You're offline", robots: { index: false } };

// Shown by the service worker (public/sw.js) when there's no connection. Static, so it's
// cached when the app is installed.
export default function OfflinePage() {
  return (
    <section className="bg-ivory pt-32 pb-24 sm:pt-40">
      <Container className="max-w-3xl">
        <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-ink text-white">
          <WifiOff className="size-7" aria-hidden />
        </span>
        <h1 className="mt-6 font-display text-4xl font-medium text-ink sm:text-5xl">You&apos;re offline</h1>
        <p className="mt-4 text-lg text-stone">
          This page needs a connection. Pages you&apos;ve opened before still work offline. Here&apos;s what you might
          need in the meantime.
        </p>
        <RetryButton />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-6">
            <h2 className="font-display text-2xl font-medium text-ink">Service times</h2>
            <ul className="mt-4 space-y-4">
              {weeklyServices.map((d) => (
                <li key={d.day}>
                  <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">{d.day}</p>
                  <ul className="mt-1 space-y-1">
                    {d.items.map((i) => (
                      <li key={i.name} className="flex justify-between gap-4 text-sm">
                        <span className="text-ink">{i.name}</span>
                        <span className="text-stone tabular-nums">{i.time}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-6">
            <h2 className="font-display text-2xl font-medium text-ink">Find us</h2>
            <p className="mt-1 text-sm text-stone">{site.fullName}</p>
            <ContactInfo className="mt-4" />
            <p className="mt-6 rounded-2xl bg-sand/70 p-4 text-sm text-stone">
              <strong className="text-ink">At the workers&apos; or children&apos;s desk?</strong> Check-ins you made
              while offline are saved on this device. Reopen the desk page once you&apos;re back online and they&apos;ll
              sync automatically.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
