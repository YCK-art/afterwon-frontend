'use client'
import Link from 'next/link'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Footer from '@/components/Footer/Footer'
import LoginModal from '../../components/Auth/LoginModal'
import LoadingScreen from '../../components/Auth/LoadingScreen'
import {
  FiArrowUpRight,
  FiDollarSign,
  FiTarget,
  FiUsers,
  FiBarChart,
  FiLayers,
  FiBookOpen,
  FiLifeBuoy,
  FiShield,
  FiMenu,
  FiX,
  FiCreditCard,
  FiFolder,
  FiAlertCircle,
  FiBook,
  FiLock,
} from 'react-icons/fi'

interface HelpCategory {
  title: string
  description: string
  icon: any
  links: string[]
}

const helpCategories: HelpCategory[] = [
  {
    title: 'Account & Billing',
    description: 'Manage your subscription and billing information',
    icon: FiCreditCard,
    links: [
      'Subscription Management',
      'Account Management',
      'Credits',
      'Invoices',
    ]
  },
  {
    title: 'Getting Started',
    description: 'Learn how to use Afterwon\'s tools and features to create your projects',
    icon: FiBook,
    links: [
      'Quick Start Guide',
      'Platform Overview',
      'Your First Project',
      'Best Practices',
    ]
  },
  {
    title: 'Assets & Workspaces',
    description: 'Organize and manage your files and collaboration workspaces',
    icon: FiFolder,
    links: [
      'Managing Assets',
      'File Organization',
      'Workspace Collaboration',
      'Sharing & Permissions',
    ]
  },
  {
    title: 'Troubleshooting',
    description: 'Find solutions to technical issues and error messages',
    icon: FiAlertCircle,
    links: [
      'Common Issues',
      'Error Messages',
      'Performance Tips',
      'Contact Support',
    ]
  },
  {
    title: 'Enterprise',
    description: 'Information for business customers about Enterprise account management',
    icon: FiUsers,
    links: [
      'Enterprise Plans',
      'Team Management',
      'Admin Resources',
      'Custom Solutions',
    ]
  },
  {
    title: 'Community, Privacy & Policies',
    description: 'Information about privacy policies, community guidelines, and content standards',
    icon: FiLock,
    links: [
      'Privacy Policy',
      'Terms of Service',
      'Community Guidelines',
      'Data Security',
    ]
  },
]

