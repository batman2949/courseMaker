import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { HomeSharp } from "../svg/home";
import { Search } from "../svg/search";
import { OutlineLogout } from "../svg/logout";
import { HamburgerLg } from "../svg/hamburger";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const paths = [
    { name: "Home", path: "/dashboard", emoji: <HomeSharp /> },
    { name: "Explore", path: "/dashboard/explore", emoji: <Search /> },
    { name: "LogOut", path: "/dashboard/logout", emoji: <OutlineLogout /> },
  ];

  return (
    <div>
      {/* Hamburger for mobile */}
      <span
        className="absolute z-50 text-3xl sm:hidden cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <HamburgerLg />
      </span>

      <div
        className={`fixed top-0 left-0 h-screen w-60 bg-white border-r border-gray-200 shadow-md rounded-r-2xl p-5
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
        {/* Brand / Logo */}
        <div className="flex items-center justify-center mb-7">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl text-blue-700 font-extrabold text-center sm:block"
          >
            AI Course Maker
          </motion.h1>
        </div>

        {/* Decorative Divider */}
        <div className="flex justify-center mb-10">
          <div className="w-16 h-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700"></div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-3 relative">
          {paths.map((element, index) => {
            const isActive = pathname === element.path;
            return (
              <Link
                key={index}
                href={element.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left font-semibold transition-all duration-150 shadow-sm
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg"
                      : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white"
                  }`}
              >
                <span className="text-lg">{element.emoji}</span>
                <span className="sm:inline">{element.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="absolute bottom-5 text-center text-xs text-gray-400"
        >
          © 2025 AI Course Maker
        </motion.div>
      </div>
    </div>
  );
}
