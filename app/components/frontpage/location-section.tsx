"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { Icon as LeafletIcon } from "leaflet";
import "leaflet/dist/leaflet.css";

// Dynamically import Map components with no SSR
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

export default function LocationSection() {
  const [customIcon, setCustomIcon] = useState<LeafletIcon | null>(null);
  const position: [number, number] = [8.4542, 124.6319];

  useEffect(() => {
    // Initialize Leaflet icon only on client side
    if (typeof window !== "undefined") {
      const L = require("leaflet");
      const icon = new L.Icon({
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      setCustomIcon(icon);
    }
  }, []);

  // Only render map if we're on client side and icon is loaded
  const Map = () => {
    if (typeof window === "undefined" || !customIcon) return null;

    return (
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            Event Planning Hub <br />
            Your Premier Event Planning Destination
          </Popup>
        </Marker>
      </MapContainer>
    );
  };

  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
          Visit Us
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-lg bg-gray-100 p-6">
              <h3 className="mb-4 text-xl font-semibold text-gray-800">
                Our Location
              </h3>
              <p className="mb-2 text-gray-600">
                Xavier Heights, Cagayan de Oro City
                <br />
                Misamis Oriental, 9000
                <br />
                Philippines
              </p>
              <p className="text-gray-600">
                <strong>Phone:</strong> (088) 123-4567
                <br />
                <strong>Email:</strong> info@eventplanninghub.com
              </p>
            </div>
            <div className="rounded-lg bg-gray-100 p-6">
              <h3 className="mb-4 text-xl font-semibold text-gray-800">
                Business Hours
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM
                </li>
                <li>
                  <strong>Saturday:</strong> 9:00 AM - 4:00 PM
                </li>
                <li>
                  <strong>Sunday:</strong> Closed
                </li>
              </ul>
            </div>
          </div>

          {/* Leaflet Map */}
          <div className="h-[500px] w-full overflow-hidden rounded-lg shadow-lg">
            <Map />
          </div>
        </div>
      </div>
    </section>
  );
}
