"use client";

import { useEffect } from "react";

/** Registers public/sw.js (production only, so development always sees fresh code). */
export default function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    const register = () => navigator.serviceWorker.register("/sw.js").catch((e) => console.warn("[pwa] service worker failed:", e));
    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
  }, []);
  return null;
}
