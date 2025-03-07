"use client";

import { StoreCard } from "../card/store-card";
import { useFeatured } from "../../hooks/useFeatured";

export default function StoresSection() {
  const { featuredData, loading, error } = useFeatured();

  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="container mx-auto px-8">
        <h2 className="font-['Tiro_Gurmukhi'] text-3xl text-left">
          Featured Stores
        </h2>
        <p>Discover our partnered stores for your events</p>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-5">
            {featuredData.featured_stores.map((store) => (
              <StoreCard
                key={store.store_id}
                id={store.store_id}
                vendorName={`${store.first_name} ${store.last_name}`}
                storeName={store.store_name}
                storeType={store.store_type}
                storeCategory={store.store_category}
                coverPhoto={store.cover_photo}
                profilePicture={store.profile_picture}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
