"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import { ArrowLeft, CheckIcon } from "lucide-react";
import Link from "next/link";
import axios from "axios";

const steps = [
  { id: 1, name: "Event Details" },
  { id: 2, name: "Budget" },
  { id: 3, name: "Vendors & Services" },
  { id: 4, name: "Venues" },
  { id: 5, name: "Review & Confirm" },
];

const sampleVendors = [
  { id: 1, name: "Catering Co.", type: "catering" },
  { id: 2, name: "DJ Services", type: "entertainment" },
  { id: 3, name: "Floral Designs", type: "decor" },
  { id: 4, name: "Hair & Makeup Studio", type: "beauty" },
];

const sampleVenues = [
  { id: 1, name: "Grand Ballroom", capacity: 500 },
  { id: 2, name: "Garden Terrace", capacity: 200 },
  { id: 3, name: "Beachfront Resort", capacity: 300 },
  { id: 4, name: "City View Rooftop", capacity: 150 },
];

interface EventDetailsProps {
  firstName: string;
  setFirstName: Dispatch<SetStateAction<string>>;
  lastName: string;
  setLastName: Dispatch<SetStateAction<string>>;
  suffix: string;
  setSuffix: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  eventName: string;
  setEventName: Dispatch<SetStateAction<string>>;
  eventType: string;
  setEventType: Dispatch<SetStateAction<string>>;
  eventDate: string;
  setEventDate: Dispatch<SetStateAction<string>>;
}

function EventDetails({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  suffix,
  setSuffix,
  email,
  setEmail,
  eventName,
  setEventName,
  eventType,
  setEventType,
  eventDate,
  setEventDate,
}: EventDetailsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#486968]"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#486968]"
          />
        </div>
      </div>
      <div>
        <input
          type="text"
          placeholder="Suffix (optional)"
          value={suffix}
          onChange={(e) => setSuffix(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#486968]"
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#486968]"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            placeholder="Event name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#486968]"
          />
        </div>
        <div>
          <select
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#486968]"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="" disabled>
              Event type
            </option>
            <option value="wedding">Wedding Event</option>
            <option value="concert">Concert</option>
            <option value="reunion">Family Reunion</option>
            <option value="corporate">Corporate Event</option>
          </select>
        </div>
      </div>
      <div>
        <input
          type="datetime-local"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#486968]"
        />
      </div>
    </div>
  );
}

interface BudgetProps {
  totalBudget: string;
  setTotalBudget: Dispatch<SetStateAction<string>>;
  budgetRange: string;
  setBudgetRange: Dispatch<SetStateAction<string>>;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  paymentMethod: string;
  setPaymentMethod: Dispatch<SetStateAction<string>>;
}

function Budget({
  totalBudget,
  setTotalBudget,
  budgetRange,
  setBudgetRange,
  status,
  setStatus,
  paymentMethod,
  setPaymentMethod,
}: BudgetProps) {
  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="totalBudget"
          className="block text-sm font-medium text-gray-700"
        >
          Total Budget (P)
        </label>
        <input
          type="number"
          id="totalBudget"
          value={totalBudget}
          onChange={(e) => setTotalBudget(e.target.value)}
          className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#486968]"
        />
      </div>
      <div>
        <label
          htmlFor="budgetRange"
          className="block text-sm font-medium text-gray-700"
        >
          Budget Range
        </label>
        <select
          id="budgetRange"
          value={budgetRange}
          onChange={(e) => setBudgetRange(e.target.value)}
          className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#486968]"
        >
          <option value="">Select a range</option>
          <option value="0-50000">P0 - P50,000</option>
          <option value="50001-100000">P50,001 - P100,000</option>
          <option value="100001-200000">P100,001 - P200,000</option>
          <option value="200001+">P200,001+</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#486968]"
        >
          <option value="">Select a status</option>
          <option value="pending">Pending</option>
          <option value="partiallyPaid">Partially Paid</option>
          <option value="fullyPaid">Fully Paid</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="paymentMethod"
          className="block text-sm font-medium text-gray-700"
        >
          Payment Method
        </label>
        <select
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#486968]"
        >
          <option value="">Select a payment method</option>
          <option value="cash">Cash</option>
          <option value="bankTransfer">Bank Transfer</option>
          <option value="creditCard">Credit Card</option>
        </select>
      </div>
    </div>
  );
}

interface Vendor {
  id: number;
  name: string;
  type: string;
}

