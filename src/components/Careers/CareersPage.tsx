'use client'
import Link from 'next/link'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Footer from '@/components/Footer/Footer'
import LoginModal from '../Auth/LoginModal'
import LoadingScreen from '../Auth/LoadingScreen'
import { authService } from '@/services/auth'
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
  FiX
} from 'react-icons/fi'
import Image from 'next/image'

interface JobListing {
  id: string
  title: string
  type: 'Full time' | 'Part time' | 'Contract' | 'Collaboration'
  category: 'ENGINEERING' | 'OTHER'
  location: string
  workType: 'On-site' | 'Remote' | 'Hybrid'
  salary: string
  equity: string
}

const jobListings: JobListing[] = [
  {
    id: '1',
    title: 'Technical Co-founder',
    type: 'Full time',
    category: 'ENGINEERING',
    location: 'Seoul, KR',
    workType: 'On-site',
    salary: '',
    equity: '1%'
  },
  {
    id: '2',
    title: 'Creator Collaboration',
    type: 'Collaboration',
    category: 'OTHER',
    location: 'All',
    workType: 'Remote',
    salary: '',
    equity: 'Share Revenue'
  }
]

export default function CareersPage() {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'ENGINEERING' | 'OTHER'>('ALL')
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

  const filteredJobs = selectedCategory === 'ALL'
    ? jobListings
    : jobListings.filter(job => job.category === selectedCategory)

  const engineeringJobs = jobListings.filter(job => job.category === 'ENGINEERING')
  const otherJobs = jobListings.filter(job => job.category === 'OTHER')

  return (
    <>
    <div className={`min-h-screen bg-white ${isLoginModalOpen ? "blur-sm" : ""}`}>
      {/* Toolbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
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

        {/* Mobile Menu - New Design */}
        {isMobileMenuOpen && (
          <div className="min-[1000px]:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200 z-60 shadow-lg">
            <div className="px-8 py-6 space-y-4">
              <Link
                href="/#usecase"
                className="block text-black hover:text-gray-600 py-3 text-lg font-medium transition-colors border-b border-gray-200 last:border-b-0"
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontWeight: 500,
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Use cases
              </Link>
              <Link
                href="/careers"
                className="block text-black hover:text-gray-600 py-3 text-lg font-medium transition-colors border-b border-gray-200 last:border-b-0"
                style={{ fontFamily: "Arial, sans-serif", fontWeight: 500 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Careers
              </Link>
              <Link
                href="/blog"
                className="block text-black hover:text-gray-600 py-3 text-lg font-medium transition-colors border-b border-gray-200 last:border-b-0"
                style={{ fontFamily: "Arial, sans-serif", fontWeight: 500 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <Link
                href="/pricing"
                className="block text-black hover:text-gray-600 py-3 text-lg font-medium transition-colors border-b border-gray-200 last:border-b-0"
                style={{ fontFamily: "Arial, sans-serif", fontWeight: 500 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#enterprise"
                className="block text-black hover:text-gray-600 py-3 text-lg font-medium transition-colors border-b border-gray-200 last:border-b-0"
                style={{ fontFamily: "Arial, sans-serif", fontWeight: 500 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Enterprise sales
              </Link>
              <button
                onClick={() => {
                  handleGetStartedClick()
                  setIsMobileMenuOpen(false)
                }}
                className="w-full mt-6 bg-gray-200 hover:bg-gray-300 text-black px-6 py-3 text-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 group rounded-full"
                style={{ fontWeight: 550 }}
              >
                <FiArrowUpRight
                  size={18}
                  className="transition-transform duration-200 group-hover:rotate-45"
                />
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="ml-8 sm:ml-10 lg:ml-12 mr-8 sm:mr-10 lg:mr-12">
          {/* Header */}
          <div className="mb-16">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-medium text-orange-500 mb-4" style={{fontFamily: 'Spectral, serif', fontWeight: 500}}>
                Open roles
              </h1>
              <h2 className="text-3xl md:text-4xl font-medium text-black mb-3 leading-tight" style={{fontFamily: 'Spectral, serif', fontWeight: 500}}>
                Shape the future of data.
              </h2>
              <h2 className="text-3xl md:text-4xl font-medium text-black leading-tight" style={{fontFamily: 'Spectral, serif', fontWeight: 500}}>
                Build AI that transforms decisions.
              </h2>
            </div>
          </div>

          {/* Engineering Section */}
          <div className="mb-16">
            <h3 className="text-lg font-medium text-gray-600 mb-8 tracking-wide" style={{fontFamily: 'Arial, sans-serif'}}>
              ENGINEERING
            </h3>
            <div className="space-y-6">
              {engineeringJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => router.push(`/careers/${job.id}`)}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:bg-gray-50 hover:border-orange-300 transition-all duration-300 group relative overflow-hidden shadow-sm cursor-pointer"
                >
                  {/* Shine effect */}
                  <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-orange-100/50 to-transparent transform skew-x-12 group-hover:left-[100%] transition-all duration-700 ease-out"></div>
                  <div className="flex justify-between items-start relative z-10">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <h4 className="text-xl font-medium text-black" style={{fontFamily: 'Arial, sans-serif'}}>
                          {job.title}
                        </h4>
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full" style={{fontFamily: 'Arial, sans-serif'}}>
                          {job.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-gray-600 text-sm" style={{fontFamily: 'Arial, sans-serif'}}>
                        <div className="flex items-center gap-1">
                          <span className="text-lg">{job.location === 'All' ? '🌍' : '🇰🇷'}</span>
                          <span>{job.location}</span>
                        </div>
                        <span>•</span>
                        <span>{job.workType}</span>
                        {job.salary && (
                          <>
                            <span>•</span>
                            <span>{job.salary}</span>
                          </>
                        )}
                        <span>•</span>
                        <span>{job.equity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Other Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-600 mb-8 tracking-wide" style={{fontFamily: 'Arial, sans-serif'}}>
              OTHER
            </h3>
            <div className="space-y-6">
              {otherJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => router.push(`/careers/${job.id}`)}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:bg-gray-50 hover:border-orange-300 transition-all duration-300 group relative overflow-hidden shadow-sm cursor-pointer"
                >
                  {/* Shine effect */}
                  <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-orange-100/50 to-transparent transform skew-x-12 group-hover:left-[100%] transition-all duration-700 ease-out"></div>
                  <div className="flex justify-between items-start relative z-10">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <h4 className="text-xl font-medium text-black" style={{fontFamily: 'Arial, sans-serif'}}>
                          {job.title}
                        </h4>
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full" style={{fontFamily: 'Arial, sans-serif'}}>
                          {job.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-gray-600 text-sm" style={{fontFamily: 'Arial, sans-serif'}}>
                        <div className="flex items-center gap-1">
                          <span className="text-lg">{job.location === 'All' ? '🌍' : '🇰🇷'}</span>
                          <span>{job.location}</span>
                        </div>
                        <span>•</span>
                        <span>{job.workType}</span>
                        {job.salary && (
                          <>
                            <span>•</span>
                            <span>{job.salary}</span>
                          </>
                        )}
                        <span>•</span>
                        <span>{job.equity}</span>
                      </div>
                    </div>
                  </div>
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