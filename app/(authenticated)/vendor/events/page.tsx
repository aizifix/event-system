"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VendorDashboard() {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user?.user_role || user.user_role !== "Vendor") {
      router.push("/auth/login");
    }
  }, [router]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Vendor Dashboard</h1>
      <p>Events page</p>
      {/* Add more dashboard content here */}
    </div>
  );
}
