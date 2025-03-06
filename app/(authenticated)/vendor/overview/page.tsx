"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { secureStorage } from "@/app/utils/encryption";
import { protectRoute } from "@/app/utils/routeProtection";
import axios from "axios";
import { Filter, Search, Pencil, Download, MoreVertical } from "lucide-react";
import * as XLSX from "xlsx";

interface Store {
  id: number;
  storeName: string;
  storeCategory: string;
  coverPhoto: string | null;
  profilePicture: string;
  store_type: string;
  store_status: "active" | "inactive";
  store_location: string;
  store_contact: string;
  store_createdAt: string;
  store_email: string;
  store_description: string;
  store_details: string;
  vendor_name: string;
  prices: Array<{
    title: string;
    min: number;
    max: number;
    description: string;
  }>;
}

interface Venue {
  venue_id: number;
  venue_title: string;
  venue_owner: string;
  venue_location: string;
  venue_contact: string;
  venue_status: "available" | "booked" | "unavailable";
  venue_type: "internal" | "external";
  venue_details: string;
  venue_profile_picture: string;
  venue_cover_photo: string | null;
  vendor_name: string;
  prices: Array<{
    title: string | null;
    min: number;
    max: number;
    capacity: number;
    description: string;
  }>;
}

interface ApiResponse<T> {
  status: string;
  stores?: T[];
  venues?: T[];
  message?: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost/events-api";

// Add normalizePath function
const normalizePath = (path: string | null) => {
  if (!path || path.startsWith("http")) return path;
  return `${API_URL}/${path}`;
};

export default function VendorDashboard() {
  const router = useRouter();
  const [stores, setStores] = useState<Store[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"stores" | "venues">("stores");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  useEffect(() => {
    try {
      protectRoute();
      const userData = secureStorage.getItem("user");
      if (
        !userData ||
        !userData.user_role ||
        userData.user_role.toLowerCase() !== "vendor"
      ) {
        console.log("Invalid user data in overview:", userData);
        router.push("/auth/login");
        return;
      }

      fetchData(userData.user_id);
    } catch (error) {
      console.error("Error accessing user data:", error);
      router.push("/auth/login");
    }
  }, [router]);

  useEffect(() => {
    if (activeDropdown !== null) {
      const button = document.querySelector(
        `button[data-id="${activeDropdown}"]`
      );
      if (button) {
        const rect = button.getBoundingClientRect();
        const scrollY = window.scrollY;
        setDropdownPosition({
          top: rect.bottom + scrollY + 5,
          left: rect.left,
        });
      }
    } else {
      setDropdownPosition(null);
    }
  }, [activeDropdown]);

  const fetchData = async (userId: number) => {
    try {
      setLoading(true);
      const [storesResponse, venuesResponse] = await Promise.all([
        axios.get<ApiResponse<Store>>(`${API_URL}/vendor.php`, {
          params: {
            operation: "getStores",
            user_id: userId,
          },
        }),
        axios.get<ApiResponse<Venue>>(`${API_URL}/vendor.php`, {
          params: {
            operation: "getVenues",
            user_id: userId,
          },
        }),
      ]);

      if (
        storesResponse.data.status === "success" &&
        storesResponse.data.stores
      ) {
        setStores(storesResponse.data.stores);
      }

      if (
        venuesResponse.data.status === "success" &&
        venuesResponse.data.venues
      ) {
        const transformedVenues = venuesResponse.data.venues.map((venue) => ({
          ...venue,
          venue_profile_picture:
            normalizePath(venue.venue_profile_picture) || "/placeholder.svg",
          venue_cover_photo: venue.venue_cover_photo
            ? normalizePath(venue.venue_cover_photo)
            : null,
          prices: venue.prices || [],
        }));
        setVenues(transformedVenues);
      }

      setError("");
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const filteredData = () => {
    const data = activeTab === "stores" ? stores : venues;
    if (!Array.isArray(data)) {
      console.error("Data is not an array:", data);
      return [];
    }

    return data.filter((item) => {
      if (!item) return false;

      if (activeTab === "stores") {
        const store = item as Store;
        const matchesSearch = store.storeName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

        const matchesStatus =
          statusFilter === "all" ||
          store.store_status?.toLowerCase() === statusFilter.toLowerCase();

        const matchesType =
          typeFilter === "all" ||
          store.store_type?.toLowerCase() === typeFilter.toLowerCase();

        return matchesSearch && matchesStatus && matchesType;
      } else {
        const venue = item as Venue;
        const matchesSearch =
          venue.venue_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          venue.venue_owner?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
          statusFilter === "all" ||
          venue.venue_status?.toLowerCase() === statusFilter.toLowerCase();

        const matchesType =
          typeFilter === "all" ||
          venue.venue_type?.toLowerCase() === typeFilter.toLowerCase();

        return matchesSearch && matchesStatus && matchesType;
      }
    });
  };

  const handleExport = () => {
    const dataToExport = filteredData().map((item) => {
      if (activeTab === "stores") {
        const store = item as Store;
        return {
          "Store Name": store.storeName,
          Owner: store.vendor_name,
          Contact: store.store_contact,
          Location: store.store_location,
          Category: store.storeCategory,
          Status: store.store_status,
          "Date Created": new Date(store.store_createdAt).toLocaleDateString(),
        };
      } else {
        const venue = item as Venue;
        return {
          "Venue Title": venue.venue_title,
          Owner: venue.vendor_name,
          Location: venue.venue_location,
          Status: venue.venue_status,
          Type: venue.venue_type,
          Contact: venue.venue_contact,
          Capacity: venue.prices?.[0]?.capacity || 0,
          "Price Range": venue.prices?.[0]
            ? `${venue.prices[0].min} - ${venue.prices[0].max}`
            : "N/A",
        };
      }
    });

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, activeTab);
    XLSX.writeFile(
      wb,
      `${activeTab}_export_${new Date().toISOString().split("T")[0]}.xlsx`
    );
  };

  const handleEdit = (id: number) => {
    console.log("Edit item:", id);
    // Implement edit functionality
  };

  const handleDelete = (id: number) => {
    console.log("Delete item:", id);
    // Implement delete functionality
  };

  const handleArchive = (id: number) => {
    console.log("Archive item:", id);
    // Implement archive functionality
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#486968] border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="rounded-lg bg-red-50 p-4 text-red-800">{error}</div>
      </div>
    );
  }

  const noDataMessage = (
    <tr>
      <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
        No {activeTab} found
      </td>
    </tr>
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Overview Dashboard</h1>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab("stores")}
            className={`rounded-lg px-4 py-2 ${
              activeTab === "stores"
                ? "bg-[#486968] text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Stores
          </button>
          <button
            onClick={() => setActiveTab("venues")}
            className={`rounded-lg px-4 py-2 ${
              activeTab === "venues"
                ? "bg-[#486968] text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Venues
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 bg-[#486968] text-white rounded-lg hover:bg-[#3a5454] transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#486968]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#486968]"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="available">Available</option>
              <option value="booked">Booked</option>
              <option value="unavailable">Unavailable</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#486968]"
            >
              <option value="all">All Types</option>
              <option value="internal">Internal</option>
              <option value="external">External</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {activeTab === "stores" ? (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Store Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owned By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </>
              ) : (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Venue Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Capacity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData().length > 0
              ? filteredData().map((item: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {activeTab === "stores" ? (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-gray-200">
                              <img
                                className="h-full w-full object-cover"
                                src={
                                  normalizePath(item.profilePicture) ||
                                  "/placeholder.svg"
                                }
                                alt={item.storeName}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {item.storeName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.vendor_name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.store_contact || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.store_location || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.storeCategory}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              item.store_status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {item.store_status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(item.store_createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            data-id={item.id}
                            onClick={() =>
                              setActiveDropdown(
                                activeDropdown === item.id ? null : item.id
                              )
                            }
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <MoreVertical className="h-5 w-5" />
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-gray-200">
                              <img
                                className="h-full w-full object-cover"
                                src={
                                  normalizePath(item.venue_profile_picture) ||
                                  "/placeholder.svg"
                                }
                                alt={item.venue_title}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {item.venue_title}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.vendor_name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.venue_location || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              item.venue_status === "available"
                                ? "bg-green-100 text-green-800"
                                : item.venue_status === "booked"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {item.venue_status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap capitalize">
                          {item.venue_type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.venue_contact || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.prices[0].capacity || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            data-id={item.venue_id}
                            onClick={() =>
                              setActiveDropdown(
                                activeDropdown === item.venue_id
                                  ? null
                                  : item.venue_id
                              )
                            }
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <MoreVertical className="h-5 w-5" />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              : noDataMessage}
          </tbody>
        </table>
      </div>

      {/* Dropdown menu rendered outside the table */}
      {activeDropdown !== null && dropdownPosition && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setActiveDropdown(null)}
        >
          <div
            className="absolute z-50 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="py-1" role="menu">
              <button
                onClick={() => {
                  handleEdit(activeDropdown);
                  setActiveDropdown(null);
                }}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </button>
              <button
                onClick={() => {
                  handleDelete(activeDropdown);
                  setActiveDropdown(null);
                }}
                className="flex w-full items-center px-4 py-2 text-sm text-red-700 hover:bg-gray-100 text-left"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  handleArchive(activeDropdown);
                  setActiveDropdown(null);
                }}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
              >
                Archive
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
