'use client'

import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = () => {
  const map_api = process.env.API_KEY;

  const location = { lat: 6.47169, lng: 3.72878 };
  const mapStyles = {
    height: "100%",
    width: "100%",
  };

  const defaultCenter = {
    lat: location.lat,
    lng: location.lng,
  };

  return (
    <LoadScript googleMapsApiKey={map_api}>
      <GoogleMap mapContainerStyle={mapStyles} center={defaultCenter} zoom={18}>
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
