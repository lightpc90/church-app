"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { FaSquarePhone, FaLocationArrow } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import ContactInfo from "../contactInfo/ContactInfo";

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = () => {
      if (mapRef.current && typeof window.google !== "undefined") {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 6.471756086450086, lng: 3.728822906746889 }, // Example coordinates for Lagos
          zoom: 18,
        });

        // Add marker (optional)
        new window.google.maps.Marker({
          position: { lat: 6.471756086450086, lng: 3.728822906746889 },
          map,
          title: "Beautiful Gate",
        });
      }
    };

    if (typeof window.google !== "undefined") {
      initMap();
    } else {
      window.initMap = initMap; // Define initMap globally if the script is not yet loaded
    }
  }, []);

  return (
    <>
      {/* Load the Google Maps API script */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_API_KEY}&callback=initMap`}
        strategy="afterInteractive"
      />

      {/* Map container */}
      <div className="flex flex-col w-full h-[100%]">
        <div ref={mapRef} style={{ height: "80%", width: "100%" }} className="h-[80%] w-full" />
        {/* Contact Us */}
        <div className="p-4 bg-white shadow-md">
        <ContactInfo />
        </div>
      </div>
    </>
  );
};

export default MapComponent;
