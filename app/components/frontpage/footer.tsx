import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4 font-['Tiro_Gurmukhi']">
              Noreen
            </h2>
            <p className="text-sm">Event Planning & Photography</p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="hover:text-gray-300">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="hover:text-gray-300">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="hover:text-gray-300">
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:text-gray-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#packages" className="hover:text-gray-300">
                    Packages
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="hover:text-gray-300">
                    About us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#venues" className="hover:text-gray-300">
                    Venues
                  </Link>
                </li>
                <li>
                  <Link href="#stores" className="hover:text-gray-300">
                    Stores
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-sm text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} Noreen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
