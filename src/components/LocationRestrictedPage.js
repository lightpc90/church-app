'use client'

import { useEffect, useState } from 'react';

const LocationRestrictedPage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    return <div>Error: {error}</div>;
  }

  if (!userLocation) {
    return <div>Loading...</div>; // Loading state while fetching geolocation
  }

  // Calculate distance and check if user is within the allowed radius
  const targetLatitude = 6.47169  
  const targetLongitude = 3.72878; 
  const accessRadius = 50; // 50 meters
  const distance = calculateDistance(userLocation.latitude, userLocation.longitude, targetLatitude, targetLongitude);

  if (distance <= accessRadius) {
    return <div>
      <div>Workers Attendance Page</div>
      <div>
        <p>Name</p>
        <input type="box" />
      </div>
    </div>;
  } else {
    return <div>Sorry, you are not within the church premises</div>;
  }
};

function calculateDistance(lat1, lon1, lat2, lon2) {
  // Haversine formula or other distance calculation methods can be used here
}

export default LocationRestrictedPage;
