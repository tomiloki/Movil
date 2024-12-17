// src/components/Map.tsx

"use client";

import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";

interface MarkerData {
  id: number;
  position: {
    lat: number;
    lng: number;
  };
  title: string;
}

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 40.7128, // Coordenadas iniciales (ejemplo: Nueva York)
  lng: -74.0060,
};

const markers: MarkerData[] = [
  {
    id: 1,
    position: { lat: 40.7128, lng: -74.0060 },
    title: "Nueva York",
  },
  {
    id: 2,
    position: { lat: 34.0522, lng: -118.2437 },
    title: "Los Ángeles",
  },
  {
    id: 3,
    position: { lat: 41.8781, lng: -87.6298 },
    title: "Chicago",
  },
];

const Map: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);

  if (loadError) return <div>Error al cargar el mapa</div>;
  if (!isLoaded) return <div>Cargando...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={4}>
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position}
          onClick={() => setSelectedMarker(marker)}
        />
      ))}

      {selectedMarker && (
        <InfoWindow
          position={selectedMarker.position}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div>
            <h2>{selectedMarker.title}</h2>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default React.memo(Map);
