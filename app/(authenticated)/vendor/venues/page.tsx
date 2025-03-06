"use client";

import { useState, useEffect, useCallback } from "react";
import { CheckIcon } from "lucide-react";
import axios from "axios";
import { VenueCard } from "../../../components/card/venue-card";
import { secureStorage } from "@/app/utils/encryption";
import { protectRoute } from "@/app/utils/routeProtection";

const steps = [
  { id: 1, name: "Personal Details" },
  { id: 2, name: "Location" },
  { id: 3, name: "Pricing" },
  { id: 4, name: "Customize" },
  { id: 5, name: "Media Upload" },
];

interface VenueDetailsProps {
  venueTitle: string;
  setVenueTitle: (value: string) => void;
  venueDetails: string;
  setVenueDetails: (value: string) => void;
}

function VenueDetails({
  venueTitle,
  setVenueTitle,
  venueDetails,
  setVenueDetails,
}: VenueDetailsProps) {
  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="venueTitle"
          className="block text-sm font-medium text-gray-700"
        >
          Venue Title
        </label>
        <input
          id="venueTitle"
          type="text"
          value={venueTitle}
          onChange={(e) => setVenueTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#486968] focus:ring-[#486968]"
        />
      </div>
      <div>
        <label
          htmlFor="venueDetails"
          className="block text-sm font-medium text-gray-700"
        >
          Venue Details
        </label>
        <textarea
          id="venueDetails"
          value={venueDetails}
          onChange={(e) => {
            if (e.target.value.length <= 250) {
              setVenueDetails(e.target.value);
            }
          }}
          maxLength={250}
          className="mt-1 block w-full h-32 resize-none rounded-md border-gray-300 shadow-sm focus:border-[#486968] focus:ring-[#486968]"
          placeholder="Enter venue details (max 250 characters)"
        />
        <p className="mt-1 text-sm text-gray-500">
          {venueDetails.length}/250 characters
        </p>
      </div>
    </div>
  );
}

interface LocationContactProps {
  venueLocation: string;
  setVenueLocation: (value: string) => void;
  venueContact: string;
  setVenueContact: (value: string) => void;
  venueEmail: string;
  setVenueEmail: (value: string) => void;
}

