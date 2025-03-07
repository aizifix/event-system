import { useState, useEffect } from "react";
import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost/events-api";

interface Store {
  store_id: number;
  store_name: string;
  store_type: string;
  store_category: string;
  cover_photo: string | null;
  profile_picture: string | null;
  first_name: string;
  last_name: string;
}

interface Venue {
  venue_id: number;
  venue_name: string;
  location: string;
  venue_type: string;
  availability_status: string;
  cover_photo: string | null;
  profile_picture: string | null;
}

interface FeaturedData {
  featured_stores: Store[];
  featured_venues: Venue[];
}

export function useFeatured() {
  const [featuredData, setFeaturedData] = useState<FeaturedData>({
    featured_stores: [],
    featured_venues: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_URL}/general.php?featured=true`
        );

        if (response.data && response.data.status === "success") {
          const transformedData = {
            featured_stores: response.data.featured_stores.map(
              (store: Store) => ({
                ...store,
                cover_photo: `${API_URL}/${store.cover_photo}`,
                profile_picture: `${API_URL}/${store.profile_picture}`,
              })
            ),
            featured_venues: response.data.featured_venues.map(
              (venue: Venue) => ({
                ...venue,
                cover_photo: `${API_URL}/${venue.cover_photo}`,
                profile_picture: `${API_URL}/${venue.profile_picture}`,
              })
            ),
          };
          setFeaturedData(transformedData);
        } else {
          throw new Error(response.data?.message || "Failed to fetch data");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch featured items"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return { featuredData, loading, error };
}
