"use client";

import Image from "next/image";

export default function GallerySection() {
  const galleryImages = [
    "/temp_package/package_1.jpg",
    "/temp_package/package_2.jpg",
    "/temp_package/package_3.jpg",
    "/temp_package/package_4.jpg",
    "/temp_package/package_1.jpg",
    "/temp_package/package_2.jpg",
  ];

  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
          Our Gallery
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg"
            >
              <Image
                src={img}
                alt={`Gallery image ${index + 1}`}
                width={400}
                height={300}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
