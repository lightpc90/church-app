"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { MapPin } from "lucide-react";
import { directionsUrl, site } from "@/lib/site";

const MAP_SCRIPT_ID = "google-maps";

/** Google map pinned on the church. Falls back to a directions card if Maps can't load. */
const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

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

    if (typeof window.google !== "undefined") initMap();
    else window.initMap = initMap;
  }, []);

  if (!apiKey || failed) {
    return (
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full min-h-[20rem] flex-col items-center justify-center gap-3 p-8 text-center text-ink"
      >
        <MapPin className="size-10 text-royal" aria-hidden />
        <span className="font-display text-2xl">{site.fullName}</span>
        <span className="max-w-xs text-stone">{site.address}</span>
        <span className="mt-2 text-sm font-semibold text-royal">Open in Google Maps →</span>
      </a>
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