export default function HelpPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isLoadingScreenVisible, setIsLoadingScreenVisible] = useState(false)
  const router = useRouter()

  const handleGetStartedClick = () => {
    setIsLoginModalOpen(true)
  }

  const handleStartLoading = () => {
    setIsLoginModalOpen(false)
    setIsLoadingScreenVisible(true)

    setTimeout(() => {
      setIsLoadingScreenVisible(false)
      router.push('/chat')
    }, 3000)
  }

  return (
    <>
      <div className={`min-h-screen bg-white ${isLoginModalOpen ? "blur-sm" : ""}`}>
        {/* Toolbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
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
                        <Link
                          href="/#usecase"
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
                              Transform complex financial data into insights
                            </div>
                          </div>
                        </Link>
                        <Link
                          href="/#usecase"
                          className="flex items-center gap-4 px-5 py-4 h-16 text-black hover:bg-gray-50 transition-all duration-200 mx-2 rounded-md"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                            <FiTarget className="w-5 h-5 text-orange-500" />
                          </div>
                          <div className="flex-grow">
                            <div
                              className="font-semibold text-sm text-black mb-1"
                              style={{ fontFamily: "Arial, sans-serif" }}
                            >
                              Marketing
                            </div>
                            <div
                              className="text-xs text-gray-600 leading-relaxed whitespace-nowrap"
                              style={{ fontFamily: "Arial, sans-serif" }}
                            >
                              Turn campaign data into marketing intelligence
                            </div>
                          </div>
                        </Link>
                        <Link
                          href="/#usecase"
                          className="flex items-center gap-4 px-5 py-4 h-16 text-black hover:bg-gray-50 transition-all duration-200 mx-2 rounded-md"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                            <FiUsers className="w-5 h-5 text-orange-500" />
                          </div>
                          <div className="flex-grow">
                            <div
                              className="font-semibold text-sm text-black mb-1"
                              style={{ fontFamily: "Arial, sans-serif" }}
                            >
                              Product Team
                            </div>
                            <div
                              className="text-xs text-gray-600 leading-relaxed whitespace-nowrap"
                              style={{ fontFamily: "Arial, sans-serif" }}
                            >
                              Analyze product metrics and KPIs efficiently
                            </div>
                          </div>
                        </Link>
                        <Link
                          href="/#usecase"
                          className="flex items-center gap-4 px-5 py-4 h-16 text-black hover:bg-gray-50 transition-all duration-200 mx-2 rounded-md"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                            <FiBarChart className="w-5 h-5 text-orange-500" />
                          </div>
                          <div className="flex-grow">
                            <div
                              className="font-semibold text-sm text-black mb-1"
                              style={{ fontFamily: "Arial, sans-serif" }}
                            >
                              Consulting
                            </div>
                            <div
                              className="text-xs text-gray-600 leading-relaxed whitespace-nowrap"
                              style={{ fontFamily: "Arial, sans-serif" }}
                            >
                              Deliver data-driven solutions for clients
                            </div>
                          </div>
                        </Link>
                        <Link
                          href="/#usecase"
                          className="flex items-center gap-4 px-5 py-4 h-16 text-black hover:bg-gray-50 transition-all duration-200 mx-2 rounded-md"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                            <FiLayers className="w-5 h-5 text-orange-500" />
                          </div>
                          <div className="flex-grow">
                            <div
                              className="font-semibold text-sm text-black mb-1"
                              style={{ fontFamily: "Arial, sans-serif" }}
                            >
                              Research
                            </div>
                            <div
                              className="text-xs text-gray-600 leading-relaxed whitespace-nowrap"
                              style={{ fontFamily: "Arial, sans-serif" }}
                            >
                              Convert research data into visual stories
                            </div>
                          </div>
                        </Link>
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

                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 mt-1 w-[28rem] bg-white rounded-lg shadow-xl border border-gray-200 backdrop-blur-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[9999]">
                      <div className="py-3">
                        <Link
                          href="/blog"
                          className="flex items-center gap-4 px-5 py-4 h-16 text-black hover:bg-gray-50 transition-all duration-200 mx-2 rounded-md"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                            <FiBookOpen className="w-5 h-5 text-orange-500" />
                          </div>
                          <div className="flex-grow">
                            <div
                              className="font-semibold text-sm text-black mb-1"
                              style={{ fontFamily: "Arial, sans-serif" }}
                            >
                              Blog
                            </div>
                            <div
                              className="text-xs text-gray-600 leading-relaxed whitespace-nowrap"
                              style={{ fontFamily: "Arial, sans-serif" }}
                            >
                              Latest insights and updates from our team
                            </div>
                          </div>
                        </Link>
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
                        <Link
                          href="/security"
                          className="flex items-center gap-4 px-5 py-4 h-16 text-black hover:bg-gray-50 transition-all duration-200 mx-2 rounded-md"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                            <FiShield className="w-5 h-5 text-orange-500" />
                          </div>
                          <div className="flex-grow">
                            <div
                              className="font-semibold text-sm text-black mb-1"
                              style={{ fontFamily: "Arial, sans-serif" }}
                            >
                              Security
                            </div>
                            <div
                              className="text-xs text-gray-600 leading-relaxed whitespace-nowrap"
                              style={{ fontFamily: "Arial, sans-serif" }}
                            >
                              Learn about our security measures and compliance
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
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

              {/* Desktop Get Started Button */}
              <div className="hidden min-[1000px]:flex items-center space-x-4 mr-2 sm:mr-4 lg:mr-6">
                <button
                  onClick={handleGetStartedClick}
                  className="bg-gray-200 hover:bg-gray-300 text-black px-6 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-2 group rounded-full"
                  style={{ fontWeight: 550 }}
                >
                  <FiArrowUpRight
                    size={16}
                    className="transition-transform duration-200 group-hover:rotate-45"
                  />
                  Get Started
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="min-[1000px]:hidden flex items-center mr-8 relative z-70">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-black hover:text-gray-600 p-2 transition-colors relative z-70"
                >
                  {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="min-[1000px]:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200 z-60 shadow-lg">
              <div className="px-8 py-6 space-y-4">
                <Link
                  href="/#usecase"
                  className="block text-black hover:text-gray-600 py-3 text-lg font-medium transition-colors border-b border-gray-200"
                  style={{ fontFamily: "Arial, sans-serif", fontWeight: 500 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Use cases
                </Link>
                <Link
                  href="/careers"
                  className="block text-black hover:text-gray-600 py-3 text-lg font-medium transition-colors border-b border-gray-200"
                  style={{ fontFamily: "Arial, sans-serif", fontWeight: 500 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Careers
                </Link>
                <Link
                  href="/blog"
                  className="block text-black hover:text-gray-600 py-3 text-lg font-medium transition-colors border-b border-gray-200"
                  style={{ fontFamily: "Arial, sans-serif", fontWeight: 500 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Resources
                </Link>
                <Link
                  href="/pricing"
                  className="block text-black hover:text-gray-600 py-3 text-lg font-medium transition-colors border-b border-gray-200"
                  style={{ fontFamily: "Arial, sans-serif", fontWeight: 500 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <button
                  onClick={() => {
                    handleGetStartedClick()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full mt-6 bg-gray-200 hover:bg-gray-300 text-black px-6 py-3 text-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 group rounded-full"
                  style={{ fontWeight: 550 }}
                >
                  <FiArrowUpRight size={18} />
                  Get Started
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="relative z-10">
          {/* Hero Banner */}
          <div className="pt-16 bg-gradient-to-br from-orange-400 via-orange-300 to-yellow-200 relative overflow-hidden" style={{ height: '300px' }}>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20" />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
              <h1
                className="text-5xl md:text-6xl font-bold text-white mb-4"
                style={{ fontFamily: 'Spectral, serif', fontWeight: 600 }}
              >
                Help Center
              </h1>
              <p className="text-xl text-white/90" style={{ fontFamily: 'Arial, sans-serif' }}>
                Find answers and get support for all your questions
              </p>
            </div>
          </div>

          {/* Main Heading */}
          <div className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2
                className="text-4xl md:text-5xl font-bold text-black mb-4"
                style={{ fontFamily: 'Spectral, serif', fontWeight: 600 }}
              >
                All the resources you need to make
              </h2>
              <h2
                className="text-4xl md:text-5xl font-bold text-black mb-6"
                style={{ fontFamily: 'Spectral, serif', fontWeight: 600 }}
              >
                anything you want.
              </h2>
              <p className="text-lg text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                Jump right into learning how to use Afterwon and dive into these quickstart topics
              </p>
            </div>
          </div>

          {/* Help Categories Grid */}
          <div className="bg-white pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {helpCategories.map((category, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-orange-300 hover:shadow-lg transition-all duration-300"
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-4">
                      <category.icon className="w-6 h-6 text-orange-500" />
                    </div>

                    {/* Title */}
                    <h3
                      className="text-xl font-bold text-black mb-2"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      {category.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-sm text-gray-600 mb-6"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      {category.description}
                    </p>

                    {/* Links */}
                    <ul className="space-y-3">
                      {category.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link
                            href="#"
                            className="text-sm text-gray-700 hover:text-orange-500 transition-colors flex items-center gap-2"
                            style={{ fontFamily: 'Arial, sans-serif' }}
                          >
                            <span>•</span>
                            {link}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onStartLoading={handleStartLoading}
      />
      <LoadingScreen isVisible={isLoadingScreenVisible} />
    </>
  )
}
