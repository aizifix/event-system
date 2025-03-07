import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#334746] text-white">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-['Tiro_Gurmukhi'] text-[4rem] text-left">
              Noreen
            </h3>
            <p className="text-gray-300 text-[16px]">
              Photography, Bridal Fashion & Event Organizing
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Venues
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Stores
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Info</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Capistrano-Mabini St.</li>
              <li>Cagayan de Oro City, 9000, Philippines</li>
              <li>Phone: 0926-470-5713</li>
              <li>Email: Lagdamin10@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-600 pt-8 text-center text-gray-400">
          <p>
            &copy; 2025 Noreen - Photography, Bridal Fashion & Event Organizing.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
