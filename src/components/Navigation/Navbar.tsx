"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiLifeBuoy,
  FiDollarSign,
} from "react-icons/fi";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span
              className="text-2xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="text-black">After</span>
              <span className="text-orange-500">won</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Solutions Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                onMouseEnter={() => setIsSolutionsOpen(true)}
                onMouseLeave={() => setIsSolutionsOpen(false)}
                className="flex items-center gap-1 text-black hover:text-orange-500 transition-colors"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                Solutions
                <FiChevronDown
                  className={`transition-transform ${
                    isSolutionsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isSolutionsOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2"
                  onMouseEnter={() => setIsSolutionsOpen(true)}
                  onMouseLeave={() => setIsSolutionsOpen(false)}
                >
                  <Link
                    href="/finance"
                    className="flex items-center gap-4 px-5 py-4 h-16 text-black hover:bg-gray-50 transition-all duration-200 mx-2 rounded-md"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                      <FiDollarSign className="w-5 h-5 text-orange-500" />
                    </div>
                    <div className="flex-grow">
                      <div
                        className="font-semibold text-sm text-black mb-1"
                        style={{ fontFamily: "Arial, sans-serif" }}
                      >
                        Finance
                      </div>
                      <div
                        className="text-xs text-gray-600 leading-relaxed whitespace-nowrap"
                        style={{ fontFamily: "Arial, sans-serif" }}
                      >
                        AI-powered financial insights and forecasts
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                onMouseEnter={() => setIsResourcesOpen(true)}
                onMouseLeave={() => setIsResourcesOpen(false)}
                className="flex items-center gap-1 text-black hover:text-orange-500 transition-colors"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                Resources
                <FiChevronDown
                  className={`transition-transform ${
                    isResourcesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isResourcesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2"
                  onMouseEnter={() => setIsResourcesOpen(true)}
                  onMouseLeave={() => setIsResourcesOpen(false)}
                >
                  <Link
                    href="/help"
                    className="flex items-center gap-4 px-5 py-4 h-16 text-black hover:bg-gray-50 transition-all duration-200 mx-2 rounded-md"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                      <FiLifeBuoy className="w-5 h-5 text-orange-500" />
                    </div>
                    <div className="flex-grow">
                      <div
                        className="font-semibold text-sm text-black mb-1"
                        style={{ fontFamily: "Arial, sans-serif" }}
                      >
                        Help Center
                      </div>
                      <div
                        className="text-xs text-gray-600 leading-relaxed whitespace-nowrap"
                        style={{ fontFamily: "Arial, sans-serif" }}
                      >
                        Get support and find answers to your questions
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/pricing"
              className="text-black hover:text-orange-500 transition-colors"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              Pricing
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-black hover:text-orange-500 transition-colors"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              Log in
            </Link>
            <Link
              href="/chat"
              className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              Get started for free
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-black hover:text-orange-500"
          >
            {isMobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/finance"
              className="block text-black hover:text-orange-500 py-2"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              Finance
            </Link>
            <Link
              href="/help"
              className="block text-black hover:text-orange-500 py-2"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              Help Center
            </Link>
            <Link
              href="/pricing"
              className="block text-black hover:text-orange-500 py-2"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="block text-black hover:text-orange-500 py-2"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              Log in
            </Link>
            <Link
              href="/chat"
              className="block bg-orange-500 text-white px-6 py-2 rounded-full text-center hover:bg-orange-600 transition-colors"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              Get started for free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
