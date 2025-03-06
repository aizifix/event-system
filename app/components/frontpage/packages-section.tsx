"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EventPackageCard from "../ui/event-package-card";

const samplePackages = [
  {
    title: "Wedding Package",
    description:
      "Make your special day truly unforgettable with our comprehensive wedding package.",
    price: "₱50,000",
    image: "/temp_package/package_1.jpg",
    features: [
      "Full event planning and coordination",
      "Venue decoration and setup",
      "Professional photography",
      "Catering services",
    ],
  },
  {
    title: "Birthday Celebration",
    description:
      "Create lasting memories with our birthday celebration package.",
    price: "₱25,000",
    image: "/temp_package/package_2.jpg",
    features: [
      "Theme customization",
      "Entertainment options",
      "Cake and desserts",
      "Decoration setup",
    ],
  },
  {
    title: "Corporate Event",
    description: "Professional event planning for your business needs.",
    price: "₱35,000",
    image: "/temp_package/package_3.jpg",
    features: [
      "Venue selection assistance",
      "Audio-visual equipment",
      "Catering services",
      "Event coordination",
    ],
  },
  {
    title: "Debut Package",
    description:
      "Make your debut a night to remember with our special package.",
    price: "₱45,000",
    image: "/temp_package/package_4.jpg",
    features: [
      "Complete event styling",
      "Photography and videography",
      "Program coordination",
      "Catering services",
    ],
  },
];

export default function PackagesSection() {
  return (
    <section id="packages" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="font-['Tiro_Gurmukhi'] text-3xl text-center">
          PACKAGES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {samplePackages.map((pkg, index) => (
            <EventPackageCard
              key={index}
              title={pkg.title}
              description={pkg.description}
              price={pkg.price}
              image={pkg.image}
              features={pkg.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
