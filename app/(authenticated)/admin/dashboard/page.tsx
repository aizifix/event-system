"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const revenueData = [
  { day: "Mon", current: 4000, previous: 5000 },
  { day: "Tue", current: 8000, previous: 7000 },
  { day: "Wed", current: 5000, previous: 8000 },
  { day: "Thu", current: 11000, previous: 9000 },
  { day: "Fri", current: 16000, previous: 10000 },
  { day: "Sat", current: 9000, previous: 13000 },
  { day: "Sun", current: 14000, previous: 12000 },
];

// Total Sales Data for Donut Chart
const totalSalesData = [
  { name: "Completed", value: 120 },
  { name: "Pending", value: 50 },
  { name: "Canceled", value: 30 },
];

const COLORS = ["#1EC47A", "#A0AEC0", "#FFD700"]; // Green, Gray, Gold for Sales Data

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user?.user_role || user.user_role !== "Admin") {
      router.push("/auth/login");
    }
  }, [router]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      {/* Main container - flex column */}
      <div className="flex flex-col gap-4 w-[1200px]">
        {/* Top section - metrics and revenue */}
        <div className="flex gap-4">
          {/* Left side - metrics grid */}
          <div className="flex flex-wrap gap-4 w-[360px] h-[360px]">
            {/* Events Created */}
            <div className="bg-gradient-to-br from-[#3f6462] to-[#243f3e] p-4 rounded-lg w-[calc(50%-8px)] flex flex-col justify-between">
              <div>
                <h3 className="text-white text-mb mb-2">Events Created</h3>
                <p className="text-white text-2xl font-bold">28</p>
              </div>
              <a className="text-white text-sm cursor-pointer hover:underline">
                View Details
              </a>
            </div>

            {/* Services */}
            <div className="bg-gradient-to-br from-[#3f6462] to-[#243f3e] p-4 rounded-lg w-[calc(50%-8px)] flex flex-col justify-between">
              <div>
                <h3 className="text-white text-mb mb-2">Services</h3>
                <p className="text-white text-2xl font-bold">30</p>
              </div>
              <a className="text-white text-sm cursor-pointer hover:underline">
                View Details
              </a>
            </div>

            {/* Earnings */}
            <div className="bg-gradient-to-br from-[#3f6462] to-[#243f3e] p-4 rounded-lg w-[calc(50%-8px)] flex flex-col justify-between">
              <div>
                <h3 className="text-white text-mb mb-2">Earnings</h3>
                <p className="text-white text-2xl font-bold">P1,252,480</p>
              </div>
              <a className="text-white text-sm cursor-pointer hover:underline">
                View Details
              </a>
            </div>

            {/* Vendors */}
            <div className="bg-gradient-to-br from-[#3f6462] to-[#243f3e] p-4 rounded-lg w-[calc(50%-8px)] flex flex-col justify-between">
              <div>
                <h3 className="text-white text-mb mb-2">Vendors</h3>
                <p className="text-white text-2xl font-bold">10</p>
              </div>
              <a className="text-white text-sm cursor-pointer hover:underline">
                View Details
              </a>
            </div>
          </div>

          {/* Right side - revenue chart */}
          <div className="flex-1 bg-gradient-to-br from-[#3f6462] to-[#243f3e] p-4 rounded-lg">
            <h3 className="text-white text-mb font-semibold mb-2">Revenue</h3>

            {/* Revenue Line Chart */}
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={revenueData}
                margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
              >
                <defs>
                  <linearGradient id="currentWeek" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1EC47A" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#1EC47A" stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient id="previousWeek" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.2} />
                  </linearGradient>
                </defs>

                <XAxis dataKey="day" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
                <Tooltip />
                <Legend
                  formatter={(value) => {
                    if (value === "current")
                      return (
                        <span style={{ color: "#FFFFFF" }}>Current Week</span>
                      );
                    if (value === "previous")
                      return (
                        <span style={{ color: "#FFFFFF" }}>Previous Week</span>
                      );
                    return value;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="current"
                  stroke="url(#currentWeek)"
                  strokeWidth={4}
                  dot={{ fill: "#1EC47A", r: 6 }}
                  name="Current Week"
                />
                <Line
                  type="monotone"
                  dataKey="previous"
                  stroke="url(#previousWeek)"
                  strokeWidth={4}
                  dot={{ fill: "#FFFFFF", r: 6 }}
                  name="Previous Week"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom section - events log and total sales */}
        <div className="flex gap-4">
          {/* Left side - events log */}
          <div className="flex-1 bg-gradient-to-br from-[#3f6462] to-[#243f3e] p-4 rounded-lg">
            <h3 className="text-white text-mb font-semibold mb-2">
              Events Logs
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-white text-sm">
                    <th className="py-2">Event Name</th>
                    <th className="py-2">Client Name</th>
                    <th className="py-2">Date</th>
                    <th className="py-2">Event Type</th>
                    <th className="py-2">Event Status</th>
                  </tr>
                </thead>
                <tbody className="text-white text-sm">
                  {/* Table content will go here */}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right side - total sales chart */}
          <div className="w-[300px] h-[300px] bg-gradient-to-br from-[#3f6462] to-[#243f3e] p-4 rounded-lg">
            <h3 className="text-white text-mb font-semibold mb-2">
              Total Sales
            </h3>
            {/* Total Sales Donut Chart */}
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={totalSalesData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#1EC47A"
                  label
                >
                  {totalSalesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
