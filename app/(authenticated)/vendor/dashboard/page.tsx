"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Building2,
  Store,
  CheckCircle2,
  Activity,
} from "lucide-react";
import { secureStorage } from "@/app/utils/encryption";
import { protectRoute } from "@/app/utils/routeProtection";
import axios from "axios";

interface DashboardMetrics {
  venuesCreated: number;
  storesCreated: number;
  activeVenues: number;
  activeStores: number;
}

export default function VendorDashboard() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    venuesCreated: 0,
    storesCreated: 0,
    activeVenues: 0,
    activeStores: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userData = secureStorage.getItem("user");
        if (!userData?.user_id) {
          throw new Error("User ID not found");
        }

        // Fetch venues
        const venuesResponse = await axios.get(
          `http://localhost/events-api/vendor.php?operation=getVenues&user_id=${userData.user_id}`
        );

        // Fetch stores
        const storesResponse = await axios.get(
          `http://localhost/events-api/vendor.php?operation=getStores&user_id=${userData.user_id}`
        );

        if (
          venuesResponse.data.status === "success" &&
          storesResponse.data.status === "success"
        ) {
          const venues = venuesResponse.data.venues || [];
          const stores = storesResponse.data.stores || [];

          setMetrics({
            venuesCreated: venues.length,
            storesCreated: stores.length,
            activeVenues: venues.filter((v) => v.venue_status === "available")
              .length,
            activeStores: stores.filter((s) => s.store_status === "active")
              .length,
          });
        }

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const dashboardMetrics = [
    {
      title: "Venues Created",
      value: metrics.venuesCreated.toString(),
      change: "Total",
      trend: "up",
      bgColor: "bg-[#486968]",
      icon: Building2,
    },
    {
      title: "Stores Created",
      value: metrics.storesCreated.toString(),
      change: "Total",
      trend: "up",
      bgColor: "bg-gray-900",
      icon: Store,
    },
    {
      title: "Active Venues",
      value: metrics.activeVenues.toString(),
      change: "Available",
      trend: "up",
      bgColor: "bg-white",
      textColor: "text-gray-900",
      icon: CheckCircle2,
    },
    {
      title: "Active Stores",
      value: metrics.activeStores.toString(),
      change: "Active",
      trend: "up",
      bgColor: "bg-white",
      textColor: "text-gray-900",
      icon: Activity,
    },
  ];

  const reviews = {
    positive: 80,
    neutral: 17,
    negative: 3,
    total: "1,065",
  };

  const events = [
    {
      title: "Wedding Reception at Grand Ballroom",
      time: "22 DEC 7:20 PM",
      color: "bg-green-500",
    },
    {
      title: "Corporate Seminar at Conference Center",
      time: "21 DEC 11:21 PM",
      color: "bg-blue-500",
    },
    {
      title: "Birthday Party at Garden Pavilion",
      time: "21 DEC 9:28 PM",
      color: "bg-[#486968]",
    },
    {
      title: "Product Launch at Exhibition Hall",
      time: "20 DEC 3:52 PM",
      color: "bg-purple-500",
    },
    {
      title: "Charity Gala at Rooftop Terrace",
      time: "19 DEC 11:35 PM",
      color: "bg-indigo-500",
    },
  ];

  // Calendar functions
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

  const lastDayOfPrevMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  ).getDate();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const isToday = (date: number) => {
    const today = new Date();
    return (
      date === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: number) => {
    return (
      date === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  const getDayElement = (dayIndex: number, isCurrentMonth = true) => {
    const className = `h-8 w-8 rounded-full flex items-center justify-center text-sm transition-colors ${
      !isCurrentMonth
        ? "text-gray-400"
        : isSelected(dayIndex)
          ? "bg-[#486968] text-white"
          : isToday(dayIndex)
            ? "font-semibold"
            : "hover:bg-[#486968]/10"
    }`;

    return (
      <button
        key={`${isCurrentMonth ? "current" : "other"}-${dayIndex}`}
        className={className}
        onClick={() =>
          isCurrentMonth &&
          setSelectedDate(
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              dayIndex
            )
          )
        }
        disabled={!isCurrentMonth}
      >
        {dayIndex}
      </button>
    );
  };

  const renderCalendarDays = () => {
    const days = [];

    // Previous month days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push(getDayElement(lastDayOfPrevMonth - i, false));
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(getDayElement(i));
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 rows × 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      days.push(getDayElement(i, false));
    }

    return days;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div
              key={index}
              className={`rounded-xl p-6 ${metric.bgColor} ${metric.textColor || "text-white"}`}
            >
              <div className="flex items-center justify-between">
                <IconComponent className="h-8 w-8" strokeWidth={1.5} />
                <div className="flex items-center gap-1 text-sm">
                  {metric.change}
                  {metric.trend === "up" ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  )}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-bold">{metric.value}</p>
                <p className="text-sm opacity-80">{metric.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Feedbacks</h2>
          </div>

          <div className="flex flex-col items-center justify-center py-8">
            <span className="text-6xl mb-4">😊</span>
            <p className="text-gray-500 text-center">
              No feedbacks available yet
            </p>
          </div>

          <div className="mt-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Activity Logs</h2>
            </div>

            <div className="flex flex-col items-center justify-center py-8">
              <span className="text-6xl mb-4">📝</span>
              <p className="text-gray-500 text-center">
                No activity logs available yet
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex gap-1">
                <button
                  onClick={prevMonth}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {days.map((day) => (
                <div
                  key={day}
                  className="h-8 flex items-center justify-center text-xs font-medium text-gray-500"
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
          </div>
          <div className="rounded-xl bg-white p-6">
            <h3 className="text-md font-semibold mb-4">Upcoming Events</h3>
            <div className="flex flex-col items-center justify-center py-8">
              <span className="text-6xl mb-4">📅</span>
              <p className="text-gray-500 text-center">
                No upcoming events yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
