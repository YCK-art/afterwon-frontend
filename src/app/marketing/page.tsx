"use client";

import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiArrowUpRight, FiGlobe, FiMenu, FiMail } from "react-icons/fi";
import { FaTwitter, FaInstagram } from "react-icons/fa";
import { DollarSign, Target, Users, BarChart3, Layers } from "lucide-react";

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Toolbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-16">
            {/* Logo - moved inward */}
            <div className="flex items-center ml-2 sm:ml-4 lg:ml-6">
              <Link href="/" className="flex-shrink-0 flex items-center gap-1">
                <Image
                  src="/image/afterwon.png"
                  alt="Afterwon Logo"
                  width={35}
                  height={35}
                  className="object-contain"
                />
                <span
                  className="text-2xl font-bold text-black"
                  style={{
                    fontFamily: "SpectralLight, serif",
                    fontWeight: 650,
                  }}
                >
                  Afterwon
                </span>
              </Link>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden min-[1000px]:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {/* Use cases dropdown */}
                <div className="relative group">
                  <span
                    className="text-black hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontWeight: 550,
                    }}
                  >
                    Use cases
                  </span>

                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 mt-1 w-[28rem] bg-white rounded-lg shadow-xl border border-gray-200 backdrop-blur-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[9999]">
                    <div className="py-3">
                      {[
                        {
                          name: "Finance",
                          href: "/finance",
                          icon: <DollarSign className="w-6 h-6 text-orange-500" strokeWidth={2} />,
                          description: "Transform complex financial data into insights"
                        },
                        {
                          name: "Marketing",
                          href: "/marketing",
                          icon: <Target className="w-6 h-6 text-orange-500" strokeWidth={2} />,
                          description: "Turn campaign data into marketing intelligence"
                        },
                        {
                          name: "Product Team",
                          href: "/product-team",
                          icon: <Users className="w-6 h-6 text-orange-500" strokeWidth={2} />,
                          description: "Analyze product metrics and KPIs efficiently"
                        },
                        {
                          name: "Consulting",
                          href: "/consulting",
                          icon: <BarChart3 className="w-6 h-6 text-orange-500" strokeWidth={2} />,
                          description: "Deliver data-driven solutions for clients"
                        },
                        {
                          name: "Research",
                          href: "/research",
                          icon: <Layers className="w-6 h-6 text-orange-500" strokeWidth={2} />,
                          description: "Convert research data into visual stories"
                        }
                      ].map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center gap-4 px-5 py-4 h-20 text-black hover:bg-gray-50 transition-all duration-200 mx-2 rounded-md"
                        >
                          <div className="flex-shrink-0 w-14 h-14 bg-orange-50 rounded-lg flex items-center justify-center">
                            {item.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3
                              className="text-base font-semibold text-black mb-1"
                              style={{
                                fontFamily: "Arial, sans-serif",
                                fontWeight: 600,
                              }}
                            >
                              {item.name}
                            </h3>
                            <p
                              className="text-sm text-gray-600 leading-tight"
                              style={{
                                fontFamily: "Arial, sans-serif",
                              }}
                            >
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  href="/careers"
                  className="text-black hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  style={{ fontFamily: "Arial, sans-serif", fontWeight: 550 }}
                >
                  Careers
                </Link>
                <div className="relative group">
                  <span
                    className="text-black hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontWeight: 550,
                    }}
                  >
                    Resources
                  </span>
                </div>
                <Link
                  href="/pricing"
                  className="text-black hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  style={{ fontFamily: "Arial, sans-serif", fontWeight: 550 }}
                >
                  Pricing
                </Link>
                <Link
                  href="#enterprise"
                  className="text-black hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  style={{ fontFamily: "Arial, sans-serif", fontWeight: 550 }}
                >
                  Enterprise sales
                </Link>
              </div>
            </div>

            {/* Language Selector & Desktop Get Started Button */}
            <div className="hidden min-[1000px]:flex items-center space-x-4" style={{ marginRight: '10px' }}>
              {/* Language Selector */}
              <div className="relative language-selector">
                <button
                  className="p-2 rounded-full hover:bg-orange-100 transition-colors group"
                >
                  <FiGlobe className="w-5 h-5 text-gray-600 group-hover:text-orange-500 transition-colors" />
                </button>
              </div>

              {/* Get Started Button */}
              <Link
                href="/chat"
                className="bg-gray-200 hover:bg-gray-300 text-black px-6 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-2 group rounded-full"
                style={{ fontWeight: 550 }}
              >
                <FiArrowUpRight
                  size={16}
                  className="transition-transform duration-200 group-hover:rotate-45"
                />
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="min-[1000px]:hidden flex items-center mr-8 relative z-70">
              <button
                className="text-black hover:text-gray-600 p-2 transition-colors relative z-70"
              >
                <FiMenu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1
            className="text-5xl md:text-6xl font-bold text-black mb-3 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", marginTop: "15px" }}
          >
            AI for <span className="italic">Marketing Analytics</span>
          </h1>

          {/* Subheading */}
          <p
            className="text-xl text-black mb-10 leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            Transform your marketing data into actionable insights. Track campaigns,
            analyze ROI, and optimize performance with AI-powered analytics.
          </p>

          {/* CTA Button */}
          <Link
            href="/chat"
            className="group inline-flex items-center gap-2 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
            style={{ fontFamily: "Arial, sans-serif", fontWeight: 500 }}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 animate-shine"></span>
            <span className="relative z-10">Get started for free</span>
            <span className="relative z-10 w-5 h-5">
              <FiArrowUpRight className="w-5 h-5 absolute inset-0 transition-all duration-500 opacity-100 group-hover:opacity-0 group-hover:rotate-45" />
              <FiArrowRight className="w-5 h-5 absolute inset-0 transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2" />
            </span>
          </Link>
        </div>
      </section>

      {/* Second Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-6">
            <h2
              className="text-4xl md:text-5xl font-bold text-black mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Campaign Performance at Your Fingertips
            </h2>
            <p
              className="text-lg text-black max-w-3xl mx-auto"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              Connect your marketing platforms and get real-time insights on campaign
              performance, customer acquisition costs, and conversion rates.
            </p>
          </div>

          {/* Image Placeholder */}
          <div className="w-full h-96 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-lg">image placeholder</span>
          </div>
        </div>
      </section>

      {/* Third Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-6">
            <h2
              className="text-4xl md:text-5xl font-bold text-black mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Audience Insights That Drive Growth
            </h2>
            <p
              className="text-lg text-black max-w-3xl mx-auto"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              Understand your audience better with AI-powered segmentation,
              behavior analysis, and predictive modeling for targeted campaigns.
            </p>
          </div>

          {/* Image Placeholder */}
          <div className="w-full h-96 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-lg">image placeholder</span>
          </div>
        </div>
      </section>

      {/* Fourth Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-6">
            <h2
              className="text-4xl md:text-5xl font-bold text-black mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              ROI Reporting Made Simple
            </h2>
            <p
              className="text-lg text-black max-w-3xl mx-auto"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              Generate comprehensive ROI reports automatically. Track marketing spend,
              revenue attribution, and identify your most profitable channels.
            </p>
          </div>

          {/* Image Placeholder */}
          <div className="w-full h-96 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-lg">image placeholder</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 overflow-hidden">
        {/* Soft transition from white to orange */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent"></div>

        {/* Gradient Background with Light Reflection */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-300 via-orange-500 to-orange-700"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"></div>
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-white/30 to-transparent blur-xl"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-orange-200/40 to-transparent blur-2xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            {/* Logo Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <Image
                  src="/image/afterwon2.png"
                  alt="Afterwon Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
                <span
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: 'SpectralLight, serif', fontWeight: 650 }}
                >
                  Afterwon
                </span>
              </div>
            </div>

            {/* Use Cases */}
            <div className="lg:col-span-1">
              <h3
                className="text-lg font-bold text-white mb-4"
                style={{ fontFamily: 'Spectral, serif', fontWeight: 650 }}
              >
                Use Cases
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/finance"
                    className="text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Finance
                  </Link>
                </li>
                <li>
                  <Link
                    href="/marketing"
                    className="text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Marketing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/product-team"
                    className="text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Product Team
                  </Link>
                </li>
                <li>
                  <Link
                    href="/consulting"
                    className="text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Consulting
                  </Link>
                </li>
                <li>
                  <Link
                    href="/research"
                    className="text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Research
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="lg:col-span-1">
              <h3
                className="text-lg font-bold text-white mb-4"
                style={{ fontFamily: 'Spectral, serif', fontWeight: 650 }}
              >
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/blog"
                    className="text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>

            {/* Careers */}
            <div className="lg:col-span-1">
              <h3
                className="text-lg font-bold text-white mb-4"
                style={{ fontFamily: 'Spectral, serif', fontWeight: 650 }}
              >
                Careers
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/careers"
                    className="text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Open Positions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Company Culture
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Benefits
                  </Link>
                </li>
              </ul>
            </div>

            {/* Pricing */}
            <div className="lg:col-span-1">
              <h3
                className="text-lg font-bold text-white mb-4"
                style={{ fontFamily: 'Spectral, serif', fontWeight: 650 }}
              >
                Pricing
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/pricing"
                    className="text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Plans & Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Free Trial
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Enterprise
                  </Link>
                </li>
              </ul>
            </div>

            {/* Enterprise & Connect - Combined column */}
            <div className="lg:col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
              {/* Enterprise */}
              <div>
                <h3
                  className="text-lg font-bold text-white mb-4"
                  style={{ fontFamily: 'Spectral, serif', fontWeight: 650 }}
                >
                  Enterprise
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/#enterprise"
                      className="text-white/80 hover:text-white transition-colors"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      Enterprise Sales
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#enterprise"
                      className="text-white/80 hover:text-white transition-colors"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      Security
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#enterprise"
                      className="text-white/80 hover:text-white transition-colors"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      Integrations
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Connect */}
              <div>
                <h3
                  className="text-lg font-bold text-white mb-4"
                  style={{ fontFamily: 'Spectral, serif', fontWeight: 650 }}
                >
                  Connect
                </h3>
                <div className="flex gap-4">
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <FaTwitter size={24} />
                </Link>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <FaInstagram size={24} />
                </Link>
                <Link
                  href="mailto:contact@afterwon.com"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <FiMail size={24} />
                </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/20 mt-8 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p
                className="text-white/80 text-sm"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                © 2025 Afterwon. All rights reserved.
              </p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <Link
                  href="/privacy"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
