"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  time: string;
  type:
    | "Wedding Event"
    | "Serot Opening"
    | "Family Reunion"
    | "Concert"
    | "Contest"
    | "LPG Explode Contest"
    | "Dionela Concert";
}

const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Naruto and Hinata Wedding Ceremony",
    date: "January 4, 2025",
    location: "Nazareth, Seda Hotel, 9000 Haha City",
    time: "10:00AM-5:00PM",
    type: "Wedding Event",
  },
  {
    id: "2",
    title: "Serot Opening",
    date: "January 12, 2025",
    location: "Nazareth, Seda Hotel, 9000 Haha City",
    time: "10:00AM-5:00PM",
    type: "Serot Opening",
  },
  {
    id: "3",
    title: "Family Reunion",
    date: "January 18, 2025",
    location: "Nazareth, Seda Hotel, 9000 Haha City",
    time: "10:00AM-5:00PM",
    type: "Family Reunion",
  },
  {
    id: "4",
    title: "Dionela Concert",
    date: "January 20, 2025",
    location: "Nazareth, Seda Hotel, 9000 Haha City",
    time: "10:00AM-5:00PM",
    type: "Dionela Concert",
  },
  {
    id: "5",
    title: "LPG Explode Contest",
    date: "January 27, 2025",
    location: "Nazareth, Seda Hotel, 9000 Haha City",
    time: "10:00AM-5:00PM",
    type: "LPG Explode Contest",
  },
];

export default function EventsPage() {
  const [view, setView] = useState<"Month" | "Week" | "Day">("Month");
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1));
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 0, 1));
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const phTime = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Manila" })
      );
      setCurrentDateTime(phTime);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "Wedding Event":
        return "bg-emerald-500 text-white";
      case "Serot Opening":
        return "bg-purple-500 text-white";
      case "Family Reunion":
        return "bg-amber-700 text-white";
      case "Dionela Concert":
        return "bg-emerald-500 text-white";
      case "LPG Explode Contest":
        return "bg-amber-700 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  const daysInPrevMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  ).getDate();

  const getEventsForDate = (date: Date) => {
    return sampleEvents.filter(
      (event) => new Date(event.date).toDateString() === date.toDateString()
    );
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendarContent = () => {
    switch (view) {
      case "Month":
        return renderMonthView();
      case "Week":
        return renderWeekView();
      case "Day":
        return renderDayView();
      default:
        return null;
    }
  };

  const renderMonthView = () => {
    const days = [];

    // Previous month days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      days.push(
        <div key={`prev-${day}`} className="h-28 border border-gray-100 p-2">
          <span className="text-gray-400">{day}</span>
        </div>
      );
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i
      );
      const events = getEventsForDate(date);
      const isToday = date.toDateString() === currentDateTime.toDateString();
      days.push(
        <div
          key={i}
          className={`h-28 border border-gray-100 p-2 cursor-pointer ${
            date.toDateString() === selectedDate.toDateString()
              ? "bg-gray-50"
              : ""
          }`}
          onClick={() => setSelectedDate(date)}
        >
          <span
            className={`font-medium ${
              isToday
                ? "bg-[#486968] text-white w-7 h-7 rounded-full flex items-center justify-center"
                : ""
            }`}
          >
            {i}
          </span>
          <div className="mt-1 space-y-1">
            {events.map((event) => (
              <div
                key={event.id}
                className={`text-xs px-2 py-1 rounded-sm ${getEventTypeColor(
                  event.type
                )}`}
                onClick={(e) => {
                  e.stopPropagation();
                  // TODO: Implement event click handler
                  console.log("Event clicked:", event);
                }}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Next month days
    const totalDays = days.length;
    for (let i = 1; totalDays + i <= 42; i++) {
      days.push(
        <div key={`next-${i}`} className="h-28 border border-gray-100 p-2">
          <span className="text-gray-400">{i}</span>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-px bg-white">
        {["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center py-2 text-sm font-medium text-gray-600"
          >
            {day}
          </div>
        ))}
        {days}
      </div>
    );
  };

  const renderWeekView = () => {
    // TODO: Implement week view
    return <div className="p-4">Week view coming soon...</div>;
  };

  const renderDayView = () => {
    // TODO: Implement day view
    return <div className="p-4">Day view coming soon...</div>;
  };

  return (
    <div className="h-screen flex flex-col w-[1230px]">
      {/* Fixed Header */}
      <div className="bg-gradient-to-br from-[#59928f] to-[#243f3e] text-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm">Date today</div>
            <h1 className="text-2xl font-semibold">
              {currentDateTime.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </h1>
            <div className="text-sm mt-2">
              You currently have {sampleEvents.length} events this month
            </div>
          </div>
          <div className="text-3xl font-bold">
            {currentDateTime.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              hour12: true,
            })}
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="flex-1 flex gap-6 p-6 min-h-0">
        {" "}
        {/* min-h-0 to enable flex child scrolling */}
        {/* Calendar Section */}
        <div className="flex-1 flex flex-col min-h-0">
          {" "}
          {/* min-h-0 to enable flex child scrolling */}
          {/* Fixed Calendar Navigation */}
          <div className="bg-gray-50 border-b shadow-sm">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigateMonth("prev")}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <div className="text-xl font-semibold">
                  {currentDate.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <button
                  onClick={() => navigateMonth("next")}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              <div className="flex gap-4 items-center">
                <div className="flex border rounded-md bg-white">
                  <button
                    className={`px-4 py-1.5 text-sm ${
                      view === "Month"
                        ? "bg-[#486968] text-white"
                        : "text-gray-600"
                    }`}
                    onClick={() => setView("Month")}
                  >
                    Month
                  </button>
                  <button
                    className={`px-4 py-1.5 text-sm border-x ${
                      view === "Week"
                        ? "bg-[#486968] text-white"
                        : "text-gray-600"
                    }`}
                    onClick={() => setView("Week")}
                  >
                    Week
                  </button>
                  <button
                    className={`px-4 py-1.5 text-sm ${
                      view === "Day"
                        ? "bg-[#486968] text-white"
                        : "text-gray-600"
                    }`}
                    onClick={() => setView("Day")}
                  >
                    Day
                  </button>
                </div>

                <Link href="/admin/events/createevent">
                  <button className="px-4 py-2 bg-[#486968] text-white rounded-md text-sm">
                    Create Event +
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {/* Scrollable Calendar Content */}
          <div className="overflow-auto flex-1 bg-white rounded-lg">
            {renderCalendarContent()}
          </div>
        </div>
        {/* Fixed Upcoming Events Section with Scrollable Content */}
        <div className="w-96 bg-gray-50 rounded-lg flex flex-col">
          <h2 className="text-lg font-semibold p-6 pb-4">Upcoming Events</h2>
          <div className="flex-1 overflow-auto px-6 pb-6">
            <div className="space-y-4">
              {sampleEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-4 p-4 border rounded-lg bg-white cursor-pointer hover:bg-gray-50"
                  onClick={() => {
                    console.log("Event clicked:", event);
                  }}
                >
                  <div
                    className={`w-1 self-stretch rounded-full ${
                      event.type === "Wedding Event" ||
                      event.type === "Dionela Concert"
                        ? "bg-emerald-500"
                        : event.type === "Serot Opening"
                        ? "bg-purple-500"
                        : "bg-amber-700"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <div className="text-sm text-gray-500 mt-1">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {event.time}
                          </div>
                          <div className="mt-1">📍 {event.location}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
