"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Cookie, X } from "lucide-react";
import { buttonVariants } from "../site/primitives";
import { cn } from "@/lib/utils";
import { useConsent } from "./ConsentProvider";

const outline =
  "inline-flex h-11 items-center justify-center rounded-full border border-ink/15 bg-white px-5 text-sm font-semibold text-ink transition hover:border-ink/40";

/** First-visit banner (non-blocking) plus the settings dialog it and the footer link open. */
export default function ConsentBanner() {
  const { ready, decided, save, openSettings } = useConsent();

  return (
    <>
      {ready && !decided && (
        <section
          aria-label="Cookie consent"
          className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-3xl animate-in fade-in slide-in-from-bottom-4 rounded-3xl border border-line bg-ivory/95 p-5 text-ink shadow-lift backdrop-blur-xl duration-500 sm:inset-x-6 sm:bottom-6 sm:p-6"
        >
          <div className="flex gap-4">
            <span className="hidden size-11 shrink-0 items-center justify-center rounded-full bg-gold-soft text-ink sm:inline-flex">
              <Cookie className="size-5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-xl font-medium">Your privacy, your choice</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-stone">
                We only use the cookies needed to run this site and keep sign-in secure. Sermon videos and maps come
                from YouTube and Google Maps, which may set their own cookies, so we load them only if you allow it.
                We don&apos;t use advertising or tracking cookies.{" "}
                <Link href="/cookies" className="font-semibold text-royal underline-offset-2 hover:underline">
                  Cookie policy
                </Link>
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" onClick={() => save({ media: true })} className={cn(buttonVariants(), "h-11")}>
                  Accept all
                </button>
                <button type="button" onClick={() => save({ media: false })} className={outline}>
                  Essential only
                </button>
                <button
                  type="button"
                  onClick={openSettings}
                  className="inline-flex h-11 items-center px-3 text-sm font-semibold text-royal hover:underline"
                >
                  Choose…
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
      <ConsentSettings />
    </>
  );
}

function ConsentSettings() {
  const { settingsOpen, closeSettings, choices, save } = useConsent();
  const ref = useRef<HTMLDialogElement>(null);
  const [media, setMedia] = useState(choices.media);
  const titleId = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (settingsOpen && !el.open) {
      // Start from the saved choice each time it opens.
      setMedia(choices.media);
      el.showModal();
    }
    if (!settingsOpen && el.open) el.close();
  }, [settingsOpen, choices.media]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={closeSettings}
      onClick={(e) => e.target === ref.current && closeSettings()}
      className="m-auto w-[min(34rem,calc(100vw-2rem))] rounded-3xl bg-ivory p-0 text-ink shadow-lift backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
        <h2 id={titleId} className="font-display text-xl font-medium">
          Cookie settings
        </h2>
        <button
          type="button"
          aria-label="Close"
          onClick={closeSettings}
          className="inline-flex size-9 items-center justify-center rounded-full bg-ink/5 hover:bg-ink/10"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>

      <div className="space-y-3 px-6 py-5">
        <CategoryRow
          title="Essential"
          description="Keep the site working and sign-in secure (Clerk), and remember this choice. These can't be switched off."
          checked
          disabled
        />
        <CategoryRow
          title="Videos and maps"
          description="Load sermon videos from YouTube and our location map from Google Maps. Google may set cookies or store data on your device when these load."
          checked={media}
          onChange={setMedia}
        />
        <p className="pt-1 text-xs text-stone">
          No analytics or advertising cookies are used. Details in our{" "}
          <Link href="/cookies" onClick={closeSettings} className="font-semibold text-royal hover:underline">
            cookie policy
          </Link>{" "}
          and{" "}
          <Link href="/privacy" onClick={closeSettings} className="font-semibold text-royal hover:underline">
            privacy policy
          </Link>
          .
        </p>
      </div>

      <div className="flex flex-wrap justify-end gap-2 border-t border-line px-6 py-4">
        <button type="button" onClick={() => save({ media })} className={outline}>
          Save choices
        </button>
        <button type="button" onClick={() => save({ media: true })} className={cn(buttonVariants(), "h-11")}>
          Accept all
        </button>
      </div>
    </dialog>
  );
}

function CategoryRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <label
      className={cn(
        "flex items-start gap-4 rounded-2xl border border-line bg-white p-4",
        disabled ? "cursor-default" : "cursor-pointer hover:border-ink/20"
      )}
    >
      <span className="flex-1">
        <span className="block font-semibold">{title}</span>
        <span className="mt-0.5 block text-sm text-stone">{description}</span>
      </span>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className={cn(
          "relative mt-1 h-6 w-11 shrink-0 rounded-full transition-colors peer-focus-visible:ring-4 peer-focus-visible:ring-royal/20",
          checked ? "bg-ink" : "bg-stone/30",
          disabled && "opacity-50"
        )}
      >
        <span
          className={cn("absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform", checked && "translate-x-5")}
        />
      </span>
    </label>
  );
}

/** Footer link that reopens the settings. */
export function CookieSettingsButton({ className }: { className?: string }) {
  const { openSettings } = useConsent();
  return (
    <button type="button" onClick={openSettings} className={className}>
      Cookie settings
    </button>
  );
}
