"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { StoreCard } from "../../../components/card/store-card";

const VENDOR_TYPES = [
  "All",
  "Venue",
  "Catering",
  "Photography",
  "Entertainment",
  "Decoration",
  "Flowershop",
];

interface Store {
  id: number;
  vendorName: string;
  storeName: string;
  storeType: string;
  coverPhoto: string | null;
  profilePicture: string | null;
}

export default function VendorsPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [pendingSearchTerm, setPendingSearchTerm] = useState("");

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost/events-api/admin.php",
        { operation: "getAllVendors" },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.status === "success") {
        setStores(response.data.stores);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching stores:", error);
      setError("Failed to fetch stores.");
    } finally {
      setLoading(false);
    }
  };

  // Filter stores based on search term & category
  const filteredStores = stores.filter((store) => {
    return (
      (filter === "All" || store.storeType === filter) &&
      store.storeName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Handle search input and execute on "Enter"
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchTerm(pendingSearchTerm);
    }
  };

  return (
    <div className="p-6 space-y-6 w-[1200px]">
      <h1 className="text-2xl font-bold">Vendors</h1>

      {/* Sticky Search and Filter Controls */}
      <div className="sticky top-0 z-10 bg-white shadow-md p-4 mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by store name..."
          value={pendingSearchTerm}
          onChange={(e) => setPendingSearchTerm(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-auto"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2"
        >
          {VENDOR_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Featured Stores */}
      <div>
        <h2 className="text-xl font-semibold mb-4">🌟 Featured Vendors</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {stores.slice(0, 4).map((store) => (
            <StoreCard key={store.id} {...store} />
          ))}
        </div>
      </div>

      {/* Filtered Store List */}
      <h2 className="text-xl font-semibold mt-6">All Vendors</h2>
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#486968] border-t-transparent"></div>
        </div>
      ) : error ? (
        <div className="rounded-lg bg-red-50 p-4 text-red-800">{error}</div>
      ) : filteredStores.length === 0 ? (
        <div className="rounded-lg bg-gray-50 p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900">
            No vendors found
          </h3>
          <p className="mt-1 text-gray-500">Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredStores.map((store) => (
            <StoreCard key={store.id} {...store} />
          ))}
        </div>
      )}
    </div>
  );
}
