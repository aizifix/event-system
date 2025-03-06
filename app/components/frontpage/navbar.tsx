import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-[12px] shadow-sm mx-auto max-w-[1200px]">
          <div className="flex items-center justify-between h-20 px-6">
            {/* Logo */}
            <a
              href="/"
              className="font-['Tiro_Gurmukhi'] text-2xl text-[#486968]"
            >
              Noreen
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-12">
              <a href="#home" className="text-gray-600 hover:text-[#486968]">
                Home
              </a>
              <a
                href="#packages"
                className="text-gray-600 hover:text-[#486968]"
              >
                Packages
              </a>
              <a href="#about" className="text-gray-600 hover:text-[#486968]">
                About us
              </a>
              <a href="#venues" className="text-gray-600 hover:text-[#486968]">
                Venues
              </a>
              <a href="#gallery" className="text-gray-600 hover:text-[#486968]">
                Gallery
              </a>
              <a href="#stores" className="text-gray-600 hover:text-[#486968]">
                Stores
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="outline"
                className="border-[#486968] text-[#486968] hover:bg-[#486968] hover:text-white px-6"
              >
                LOG IN
              </Button>
              <Button className="bg-[#486968] hover:bg-[#486968]/90 text-white px-6">
                SIGN UP
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                <a
                  href="#home"
                  className="text-gray-600 hover:text-[#486968] px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="#packages"
                  className="text-gray-600 hover:text-[#486968] px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Packages
                </a>
                <a
                  href="#about"
                  className="text-gray-600 hover:text-[#486968] px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About us
                </a>
                <a
                  href="#venues"
                  className="text-gray-600 hover:text-[#486968] px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Venues
                </a>
                <a
                  href="#gallery"
                  className="text-gray-600 hover:text-[#486968] px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Gallery
                </a>
                <a
                  href="#stores"
                  className="text-gray-600 hover:text-[#486968] px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Stores
                </a>
                <div className="px-4 py-2 flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    className="border-[#486968] text-[#486968] hover:bg-[#486968] hover:text-white w-full"
                  >
                    LOG IN
                  </Button>
                  <Button className="bg-[#486968] text-white hover:bg-[#486968]/90 w-full">
                    SIGN UP
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
