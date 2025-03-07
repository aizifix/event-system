"use client";

import { VenueCard } from "../card/venue-card";
import { useFeatured } from "../../hooks/useFeatured";

export default function VenuesSection() {
  const { featuredData, loading, error } = useFeatured();

  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-8">
        <h2 className="font-['Tiro_Gurmukhi'] text-3xl text-left">
          Featured Venues
        </h2>
        <p>Discover the best partnered venues for your events</p>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-5">
            {featuredData.featured_venues.map((venue) => (
              <VenueCard
                key={venue.venue_id}
                id={venue.venue_id}
                venueTitle={venue.venue_name}
                venueProfilePicture={venue.profile_picture}
                venueCoverPhoto={venue.cover_photo}
                venueLocation={venue.location}
                venueType={venue.venue_type}
                venueStatus={venue.availability_status || "Available"}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
