"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";
import { ApiResponse } from "@/lib/types";

const CACHE_KEY = "tealai_latest_release";
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [downloadState, setDownloadState] = useState<{
    loading: boolean;
    url: string | null;
  }>({ loading: true, url: null });

  // Fetch latest release on component mount
  useEffect(() => {
    const fetchDownloadUrl = async () => {
      // Check sessionStorage cache first
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          const now = Date.now();
          if (now - timestamp < CACHE_DURATION && data.success) {
            setDownloadState({ loading: false, url: data.url });
            return;
          }
        }
      } catch (error) {
        console.error("Error reading cache:", error);
      }

      // Fetch from API
      try {
        const response = await fetch("/api/releases/latest");
        const data: ApiResponse = await response.json();

        if (data.success) {
          // Update cache
          try {
            sessionStorage.setItem(
              CACHE_KEY,
              JSON.stringify({
                data,
                timestamp: Date.now(),
              })
            );
          } catch (error) {
            console.error("Error writing cache:", error);
          }

          setDownloadState({ loading: false, url: data.url });
        } else {
          // Should not happen as API route always returns success with fallback
          setDownloadState({ loading: false, url: null });
        }
      } catch (error) {
        console.error("Error fetching download URL:", error);
        setDownloadState({ loading: false, url: null });
      }
    };

    fetchDownloadUrl();
  }, []);

  const handleNavClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const hash = href;
      
      // If we're on the home page, just scroll to the section
      if (pathname === "/") {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // If we're on a different page, navigate to home with hash
        router.push("/" + hash);
        // Wait for navigation and page load, then scroll to the section
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 500);
      }
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      {/* Floating Navigation Bar */}
      <nav className="max-w-7xl w-full bg-[#E7F0ED] backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="flex items-center cursor-pointer overflow-hidden rounded-3xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/logo.png"
                alt="Teal.ai"
                width={180}
                height={60}
                className="h-16 w-auto object-contain"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(item.href, e)}
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Download Button & Menu */}
          <div className="flex items-center space-x-4">
            {downloadState.loading ? (
              <motion.button
                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-purple-100 border border-purple-300 rounded-lg text-purple-700 font-medium text-sm opacity-75 cursor-not-allowed"
                disabled
              >
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Loading download...</span>
              </motion.button>
            ) : downloadState.url ? (
              <motion.a
                href={downloadState.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-purple-100 border border-purple-300 rounded-lg text-purple-700 font-medium text-sm hover:bg-purple-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/Apple_logo_black.svg"
                  alt="Apple logo"
                  width={16}
                  height={16}
                  className="w-4 h-4 object-contain"
                />
                <span>Download for macOS</span>
              </motion.a>
            ) : (
              <motion.button
                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-purple-100 border border-purple-300 rounded-lg text-purple-700 font-medium text-sm opacity-75 cursor-not-allowed"
                disabled
              >
                <Image
                  src="/Apple_logo_black.svg"
                  alt="Apple logo"
                  width={16}
                  height={16}
                  className="w-4 h-4 object-contain"
                />
                <span>Download unavailable</span>
              </motion.button>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
                <motion.span
                  className="block w-6 h-0.5 bg-gray-900"
                  animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                />
                <motion.span
                  className="block w-6 h-0.5 bg-gray-900"
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.span
                  className="block w-6 h-0.5 bg-gray-900"
                  animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden rounded-b-xl"
            >
              <div className="py-4 px-6 space-y-4 border-t border-gray-200/50">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      handleNavClick(item.href, e);
                      setIsMenuOpen(false);
                    }}
                    className="block text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                {downloadState.loading ? (
                  <motion.button
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-100 border border-purple-300 rounded-lg text-purple-700 font-medium text-sm w-full opacity-75 cursor-not-allowed"
                    disabled
                  >
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Loading download...</span>
                  </motion.button>
                ) : downloadState.url ? (
                  <motion.a
                    href={downloadState.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-100 border border-purple-300 rounded-lg text-purple-700 font-medium text-sm w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Image
                      src="/Apple_logo_black.svg"
                      alt="Apple logo"
                      width={16}
                      height={16}
                      className="w-4 h-4 object-contain"
                    />
                    <span>Download for macOS</span>
                  </motion.a>
                ) : (
                  <motion.button
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-100 border border-purple-300 rounded-lg text-purple-700 font-medium text-sm w-full opacity-75 cursor-not-allowed"
                    disabled
                  >
                    <Image
                      src="/Apple_logo_black.svg"
                      alt="Apple logo"
                      width={16}
                      height={16}
                      className="w-4 h-4 object-contain"
                    />
                    <span>Download unavailable</span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

