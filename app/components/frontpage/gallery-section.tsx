import Image from "next/image";

const galleryImages = [
  {
    src: "/gallery/image1.jpg",
    alt: "Wedding silhouette",
  },
  {
    src: "/gallery/image2.jpg",
    alt: "Bride in car",
  },
  {
    src: "/gallery/image3.jpg",
    alt: "Bridesmaids group photo",
  },
  {
    src: "/gallery/image4.jpg",
    alt: "Traditional wedding couple",
  },
  {
    src: "/gallery/image5.jpg",
    alt: "Military wedding couple",
  },
  {
    src: "/gallery/image6.jpg",
    alt: "Wedding venue decoration",
  },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <h2 className="font-['Tiro_Gurmukhi'] text-4xl text-center mb-12">
          GALLERY
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="aspect-square relative overflow-hidden rounded-[12px] shadow-md group"
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 z-10" />
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
