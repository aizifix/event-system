"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/logo.png";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Building2,
  Briefcase,
  UserSquare2,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../components/sidebar/AdminSidebar";

interface User {
  user_firstName: string;
  user_lastName: string;
  user_role: string;
  user_email: string;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname(); // Get current active path
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/auth/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.user_role !== "Admin") {
        router.push("/auth/login");
        return;
      }
      setUser(parsedUser);
    } catch (error) {
      router.push("/auth/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
    { icon: Calendar, label: "Events", href: "/admin/events" },
    { icon: Users, label: "Vendors", href: "/admin/vendors" },
    { icon: Building2, label: "Venues", href: "/admin/venues" },
    { icon: Briefcase, label: "Services", href: "/admin/services" },
    { icon: UserSquare2, label: "Clients", href: "/admin/clients" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (Fixed) */}
      <Sidebar className="h-full w-64 bg-white border-r fixed top-0 left-0 z-0">
        <SidebarHeader className="border-b p-4">
          <h1 className="text-xl font-semibold text-gray-800">Noreen</h1>
        </SidebarHeader>
        <SidebarContent className="flex flex-col h-[calc(100%-5rem)]">
          <SidebarMenu className="flex-1 mt-[1.5rem] gap-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href; // Check if the current path is active
              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.href}
                      className={`flex w-full items-center gap-3 px-3 py-2 rounded-md transition ${
                        isActive
                          ? "bg-[#486968] text-white"
                          : "text-[#797979] hover:bg-[#486968] hover:text-white"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>

          {/* Logout remains at the bottom */}
          <SidebarMenuItem className="mt-auto pt-4">
            <SidebarMenuButton>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-3 py-2 text-[#797979] hover:bg-[#486968] hover:text-white rounded-md"
              >
                <LogOut className="h-5 w-5" />
                <span>Log out</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarContent>
      </Sidebar>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Navbar (Full Width) */}
        <header className="bg-white border-b px-6 py-4 w-full fixed top-0 left-0 right-0 z-10 flex justify-between items-center">
          {/* Logo on the Left */}
          <Image src={Logo} alt="Logo" width={120} height={50} />

          {/* User Info on the Right */}
          <div className="flex items-center gap-3">
            <div className="relative cursor-pointer">
              <Calendar className="h-8 w-8 text-gray-600 border border-[#a1a1a1] p-1 rounded-md" />
              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-[#486968] text-white text-xs flex items-center justify-center">
                29
              </span>
            </div>
            <div className="cursor-pointer">
              <Bell className="h-8 w-8 text-gray-600 border border-[#a1a1a1] p-1 rounded-md" />
            </div>
            <div className="h-10 w-10 border border-[#D2D2D2] rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm">{user?.user_firstName.charAt(0)}</span>
            </div>
            <span className="text-sm text-gray-600">
              <div>
                <div className="font-semibold">
                  {user?.user_firstName} {user?.user_lastName}
                </div>
                <div>
                  <span className="text-[#8b8b8b] font-semibold">
                    {user?.user_role}
                  </span>
                </div>
              </div>
            </span>
          </div>
        </header>

        {/* Page Content - Adjusted for Navbar */}
        <main className="flex-1 overflow-auto p-6 mt-16">{children}</main>
      </div>
    </div>
  );
}
