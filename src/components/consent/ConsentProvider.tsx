"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/**
 * Cookie consent for the public site.
 *
 * Categories:
 *  - essential: always on (Clerk sign-in cookies, and this consent cookie itself)
 *  - media: embedded YouTube videos and Google Maps, which let Google store cookies / data
 * There are no analytics or advertising cookies. If any are added, add a category here, a row in
 * the settings dialog, and a section on /cookies, and bump VERSION so everyone is asked again.
 */

export type ConsentChoices = { media: boolean };

const COOKIE = "bg_consent";
const VERSION = 1;
const MAX_AGE = 60 * 60 * 24 * 180; // 6 months, then we ask again

function readCookie(): ConsentChoices | null {
  const raw = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${COOKIE}=`))
    ?.slice(COOKIE.length + 1);
  // Format: v1.media-1
  const match = raw && /^v(\d+)\.media-([01])$/.exec(decodeURIComponent(raw));
  if (!match || Number(match[1]) !== VERSION) return null;
  return { media: match[2] === "1" };
}

function writeCookie(c: ConsentChoices) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=v${VERSION}.media-${c.media ? 1 : 0}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
}

type ConsentContext = {
  /** false until the cookie has been read in the browser (avoids a flash of the banner) */
  ready: boolean;
  /** has the visitor made a choice yet */
  decided: boolean;
  choices: ConsentChoices;
  save: (c: ConsentChoices) => void;
  settingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
};

const Ctx = createContext<ConsentContext | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [stored, setStored] = useState<ConsentChoices | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the cookie is only readable in the browser
    setStored(readCookie());
    setReady(true);
  }, []);

  const save = useCallback((c: ConsentChoices) => {
    writeCookie(c);
    setStored(c);
    setSettingsOpen(false);
  }, []);

  const value = useMemo<ConsentContext>(
    () => ({
      ready,
      decided: stored !== null,
      choices: stored ?? { media: false },
      save,
      settingsOpen,
      openSettings: () => setSettingsOpen(true),
      closeSettings: () => setSettingsOpen(false),
    }),
    [ready, stored, save, settingsOpen]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useConsent() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useConsent must be used inside <ConsentProvider>");
  return ctx;
}
