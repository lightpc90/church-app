"use client";

import { useEffect, useState } from "react";
import AttendanceFunction from "./AttendanceFunction";
import calculateDistance from "@/utilities/calculateDistance";
import { useAuth } from "@/context/globalState";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LocationRestrictedPage = () => {
  const { accessToken } = useAuth();
  const router = useRouter();
  const [userLocation, setUserLocation] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatitude = position.coords.latitude;
          const userLongitude = position.coords.longitude;
          setUserLocation({ latitude: userLatitude, longitude: userLongitude });
        },
        (error) => {
          setError(error.message); // Handle geolocation error
        }
      );
    } else {
      setError("Geolocation not supported"); // Handle lack of geolocation support
    }
  }, []);

  if (error) {
    return (
      <div className="flex justify-center font-semibold items-center p-2">Error: {error}</div>
    );
  }

  if (!userLocation) {
    return (
      <div className="flex font-sembold justify-center items-center lg:text-2xl">
        Getting Your Location...
      </div>
    ); // Loading state while fetching geolocation
  }

  // Calculate distance and check if user is within the allowed radius
  const targetLatitude = 6.4717305;
  const targetLongitude = 3.7288197;
  const accessRadius = 50; // 50 meters
  const distance = calculateDistance(
    userLocation.latitude,
    userLocation.longitude,
    targetLatitude,
    targetLongitude
  );

  if (distance <= accessRadius) {
    return (
      <div>
        <AttendanceFunction />
      </div>
    );
  } else {
    return (
      <div className="flex p-2 justify-center items-center font-semibold text-xl">
        Sorry, you are not within the church premises. You're about {distance - accessRadius}m away
      </div>
    );
  }
};

export default LocationRestrictedPage;
