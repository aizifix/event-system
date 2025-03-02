"use client"
import Image from "next/image"
import type React from "react"

interface VenueCardProps {
  id: number
  venueTitle: string
  venueProfilePicture: string | null
  venueCoverPhoto: string | null
  isAdminView?: boolean
}

export const VenueCard: React.FC<VenueCardProps> = ({
  id,
  venueTitle,
  venueProfilePicture,
  venueCoverPhoto,
  isAdminView = false, // Default to vendor view
}) => {
  // Normalize Image Paths
  const normalizePath = (path: string | null) => {
    if (!path || path.startsWith("http")) return path
    return `http://localhost/events-api/${path}`
  }

  const coverPhotoUrl = normalizePath(venueCoverPhoto) || "/placeholder.svg"
  const profilePictureUrl = normalizePath(venueProfilePicture) || "/placeholder.svg"

  console.log(`${isAdminView ? "Admin" : "Vendor"} Venue Cover Photo URL:`, coverPhotoUrl)
  console.log(`${isAdminView ? "Admin" : "Vendor"} Venue Profile Picture URL:`, profilePictureUrl)

  return (
    <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Cover Image */}
      <div className="h-32 w-full overflow-hidden">
        <Image
          src={coverPhotoUrl || "/placeholder.svg"}
          alt={`${venueTitle} cover`}
          width={256}
          height={128}
          className="h-full w-full object-cover"
          unoptimized
        />
      </div>

      {/* Profile Picture */}
      <div className="absolute left-4 top-16 h-16 w-16 overflow-hidden rounded-full border-4 border-white bg-white">
        <Image
          src={profilePictureUrl || "/placeholder.svg"}
          alt={`${venueTitle} profile`}
          width={64}
          height={64}
          className="h-full w-full object-cover"
          unoptimized
        />
      </div>

      {/* Content */}
      <div className="p-4 pt-12">
        <h3 className="text-lg font-semibold text-gray-900">{venueTitle}</h3>

        {/* Show "Manage" button for Admin */}
        {isAdminView ? (
          <button className="mt-4 w-full rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600">
            Manage Venue
          </button>
        ) : (
          <button className="mt-4 w-full rounded-md bg-[#486968] px-4 py-2 text-white hover:bg-[#3a5453]">
            View Details
          </button>
        )}
      </div>
    </div>
  )
}
