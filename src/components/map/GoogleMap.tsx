"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { FaSquarePhone, FaLocationArrow } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

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
      <div className="h-[100%]">
        <div ref={mapRef} style={{ height: "80%", width: "100%" }} />
        {/* Contact Us */}
        <div className="flex flex-col gap-3 lg:h-[20%] bg-white p-4 shadow-md font-medium text-sm">
          <div className="flex gap-2 items-center">
            <div>
              <FaLocationArrow size={25} />
            </div>
            <p>
              1-8 Redeem Way By Slot Bus Stop, Lakowe-Adeba, Km Lekki-Epe
              Express-Way Lakowe
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <div>
              <FaSquarePhone size={25} />
            </div>
            <p>234(0)812 3456 789, 234(0)812 6543 789</p>
          </div>
          <div className="flex gap-2 items-center">
            <div>
              <MdEmail size={25} />
            </div>
            <p>ctlbeautifulgate@gmail.com</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapComponent;
