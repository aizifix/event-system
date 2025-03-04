"use client";

import { useState, useEffect, useCallback } from "react";
import { CheckIcon } from "lucide-react";
import axios from "axios";
import { VenueCard } from "../../../components/card/venue-card";

const steps = [
  { id: 1, name: "Venue Details" },
  { id: 2, name: "Contact Information" },
  { id: 3, name: "Pricing & Capacity" },
  { id: 4, name: "Location" },
  { id: 5, name: "Document Upload" },
  { id: 6, name: "Review" },
];

interface VenueDetailsProps {
  venueTitle: string;
  setVenueTitle: (value: string) => void;
  venueOwner: string;
  setVenueOwner: (value: string) => void;
  venueDetails: string;
  setVenueDetails: (value: string) => void;
  venueType: string;
  setVenueType: (value: string) => void;
}

function VenueDetails({
  venueTitle,
  setVenueTitle,
  venueOwner,
  setVenueOwner,
  venueDetails,
  setVenueDetails,
  venueType,
  setVenueType,
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
          htmlFor="venueOwner"
          className="block text-sm font-medium text-gray-700"
        >
          Venue Owner
        </label>
        <input
          id="venueOwner"
          type="text"
          value={venueOwner}
          onChange={(e) => setVenueOwner(e.target.value)}
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
          onChange={(e) => setVenueDetails(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#486968] focus:ring-[#486968]"
          rows={4}
        />
      </div>
      <div>
        <label
          htmlFor="venueType"
          className="block text-sm font-medium text-gray-700"
        >
          Venue Type
        </label>
        <select
          id="venueType"
          value={venueType}
          onChange={(e) => setVenueType(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#486968] focus:ring-[#486968]"
        >
          <option value="internal">Internal</option>
          <option value="external">External</option>
        </select>
      </div>
    </div>
  );
}

interface ContactInformationProps {
  venueContact: string;
  setVenueContact: (value: string) => void;
}

function ContactInformation({
  venueContact,
  setVenueContact,
}: ContactInformationProps) {
  return (
    <div className="space-y-4">
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
    </div>
  );
}

interface PricingCapacityProps {
  venuePriceMin: string;
  setVenuePriceMin: (value: string) => void;
  venuePriceMax: string;
  setVenuePriceMax: (value: string) => void;
  venueCapacity: string;
  setVenueCapacity: (value: string) => void;
}

function PricingCapacity({
  venuePriceMin,
  setVenuePriceMin,
  venuePriceMax,
  setVenuePriceMax,
  venueCapacity,
  setVenueCapacity,
}: PricingCapacityProps) {
  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="venuePriceMin"
          className="block text-sm font-medium text-gray-700"
        >
          Minimum Price
        </label>
        <input
          id="venuePriceMin"
          type="number"
          value={venuePriceMin}
          onChange={(e) => setVenuePriceMin(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#486968] focus:ring-[#486968]"
        />
      </div>
      <div>
        <label
          htmlFor="venuePriceMax"
          className="block text-sm font-medium text-gray-700"
        >
          Maximum Price
        </label>
        <input
          id="venuePriceMax"
          type="number"
          value={venuePriceMax}
          onChange={(e) => setVenuePriceMax(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#486968] focus:ring-[#486968]"
        />
      </div>
      <div>
        <label
          htmlFor="venueCapacity"
          className="block text-sm font-medium text-gray-700"
        >
          Venue Capacity
        </label>
        <input
          id="venueCapacity"
          type="number"
          value={venueCapacity}
          onChange={(e) => setVenueCapacity(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#486968] focus:ring-[#486968]"
        />
      </div>
    </div>
  );
}

interface LocationProps {
  venueLocation: string;
  setVenueLocation: (value: string) => void;
}

function Location({ venueLocation, setVenueLocation }: LocationProps) {
  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="venueLocation"
          className="block text-sm font-medium text-gray-700"
        >
          Venue Location
        </label>
        <textarea
          id="venueLocation"
          value={venueLocation}
          onChange={(e) => setVenueLocation(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#486968] focus:ring-[#486968]"
          rows={4}
        />
      </div>
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

interface Venue {
  venue_id: number;
  venue_title: string;
  venue_owner: string;
  venue_location: string;
  venue_contact: string;
  venue_status: string;
  venue_price_min: number;
  venue_price_max: number;
  venue_capacity: number;
  venue_type: string;
  venue_profile_picture: string | null;
  venue_cover_photo: string | null;
}

export default function VendorVenueCreation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [venueTitle, setVenueTitle] = useState("");
  const [venueOwner, setVenueOwner] = useState("");
  const [venueDetails, setVenueDetails] = useState("");
  const [venueType, setVenueType] = useState("internal");
  const [venueContact, setVenueContact] = useState("");
  const [venuePriceMin, setVenuePriceMin] = useState("");
  const [venuePriceMax, setVenuePriceMax] = useState("");
  const [venueCapacity, setVenueCapacity] = useState("");
  const [venueLocation, setVenueLocation] = useState("");
  const [venueProfilePicture, setVenueProfilePicture] = useState<File | null>(
    null
  );
  const [venueCoverPhoto, setVenueCoverPhoto] = useState<File | null>(null);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchVenues = useCallback(async () => {
    try {
      setLoading(true);
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setError("User ID not found. Please log in.");
        return;
      }

      const user = JSON.parse(storedUser);
      const userId = user.user_id;

      if (!userId) {
        setError("User ID not found. Please log in.");
        return;
      }

      console.log("Fetching venues with user ID:", userId);
      const response = await axios.get(
        "http://localhost/events-api/vendor.php",
        {
          params: { operation: "getVenues", user_id: userId },
        }
      );

      if (response.data.status === "success") {
        console.log("Fetched Venues:", response.data.venues);
        setVenues(response.data.venues);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching venues:", error);
      setError("Failed to fetch venues.");
    } finally {
      setLoading(false);
    }
  }, []);

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user?.user_id;

      if (!userId) {
        alert("User is not logged in. Please log in first.");
        return;
      }

      formData.append("operation", "createVenue");
      formData.append("user_id", userId.toString());
      formData.append("venue_title", venueTitle);
      formData.append("venue_owner", venueOwner);
      formData.append("venue_location", venueLocation);
      formData.append("venue_contact", venueContact);
      formData.append("venue_details", venueDetails);
      formData.append("venue_price_min", venuePriceMin);
      formData.append("venue_price_max", venuePriceMax);
      formData.append("venue_capacity", venueCapacity);
      formData.append("venue_type", venueType);

      if (venueProfilePicture)
        formData.append("venue_profile_picture", venueProfilePicture);
      if (venueCoverPhoto)
        formData.append("venue_cover_photo", venueCoverPhoto);

      //   console.log("Submitting Form Data:", Object.fromEntries(formData.entries()))

      const response = await axios.post(
        "http://localhost/events-api/vendor.php",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      //   console.log("Response:", response.data)

      if (response.data.status === "success") {
        alert("Venue created successfully!");
        closeModal();
        fetchVenues();
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      //   console.error("Error submitting form:", error)
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Venues</h1>
        <button
          onClick={openModal}
          className="rounded bg-[#486968] px-4 py-2 text-white hover:bg-[#3a5453]"
        >
          Create Venue +
        </button>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#486968] border-t-transparent"></div>
        </div>
      ) : error ? (
        <div className="rounded-lg bg-red-50 p-4 text-red-800">{error}</div>
      ) : venues.length === 0 ? (
        <div className="rounded-lg bg-gray-50 p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900">No venues yet</h3>
          <p className="mt-1 text-gray-500">
            Get started by creating a new venue.
          </p>
          <button
            onClick={openModal}
            className="mt-4 rounded bg-[#486968] px-4 py-2 text-white hover:bg-[#3a5453]"
          >
            Create Venue
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {venues.map((venue) => (
            <VenueCard
              key={venue.venue_id}
              id={venue.venue_id}
              venueTitle={venue.venue_title}
              venueProfilePicture={venue.venue_profile_picture}
              venueCoverPhoto={venue.venue_cover_photo}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Create Your Venue</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            <div className="mb-8">
              <div className="relative">
                <div className="absolute top-5 left-0 right-0 flex justify-between px-[3rem]">
                  {steps.slice(0, -1).map((_, index) => (
                    <div
                      key={index}
                      className={`h-[2px] w-full ${currentStep > index + 1 ? "bg-[#486968]" : "bg-gray-300"}`}
                    />
                  ))}
                </div>

                <ul className="flex justify-between relative z-10">
                  {steps.map((step, index) => (
                    <li key={step.id} className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                          currentStep > index + 1
                            ? "border-[#486968] bg-[#486968] text-white"
                            : currentStep === index + 1
                              ? "border-[#486968] bg-[#486968] text-white"
                              : "border-gray-300 bg-gray-300 text-gray-600"
                        }`}
                      >
                        {currentStep > index + 1 ? (
                          <CheckIcon className="w-5 h-5" />
                        ) : (
                          <span className="text-sm">{index + 1}</span>
                        )}
                      </div>
                      <span className="text-sm mt-2">{step.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mb-8">
              {currentStep === 1 && (
                <VenueDetails
                  venueTitle={venueTitle}
                  setVenueTitle={setVenueTitle}
                  venueOwner={venueOwner}
                  setVenueOwner={setVenueOwner}
                  venueDetails={venueDetails}
                  setVenueDetails={setVenueDetails}
                  venueType={venueType}
                  setVenueType={setVenueType}
                />
              )}
              {currentStep === 2 && (
                <ContactInformation
                  venueContact={venueContact}
                  setVenueContact={setVenueContact}
                />
              )}
              {currentStep === 3 && (
                <PricingCapacity
                  venuePriceMin={venuePriceMin}
                  setVenuePriceMin={setVenuePriceMin}
                  venuePriceMax={venuePriceMax}
                  setVenuePriceMax={setVenuePriceMax}
                  venueCapacity={venueCapacity}
                  setVenueCapacity={setVenueCapacity}
                />
              )}
              {currentStep === 4 && (
                <Location
                  venueLocation={venueLocation}
                  setVenueLocation={setVenueLocation}
                />
              )}
              {currentStep === 5 && (
                <DocumentUpload
                  venueProfilePicture={venueProfilePicture}
                  setVenueProfilePicture={setVenueProfilePicture}
                  venueCoverPhoto={venueCoverPhoto}
                  setVenueCoverPhoto={setVenueCoverPhoto}
                />
              )}
              {currentStep === 6 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Review Your Venue Details
                  </h3>
                  <p>
                    <strong>Venue Title:</strong> {venueTitle}
                  </p>
                  <p>
                    <strong>Venue Owner:</strong> {venueOwner}
                  </p>
                  <p>
                    <strong>Venue Type:</strong> {venueType}
                  </p>
                  <p>
                    <strong>Contact Number:</strong> {venueContact}
                  </p>
                  <p>
                    <strong>Price Range:</strong> ${venuePriceMin} - $
                    {venuePriceMax}
                  </p>
                  <p>
                    <strong>Capacity:</strong> {venueCapacity}
                  </p>
                  <p>
                    <strong>Location:</strong> {venueLocation}
                  </p>
                  <p>
                    <strong>Venue Details:</strong> {venueDetails}
                  </p>
                  <p>
                    <strong>Documents Uploaded:</strong>
                  </p>
                  <ul className="list-disc list-inside">
                    <li>
                      Profile Picture:{" "}
                      {venueProfilePicture
                        ? venueProfilePicture.name
                        : "Not uploaded"}
                    </li>
                    <li>
                      Cover Photo:{" "}
                      {venueCoverPhoto ? venueCoverPhoto.name : "Not uploaded"}
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="flex justify-between">
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </button>
              )}
              {currentStep < steps.length ? (
                <button
                  onClick={nextStep}
                  className="px-4 py-2 bg-[#486968] text-white rounded hover:bg-[#3a5453]"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-[#486968] text-white rounded hover:bg-[#3a5453]"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