interface VendorsAndServicesProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  selectedVendors: number[];
  setSelectedVendors: Dispatch<SetStateAction<number[]>>;
  filterType: string;
  setFilterType: Dispatch<SetStateAction<string>>;
  sampleVendors: Vendor[];
}

function VendorsAndServices({
  searchTerm,
  setSearchTerm,
  selectedVendors,
  setSelectedVendors,
  filterType,
  setFilterType,
  sampleVendors,
}: VendorsAndServicesProps) {
  const filteredVendors = sampleVendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === "" || vendor.type === filterType)
  );

  const toggleVendor = (id: number) => {
    setSelectedVendors((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search for vendors"
        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#486968]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex space-x-2">
        <button
          className={`px-4 py-2 rounded-md ${
            filterType === "" ? "bg-[#486968] text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilterType("")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            filterType === "catering"
              ? "bg-[#486968] text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setFilterType("catering")}
        >
          Catering
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            filterType === "entertainment"
              ? "bg-[#486968] text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setFilterType("entertainment")}
        >
          Entertainment
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            filterType === "decor" ? "bg-[#486968] text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilterType("decor")}
        >
          Decor
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            filterType === "beauty" ? "bg-[#486968] text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilterType("beauty")}
        >
          Beauty
        </button>
      </div>
      <div className="space-y-2">
        {filteredVendors.map((vendor) => (
          <div key={vendor.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`vendor-${vendor.id}`}
              checked={selectedVendors.includes(vendor.id)}
              onChange={() => toggleVendor(vendor.id)}
            />
            <label htmlFor={`vendor-${vendor.id}`}>{vendor.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

interface Venue {
  id: number;
  name: string;
  capacity: number;
}

interface VenuesProps {
  selectedVenue: number | null;
  setSelectedVenue: Dispatch<SetStateAction<number | null>>;
  sampleVenues: Venue[];
}

function Venues({
  selectedVenue,
  setSelectedVenue,
  sampleVenues,
}: VenuesProps) {
  return (
    <>
      <h3 className="text-lg font-semibold">Select a Venue</h3>
      {sampleVenues.map((venue) => (
        <div key={venue.id} className="flex items-center space-x-2">
          <input
            type="radio"
            id={`venue-${venue.id}`}
            name="venue"
            checked={selectedVenue === venue.id}
            onChange={() => setSelectedVenue(venue.id)}
          />
          <label htmlFor={`venue-${venue.id}`}>
            {venue.name} (Capacity: {venue.capacity})
          </label>
        </div>
      ))}
    </>
  );
}

interface ReviewAndConfirmProps {
  eventName: string;
  eventType: string;
  eventDate: string;
  totalBudget: string;
  budgetRange: string;
  status: string;
  paymentMethod: string;
  selectedVendors: number[];
  selectedVenue: number | null;
  sampleVendors: Vendor[];
  sampleVenues: Venue[];
  isConfirmed: boolean;
  setIsConfirmed: Dispatch<SetStateAction<boolean>>;
}

function ReviewAndConfirm({
  eventName,
  eventType,
  eventDate,
  totalBudget,
  budgetRange,
  status,
  paymentMethod,
  selectedVendors,
  selectedVenue,
  sampleVendors,
  sampleVenues,
  isConfirmed,
  setIsConfirmed,
}: ReviewAndConfirmProps) {
  return (
    <>
      <h3 className="text-lg font-semibold">Review Your Event Details</h3>
      <p>Please review all the information you've provided for your event.</p>
      <div className="mt-4 space-y-2">
        <p>
          <strong>Event Name:</strong> {eventName}
        </p>
        <p>
          <strong>Event Type:</strong> {eventType}
        </p>
        <p>
          <strong>Event Date:</strong> {eventDate}
        </p>
        <p>
          <strong>Total Budget:</strong> {totalBudget}
        </p>
        <p>
          <strong>Budget Range:</strong> {budgetRange}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>
          <strong>Payment Method:</strong> {paymentMethod}
        </p>
        <p>
          <strong>Selected Vendors:</strong>{" "}
          {selectedVendors
            .map((id) => sampleVendors.find((v) => v.id === id)?.name)
            .join(", ")}
        </p>
        <p>
          <strong>Selected Venue:</strong>{" "}
          {sampleVenues.find((v) => v.id === selectedVenue)?.name}
        </p>
      </div>
      <div className="mt-4">
        <label htmlFor="confirmCheck" className="flex items-center">
          <input
            type="checkbox"
            id="confirmCheck"
            checked={isConfirmed}
            onChange={(e) => setIsConfirmed(e.target.checked)}
            className="mr-2"
          />
          <span>I confirm that all the information provided is correct.</span>
        </label>
      </div>
    </>
  );
}

export default function NewEventPage() {
  const [currentStep, setCurrentStep] = useState(1);

  // Event Details state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [email, setEmail] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState("");

  // Budget state
  const [totalBudget, setTotalBudget] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [status, setStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  // Vendors & Services state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVendors, setSelectedVendors] = useState<number[]>([]);
  const [filterType, setFilterType] = useState("");

  // Venues state
  const [selectedVenue, setSelectedVenue] = useState<number | null>(null);

  // Review & Confirm state
  const [isConfirmed, setIsConfirmed] = useState(false);

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

  const API_ENDPOINT = "http://localhost/events-api/admin.php";

  const handleSubmit = async () => {
    if (isConfirmed) {
      try {
        const response = await axios.post(API_ENDPOINT, {
          operation: "createEvent",
          title: eventName,
          date: eventDate,
          timeIn: eventDate, // Assuming eventDate includes time
          timeOut: eventDate, // You might want to add a separate field for end time
          type: eventType,
          budget: totalBudget,
          event_vendor: 1, // Add a default vendor ID to satisfy the foreign key constraint
          event_venue: selectedVenue, // Use the correct field name for venue
          created_by: 1, // You should replace this with the actual user ID
        });

        if (response.data.status === "success") {
          alert("Event created successfully!");
          // You can add navigation logic here to redirect after successful submission
        } else {
          alert("Error creating event: " + response.data.message);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while submitting the form.");
      }
    } else {
      alert(
        "Please confirm that the information is correct before submitting."
      );
    }
  };

  return (
    <div className="min-h-screen w-full max-w-[1230px] p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/admin/events"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Link>
        <h1 className="text-2xl font-semibold mt-4">Event Creation</h1>
      </div>

      {/* White Container */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="relative">
            {/* Connecting Lines */}
            <div className="absolute top-5 left-0 right-0 flex justify-between px-[3rem]">
              {steps.slice(0, -1).map((_, index) => (
                <div
                  key={index}
                  className={`h-[2px] w-full ${
                    currentStep > index + 1 ? "bg-[#486968]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Steps */}
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

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <div className="space-y-4">
            {currentStep === 1 && (
              <EventDetails
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                suffix={suffix}
                setSuffix={setSuffix}
                email={email}
                setEmail={setEmail}
                eventName={eventName}
                setEventName={setEventName}
                eventType={eventType}
                setEventType={setEventType}
                eventDate={eventDate}
                setEventDate={setEventDate}
              />
            )}
            {currentStep === 2 && (
              <Budget
                totalBudget={totalBudget}
                setTotalBudget={setTotalBudget}
                budgetRange={budgetRange}
                setBudgetRange={setBudgetRange}
                status={status}
                setStatus={setStatus}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            )}
            {currentStep === 3 && (
              <VendorsAndServices
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedVendors={selectedVendors}
                setSelectedVendors={setSelectedVendors}
                filterType={filterType}
                setFilterType={setFilterType}
                sampleVendors={sampleVendors}
              />
            )}
            {currentStep === 4 && (
              <Venues
                selectedVenue={selectedVenue}
                setSelectedVenue={setSelectedVenue}
                sampleVenues={sampleVenues}
              />
            )}
            {currentStep === 5 && (
              <ReviewAndConfirm
                eventName={eventName}
                eventType={eventType}
                eventDate={eventDate}
                totalBudget={totalBudget}
                budgetRange={budgetRange}
                status={status}
                paymentMethod={paymentMethod}
                selectedVendors={selectedVendors}
                selectedVenue={selectedVenue}
                sampleVendors={sampleVendors}
                sampleVenues={sampleVenues}
                isConfirmed={isConfirmed}
                setIsConfirmed={setIsConfirmed}
              />
            )}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            {currentStep > 1 && (
              <button
                onClick={prevStep}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Previous
              </button>
            )}
            {currentStep === 1 && (
              <Link href="/admin/events">
                <button className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                  Cancel
                </button>
              </Link>
            )}
            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-[#486968] text-white rounded-md hover:bg-[#3a5453]"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-[#486968] text-white rounded-md hover:bg-[#3a5453]"
                disabled={!isConfirmed}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
