"use client";

// import Image from "next/image";
import Link from "next/link";
import Card from "../components/ui/Card";
import Navbar from "../components/frontpage/navbar";
import HeroSection from "../components/frontpage/hero-section";
import AboutSection from "../components/frontpage/about-section";
import PackagesSection from "../components/frontpage/packages-section";
import VenuesSection from "../components/frontpage/venues-section";
import StoresSection from "../components/frontpage/stores-section";
import GallerySection from "../components/frontpage/gallery-section";
import Footer from "../components/frontpage/footer";
import LocationSection from "../components/frontpage/location-section";

export default function FrontPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-8">
        <Navbar />
      </div>
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <PackagesSection />
        <VenuesSection />
        <StoresSection />
        <GallerySection />
        <LocationSection />
      </main>
      <Footer />
    </div>
  );
}
