"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import axios from "axios"
import Logo from "../../../public/logo.png"
import DefaultPfp from "../../../public/default_pfp.png"
import { LayoutDashboard, Calendar, Settings, LogOut, Bell, Store, LandPlot } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../components/sidebar/VendorSidebar"

interface User {
  user_id: number
  user_firstName: string
  user_lastName: string
  user_role: string
  user_email: string
  user_pfp: string | null
}

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if user exists in localStorage
        const storedUser = localStorage.getItem("user")

        if (!storedUser) {
          // Instead of logging an error, just redirect silently
          router.push("/auth/login")
          return
        }

        const parsedUser = JSON.parse(storedUser)
        const userId = parsedUser.user_id

        // Only proceed with API call if we have a valid user ID
        if (!userId) {
          router.push("/auth/login")
          return
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/vendor.php?operation=getUserInfo&user_id=${userId}`,
        )

        if (response.data.status === "success") {
          setUser(response.data.user)
        } else {
          // Clear invalid user data and redirect
          localStorage.removeItem("user")
          router.push("/auth/login")
        }
      } catch (error) {
        // Handle any errors by redirecting to login
        localStorage.removeItem("user")
        router.push("/auth/login")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("user_id") // Also remove user_id if you're storing it
    router.push("/auth/login")
  }

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/vendor/dashboard" },
    { icon: Store, label: "My Store", href: "/vendor/store" },
    { icon: LandPlot, label: "My Venues", href: "/vendor/venues" },
    { icon: Calendar, label: "Events", href: "/vendor/events" },
    { icon: Settings, label: "Settings", href: "/vendor/settings/userinfo" },
  ]

  // Show loading state or redirect if not authenticated
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  if (!user) {
    return null // This will be brief as the redirect should happen
  }

  const profilePicture = user.user_pfp ? `${process.env.NEXT_PUBLIC_API_URL}/${user.user_pfp}` : DefaultPfp

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar className="h-full w-64 bg-white border-r fixed top-0 left-0 z-0">
        <SidebarHeader className="border-b p-4">
          <h1 className="text-xl font-semibold text-gray-800">Noreen</h1>
        </SidebarHeader>
        <SidebarContent className="flex flex-col h-[calc(100%-5rem)]">
          <SidebarMenu className="flex-1 mt-[1.5rem] gap-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.href}
                      className={`flex w-full items-center gap-3 px-3 py-2 rounded-md transition ${
                        isActive ? "bg-[#486968] text-white" : "text-[#797979] hover:bg-[#486968] hover:text-white"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>

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

      <div className="flex-1 flex flex-col ml-64">
        <header className="bg-white border-b px-6 py-4 w-full fixed top-0 left-0 right-0 z-10 flex justify-between items-center">
          <Image src={Logo || "/placeholder.svg"} alt="Logo" width={120} height={50} />

          <div className="flex items-center gap-3">
            <div className="relative cursor-pointer">
              <Bell className="h-8 w-8 text-gray-600 border border-[#a1a1a1] p-1 rounded-md" />
              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-[#486968] text-white text-xs flex items-center justify-center">
                29
              </span>
            </div>
            <div className="h-10 w-10 border border-[#D2D2D2] rounded-full bg-gray-200 flex items-center justify-center overflow-hidden object-fill">
              <Image
                src={profilePicture || "/placeholder.svg"}
                alt="Profile"
                width={40}
                height={40}
                onError={(e) => {
                  e.currentTarget.src = DefaultPfp.src
                }}
              />
            </div>
            <span className="text-sm text-gray-600">
              <div>
                <div className="font-semibold">
                  {user.user_firstName} {user.user_lastName}
                </div>
                <div>
                  <span className="text-[#8b8b8b] font-semibold">{user.user_role}</span>
                </div>
              </div>
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6 mt-16">{children}</main>
      </div>
    </div>
  )
}
