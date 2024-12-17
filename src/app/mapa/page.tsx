"use client";

import React from "react";
import Map from "@/components/Map";
import TestComponent from "@/components/TestComponent";

const MapaPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Mi Mapa Integrado</h1>
      <TestComponent />
      <Map />
      
    </div>
  );
};

export default MapaPage;