function LocationContact({
  venueLocation,
  setVenueLocation,
  venueContact,
  setVenueContact,
  venueEmail,
  setVenueEmail,
}: LocationContactProps) {
  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="venueLocation"
          className="block text-sm font-medium text-gray-700"
        >
          Venue Location
        </label>
        <input
          id="venueLocation"
          type="text"
          value={venueLocation}
          onChange={(e) => setVenueLocation(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#486968] focus:ring-[#486968]"
        />
      </div>
      <div>
        <label
          htmlFor="venueContact"
          className="block text-sm font-medium text-gray-700"
        >
          Contact Number
        </label>
        <input
          id="venueContact"
          type="tel"
          value={venueContact}
          onChange={(e) => setVenueContact(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#486968] focus:ring-[#486968]"
        />
      </div>
      <div>
        <label
          htmlFor="venueEmail"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="venueEmail"
          type="email"
          value={venueEmail}
          onChange={(e) => setVenueEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#486968] focus:ring-[#486968]"
        />
      </div>
    </div>
  );
}

interface PricingCapacityProps {
  pricingTiers: { name: string; price: string; capacity: string }[];
  setPricingTiers: (
    tiers: { name: string; price: string; capacity: string }[]
  ) => void;
}

function PricingCapacity({
  pricingTiers,
  setPricingTiers,
}: PricingCapacityProps) {
  const addPricingTier = () => {
    setPricingTiers([
      ...pricingTiers,
      { name: `Package ${pricingTiers.length + 1}`, price: "", capacity: "" },
    ]);
  };

  const removePricingTier = (index: number) => {
    if (pricingTiers.length > 1) {
      setPricingTiers(pricingTiers.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900">Pricing Tiers</h3>
        <p className="text-sm text-gray-500">
          Define different pricing packages for your venue
        </p>
      </div>

      <div className="space-y-4">
        {pricingTiers.map((tier, index) => (
          <div key={index} className="relative p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Package Name
                </label>
                <input
                  type="text"
                  value={tier.name}
                  onChange={(e) => {
                    const newTiers = [...pricingTiers];
                    newTiers[index].name = e.target.value;
                    setPricingTiers(newTiers);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#486968] focus:ring-[#486968]"
                  placeholder="e.g., Basic Package"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price (₱)
                </label>
                <input
                  type="number"
                  value={tier.price}
                  onChange={(e) => {
                    const newTiers = [...pricingTiers];
                    newTiers[index].price = e.target.value;
                    setPricingTiers(newTiers);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#486968] focus:ring-[#486968]"
                  placeholder="Enter price"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Capacity
                </label>
                <input
                  type="number"
                  value={tier.capacity}
                  onChange={(e) => {
                    const newTiers = [...pricingTiers];
                    newTiers[index].capacity = e.target.value;
                    setPricingTiers(newTiers);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#486968] focus:ring-[#486968]"
                  placeholder="Enter capacity"
                  min="1"
                />
              </div>
            </div>
            {pricingTiers.length > 1 && (
              <button
                type="button"
                onClick={() => removePricingTier(index)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
                title="Remove package"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addPricingTier}
        className="mt-4 flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        Add More Pricing Options
      </button>
    </div>
  );
}

interface DocumentUploadProps {
  venueProfilePicture: File | null;
  setVenueProfilePicture: (file: File | null) => void;
  venueCoverPhoto: File | null;
  setVenueCoverPhoto: (file: File | null) => void;
}

function DocumentUpload({
  venueProfilePicture,
  setVenueProfilePicture,
  venueCoverPhoto,
  setVenueCoverPhoto,
}: DocumentUploadProps) {
  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="venueProfilePicture"
          className="block text-sm font-medium text-gray-700"
        >
          Profile Picture
        </label>
        <input
          id="venueProfilePicture"
          type="file"
          onChange={(e) => setVenueProfilePicture(e.target.files?.[0] || null)}
          className="mt-1 block w-full"
        />
      </div>
      <div>
        <label
          htmlFor="venueCoverPhoto"
          className="block text-sm font-medium text-gray-700"
        >
          Cover Photo
        </label>
        <input
          id="venueCoverPhoto"
          type="file"
          onChange={(e) => setVenueCoverPhoto(e.target.files?.[0] || null)}
          className="mt-1 block w-full"
        />
      </div>
    </div>
  );
}

interface MediaUploadProps {
  venueProfilePicture: File | null;
  setVenueProfilePicture: (file: File | null) => void;
  venueCoverPhoto: File | null;
  setVenueCoverPhoto: (file: File | null) => void;
}

function MediaUpload({
  venueProfilePicture,
  setVenueProfilePicture,
  venueCoverPhoto,
  setVenueCoverPhoto,
}: MediaUploadProps) {
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setVenueProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVenueCoverPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Media Upload</h3>
        <p className="text-sm text-gray-500 mb-6">
          Upload profile picture and cover photo for your venue
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Picture
          </label>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 border-2 border-gray-300 border-dashed rounded-full overflow-hidden">
              {profilePreview ? (
                <img
                  src={profilePreview}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No image
                </div>
              )}
            </div>
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#486968] file:text-white hover:file:bg-[#3a5453]"
              />
              <p className="mt-1 text-xs text-gray-500">
                Recommended: Square image, at least 300x300px
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Photo
          </label>
          <div className="flex items-center space-x-4">
            <div className="w-32 h-20 border-2 border-gray-300 border-dashed rounded-lg overflow-hidden">
              {coverPreview ? (
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No image
                </div>
              )}
            </div>
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverPhotoChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#486968] file:text-white hover:file:bg-[#3a5453]"
              />
              <p className="mt-1 text-xs text-gray-500">
                Recommended: 16:9 ratio, at least 1200x675px
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Venue {
  venue_id: number;
  venue_title: string;
  venue_owner: string;
  venue_location: string;
  venue_contact: string;
  venue_details: string;
  venue_status: string;
  venue_capacity: number;
  venue_type: string;
  venue_profile_picture: string | null;
  venue_cover_photo: string | null;
}

export default function VendorVenues() {
  const [currentStep, setCurrentStep] = useState(1);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [pricingTiers, setPricingTiers] = useState([
    { name: "Basic Package", price: "", capacity: "" },
    { name: "Standard Package", price: "", capacity: "" },
    { name: "Premium Package", price: "", capacity: "" },
  ]);

  // Venue form states
  const [venueTitle, setVenueTitle] = useState("");
  const [venueDetails, setVenueDetails] = useState("");
  const [venueLocation, setVenueLocation] = useState("");
  const [venueContact, setVenueContact] = useState("");
  const [venueEmail, setVenueEmail] = useState("");
  const [venueProfilePicture, setVenueProfilePicture] = useState<File | null>(
    null
  );
  const [venueCoverPhoto, setVenueCoverPhoto] = useState<File | null>(null);

  const fetchVenues = useCallback(async () => {
    try {
      const userData = secureStorage.getItem("user");
      if (!userData?.user_id) {
        throw new Error("User ID not found");
      }

      const response = await axios.get(
        `http://localhost/events-api/vendor.php?operation=getVenues&user_id=${userData.user_id}`
      );

      if (
        response.data.status === "success" &&
        Array.isArray(response.data.venues)
      ) {
        setVenues(response.data.venues);
      } else {
        setError(response.data.message || "Failed to fetch venues");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    protectRoute();
    fetchVenues();
  }, [fetchVenues]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();

    try {
      const userData = secureStorage.getItem("user");
      if (!userData?.user_id) {
        throw new Error("User ID not found");
      }

      // Add basic venue information
      formData.append("operation", "createVenue");
      formData.append("user_id", userData.user_id);
      formData.append("venue_title", venueTitle);
      formData.append("venue_details", venueDetails);
      formData.append("venue_location", venueLocation);
      formData.append("venue_contact", venueContact);
      formData.append("venue_email", venueEmail);
      formData.append("venue_status", "available");

      // Add pricing tiers
      pricingTiers.forEach((tier, index) => {
        formData.append(`pricing[${index}][name]`, tier.name);
        formData.append(`pricing[${index}][price]`, tier.price);
        formData.append(`pricing[${index}][capacity]`, tier.capacity);
      });

      // Add media files
      if (venueProfilePicture) {
        formData.append("venue_profile_picture", venueProfilePicture);
      }
      if (venueCoverPhoto) {
        formData.append("venue_cover_photo", venueCoverPhoto);
      }

      const response = await axios.post(
        "http://localhost/events-api/vendor.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === "success") {
        setShowModal(false);
        fetchVenues();
        // Reset form
        setVenueTitle("");
        setVenueDetails("");
        setVenueLocation("");
        setVenueContact("");
        setVenueEmail("");
        setVenueProfilePicture(null);
        setVenueCoverPhoto(null);
        setPricingTiers([
          { name: "Basic Package", price: "", capacity: "" },
          { name: "Standard Package", price: "", capacity: "" },
          { name: "Premium Package", price: "", capacity: "" },
        ]);
        setCurrentStep(1);
      } else {
        throw new Error(response.data.message || "Failed to create venue");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Venues</h1>
        <button
          onClick={() => setShowModal(true)}
          className="rounded-md bg-[#486968] px-4 py-2 text-white hover:bg-[#3a5453]"
        >
          Create Venue +
        </button>
      </div>

      {venues.length === 0 ? (
        <div className="flex h-[60vh] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center">
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            No venues
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new venue
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 rounded-md bg-[#486968] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a5453]"
          >
            Create Venue +
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {venues.map((venue) => (
            <VenueCard
              key={venue.venue_id}
              id={venue.venue_id}
              venueTitle={venue.venue_title}
              venueProfilePicture={venue.venue_profile_picture}
              venueCoverPhoto={venue.venue_cover_photo}
              venueLocation={venue.venue_location}
              venueType={venue.venue_type}
              venueStatus={venue.venue_status}
            />
          ))}
        </div>
      )}

      {/* Modal for venue creation */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
          <div className="relative w-full max-w-2xl rounded-lg bg-white p-6">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
            <div className="mb-8">
              <nav aria-label="Progress">
                <ol className="flex items-center">
                  {steps.map((step) => (
                    <li
                      key={step.id}
                      className={`relative ${
                        step.id !== steps.length ? "pr-8" : ""
                      } ${step.id !== 1 ? "pl-8" : ""}`}
                    >
                      <div
                        className="absolute inset-0 flex items-center"
                        aria-hidden="true"
                      >
                        <div
                          className={`h-0.5 w-full ${
                            currentStep > step.id
                              ? "bg-[#486968]"
                              : "bg-gray-200"
                          }`}
                        />
                      </div>
                      <div
                        className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                          currentStep > step.id
                            ? "bg-[#486968]"
                            : currentStep === step.id
                              ? "border-2 border-[#486968] bg-white"
                              : "border-2 border-gray-300 bg-white"
                        }`}
                      >
                        {currentStep > step.id ? (
                          <CheckIcon
                            className="h-5 w-5 text-white"
                            aria-hidden="true"
                          />
                        ) : (
                          <span
                            className={
                              currentStep === step.id
                                ? "text-[#486968]"
                                : "text-gray-500"
                            }
                          >
                            {step.id}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {currentStep === 1 && (
                <VenueDetails
                  venueTitle={venueTitle}
                  setVenueTitle={setVenueTitle}
                  venueDetails={venueDetails}
                  setVenueDetails={setVenueDetails}
                />
              )}
              {currentStep === 2 && (
                <LocationContact
                  venueLocation={venueLocation}
                  setVenueLocation={setVenueLocation}
                  venueContact={venueContact}
                  setVenueContact={setVenueContact}
                  venueEmail={venueEmail}
                  setVenueEmail={setVenueEmail}
                />
              )}
              {currentStep === 3 && (
                <PricingCapacity
                  pricingTiers={pricingTiers}
                  setPricingTiers={setPricingTiers}
                />
              )}
              {currentStep === 4 && (
                <DocumentUpload
                  venueProfilePicture={venueProfilePicture}
                  setVenueProfilePicture={setVenueProfilePicture}
                  venueCoverPhoto={venueCoverPhoto}
                  setVenueCoverPhoto={setVenueCoverPhoto}
                />
              )}
              {currentStep === 5 && (
                <MediaUpload
                  venueProfilePicture={venueProfilePicture}
                  setVenueProfilePicture={setVenueProfilePicture}
                  venueCoverPhoto={venueCoverPhoto}
                  setVenueCoverPhoto={setVenueCoverPhoto}
                />
              )}

              <div className="mt-6 flex justify-between">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                )}
                {currentStep < steps.length ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="ml-auto rounded-md bg-[#486968] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a5453]"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="ml-auto rounded-md bg-[#486968] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a5453]"
                  >
                    Create Venue
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
