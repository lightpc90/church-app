"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { directionsUrl, site } from "@/lib/site";
import { useConsent } from "../consent/ConsentProvider";

const MAP_SCRIPT_ID = "google-maps";

/** Google map pinned on the church. Falls back to a directions card if Maps can't load. */
const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [once, setOnce] = useState(false);
  const { ready, choices, save } = useConsent();
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  // Google Maps sets cookies, so it only loads with consent (or a click on "Show map").
  const allowed = ready && (choices.media || once);

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current || typeof window.google === "undefined") return;
      const map = new window.google.maps.Map(mapRef.current, {
        center: site.coordinates,
        zoom: 17,
        disableDefaultUI: true,
        zoomControl: true,
        fullscreenControl: true,
        styles: [
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          { featureType: "transit", stylers: [{ visibility: "off" }] },
        ],
      });
      new window.google.maps.Marker({ position: site.coordinates, map, title: site.fullName });
    };

    if (!allowed) return;
    if (typeof window.google !== "undefined") initMap();
    else window.initMap = initMap;
  }, [allowed]);

  if (!apiKey || failed || !allowed) {
    const canLoad = !!apiKey && !failed && ready;
    return (
      <div className="flex h-full min-h-[20rem] flex-col items-center justify-center gap-3 p-8 text-center text-ink">
        <MapPin className="size-10 text-royal" aria-hidden />
        <span className="font-display text-2xl">{site.fullName}</span>
        <span className="max-w-xs text-stone">{site.address}</span>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-sm font-semibold text-royal hover:underline"
        >
          Open in Google Maps →
        </a>
        {canLoad && (
          <div className="mt-3 flex flex-col items-center gap-2 border-t border-line pt-4">
            <button
              type="button"
              onClick={() => setOnce(true)}
              className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink/40"
            >
              Show the map here
            </button>
            <p className="max-w-xs text-xs text-stone">
              The map is provided by Google, which may set cookies.{" "}
              <button type="button" onClick={() => save({ media: true })} className="font-semibold text-royal hover:underline">
                Always allow
              </button>{" "}
              ·{" "}
              <Link href="/cookies" className="font-semibold text-royal hover:underline">
                Learn more
              </Link>
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <Script
        id={MAP_SCRIPT_ID}
        src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&loading=async`}
        strategy="afterInteractive"
        onError={() => setFailed(true)}
      />
      <div ref={mapRef} className="h-full min-h-[20rem] w-full" role="region" aria-label="Map showing the church location" />
    </>
  );
};

export default MapComponent;
