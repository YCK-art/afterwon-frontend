'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Footer from '@/components/Footer/Footer'
import LoginModal from '../../components/Auth/LoginModal'
import LoadingScreen from '../../components/Auth/LoadingScreen'
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
  FiX,
  FiCheck,
  FiHelpCircle,
  FiMinus
} from 'react-icons/fi'

// Tooltip Component
function FeatureTooltip({ content }: { content: string }) {
  return (
    <div className="group relative inline-block">
      <FiHelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
        <div className="text-center">{content}</div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  )
}

// Animated Number Component
function AnimatedNumber({ value, duration = 800 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(value)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (displayValue !== value) {
      setIsAnimating(true)
      const startValue = displayValue
      const difference = value - startValue
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentValue = Math.round(startValue + difference * easeOutQuart)

        setDisplayValue(currentValue)

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setIsAnimating(false)
        }
      }

      requestAnimationFrame(animate)
    }
  }, [value, duration, displayValue])

  return (
    <span className={`transition-all duration-200 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
      {displayValue}
    </span>
  )
}

export default function PricingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annually'>('monthly')
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

  const proPrice = billingPeriod === 'monthly' ? 20 : 150

  return (
    <>
    <div className={`min-h-screen bg-white ${isLoginModalOpen ? "blur-sm" : ""}`}>
      {/* Toolbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-16">
            {/* Logo - moved inward */}
            <div className="flex items-center ml-2 sm:ml-4 lg:ml-6">
              <a href="/" className="flex-shrink-0 flex items-center gap-1">
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
              </a>
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
                      <a
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
                      </a>
                      <a
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
                      </a>
                      <a
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
                      </a>
                      <a
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
                      </a>
                      <a
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
                      </a>
                    </div>
                  </div>
                </div>

                <a
                  href="/careers"
                  className="text-black hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  style={{ fontFamily: "Arial, sans-serif", fontWeight: 550 }}
                >
                  Careers
                </a>
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
                      <a
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
                      </a>
                      <a
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
                      </a>
                      <a
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
                      </a>
                    </div>
                  </div>
                </div>
                <a
                  href="/pricing"
                  className="text-black hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  style={{ fontFamily: "Arial, sans-serif", fontWeight: 550 }}
                >
                  Pricing
                </a>
                <a
                  href="#enterprise"
                  className="text-black hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  style={{ fontFamily: "Arial, sans-serif", fontWeight: 550 }}
                >
                  Enterprise sales
                </a>
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
              <a
                href="/#usecase"
                className="block text-black hover:text-gray-600 py-3 text-lg font-medium transition-colors border-b border-gray-200 last:border-b-0"
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontWeight: 500,
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Use cases
              </a>
              <a
                href="/careers"
                className="block text-black hover:text-gray-600 py-3 text-lg font-medium transition-colors border-b border-gray-200 last:border-b-0"
                style={{ fontFamily: "Arial, sans-serif", fontWeight: 500 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Careers
              </a>
              <a
                href="/blog"
                className="block text-black hover:text-gray-600 py-3 text-lg font-medium transition-colors border-b border-gray-200 last:border-b-0"
                style={{ fontFamily: "Arial, sans-serif", fontWeight: 500 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resources
              </a>
              <a
                href="/pricing"
                className="block text-black hover:text-gray-600 py-3 text-lg font-medium transition-colors border-b border-gray-200 last:border-b-0"
                style={{ fontFamily: "Arial, sans-serif", fontWeight: 500 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#enterprise"
                className="block text-black hover:text-gray-600 py-3 text-lg font-medium transition-colors border-b border-gray-200 last:border-b-0"
                style={{ fontFamily: "Arial, sans-serif", fontWeight: 500 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Enterprise sales
              </a>
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
      <main className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1
              className="text-5xl md:text-6xl font-bold text-black mb-6"
              style={{ fontFamily: 'Spectral, serif', fontWeight: 600 }}
            >
              AI Analyst{' '}
              <span className="inline-flex items-center gap-2">
                <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center">
                  <FiArrowUpRight className="w-8 h-8 text-white" />
                </div>
              </span>{' '}
              only for you.
            </h1>
            <p
              className="text-xl text-gray-600 max-w-2xl mx-auto mb-12"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              Experience the world's most advanced AI data analyst.
              <br />
              Tailored to your needs, powered by cutting-edge intelligence.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-16">
              <div className="bg-gray-100 rounded-full p-1 flex relative">
                <div
                  className={`absolute top-1 bottom-1 bg-black rounded-full transition-all duration-300 ease-in-out ${
                    billingPeriod === 'monthly'
                      ? 'left-1 right-1/2'
                      : 'left-1/2 right-1'
                  }`}
                />
                <button
                  onClick={() => setBillingPeriod('monthly')}
                  className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    billingPeriod === 'monthly'
                      ? 'text-white'
                      : 'text-gray-600 hover:text-black'
                  }`}
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingPeriod('annually')}
                  className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    billingPeriod === 'annually'
                      ? 'text-white'
                      : 'text-gray-600 hover:text-black'
                  }`}
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Annually
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-white rounded-2xl border border-gray-300 p-8 shadow-2xl h-full" style={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)' }}>
              <div className="mb-12">
                <h3
                  className="text-sm font-medium text-gray-600 mb-6"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Starter
                </h3>
                <div className="mb-6">
                  <span
                    className="text-5xl font-bold text-black"
                    style={{ fontFamily: 'Spectral, serif' }}
                  >
                    Free
                  </span>
                </div>
                <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center group">
                  <span
                    className="font-medium"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Get Started
                  </span>
                </button>
              </div>

              <div className="mb-6">
                <p
                  className="text-gray-900 font-medium mb-4"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  All essential features.
                </p>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <FiCheck className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span
                    className="text-gray-700"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Limited AI responses
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <FiCheck className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span
                    className="text-gray-700"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Unlimited real-time data analysis
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <FiCheck className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span
                    className="text-gray-700"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Customize instructions & upload files
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <FiCheck className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span
                    className="text-gray-700"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Ask AI about all your past analyses
                  </span>
                </li>
              </ul>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-2xl border border-gray-300 p-8 shadow-2xl h-full" style={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)' }}>
              <div className="mb-12">
                <h3
                  className="text-sm font-medium text-gray-600 mb-6"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Pro
                </h3>
                <div className="mb-6">
                  <span
                    className="text-5xl font-bold text-black"
                    style={{ fontFamily: 'Spectral, serif' }}
                  >
                    $<AnimatedNumber value={proPrice} />
                  </span>
                  <span
                    className="text-gray-600 ml-2 transition-all duration-300"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    / {billingPeriod === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg transition-all duration-200">
                  <span
                    className="font-medium"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Subscribe
                  </span>
                </button>
              </div>

              <div className="mb-6">
                <p
                  className="text-gray-900 font-medium mb-4"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Unlimited access.
                </p>
                <p
                  className="text-gray-700 font-medium mb-4"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Everything in Starter, plus...
                </p>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <FiCheck className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span
                    className="text-gray-700"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Unlimited AI responses
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <FiCheck className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span
                    className="text-gray-700"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Unlimited access to latest AI models
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <FiCheck className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span
                    className="text-gray-700"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Priority support
                  </span>
                </li>
              </ul>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-2xl border border-gray-300 p-8 shadow-2xl h-full" style={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)' }}>
              <div className="mb-12">
                <h3
                  className="text-sm font-medium text-gray-600 mb-6"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Enterprise
                </h3>
                <div className="mb-6">
                  <span
                    className="text-5xl font-bold text-black"
                    style={{ fontFamily: 'Spectral, serif' }}
                  >
                    Custom
                  </span>
                </div>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg transition-all duration-200">
                  <span
                    className="font-medium"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Talk to sales
                  </span>
                </button>
              </div>

              <div className="mb-6">
                <p
                  className="text-gray-900 font-medium mb-4"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Custom knowledge for teams.
                </p>
                <p
                  className="text-gray-700 font-medium mb-4"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Everything in Pro, plus...
                </p>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <FiCheck className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span
                    className="text-gray-700"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Post-analysis coaching and analytics
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <FiCheck className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span
                    className="text-gray-700"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    RAG knowledge base
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <FiCheck className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span
                    className="text-gray-700"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    User provisioning & role-based access
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <FiCheck className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span
                    className="text-gray-700"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Single sign-on & IDP integration
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <FiCheck className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span
                    className="text-gray-700"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Enterprise security & no data training
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Compare Plans Section */}
          <div className="mt-32 max-w-7xl mx-auto">
            <h2
              className="text-5xl font-bold text-center text-black mb-4"
              style={{ fontFamily: 'SpectralLight, serif' }}
            >
              Compare Plans
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                {/* Sticky Header */}
                <thead className="sticky top-16 bg-white z-10">
                  <tr>
                    <th className="text-left px-6 py-3 bg-gray-50 min-w-[250px]">
                      <div className="text-lg font-bold text-black" style={{ fontFamily: 'SpectralLight, serif' }}>
                        Product Features
                      </div>
                    </th>
                    <th className="text-center px-6 py-3 bg-white min-w-[200px]">
                      <div className="text-xl font-bold text-black" style={{ fontFamily: 'SpectralLight, serif' }}>
                        Starter
                      </div>
                      <button className="text-sm text-orange-500 hover:text-orange-600 font-medium mt-1">
                        Get started
                      </button>
                    </th>
                    <th className="text-center px-6 py-3 bg-white min-w-[200px]">
                      <div className="text-xl font-bold text-black" style={{ fontFamily: 'SpectralLight, serif' }}>
                        Pro
                      </div>
                      <button className="text-sm text-orange-500 hover:text-orange-600 font-medium mt-1">
                        Get started
                      </button>
                    </th>
                    <th className="text-center px-6 py-3 bg-white min-w-[200px]">
                      <div className="text-xl font-bold text-black" style={{ fontFamily: 'SpectralLight, serif' }}>
                        Enterprise
                      </div>
                      <button className="text-sm text-orange-500 hover:text-orange-600 font-medium mt-1">
                        Talk to an expert
                      </button>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {/* AI Responses */}
                  <tr>
                    <td className="p-6 bg-gray-50">
                      <div className="flex items-center gap-2">
                        <span className="text-base text-gray-900 font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>
                          AI Responses
                        </span>
                        <FeatureTooltip content="Number of AI-powered responses you can receive per month for data analysis and insights" />
                      </div>
                    </td>
                    <td className="p-6 text-center text-gray-700">
                      <span style={{ fontFamily: 'Arial, sans-serif' }}>Limited</span>
                    </td>
                    <td className="p-6 text-center text-gray-700">
                      <span style={{ fontFamily: 'Arial, sans-serif' }}>Unlimited</span>
                    </td>
                    <td className="p-6 text-center text-gray-700">
                      <span style={{ fontFamily: 'Arial, sans-serif' }}>Unlimited</span>
                    </td>
                  </tr>

                  {/* File Upload */}
                  <tr>
                    <td className="p-6 bg-gray-50">
                      <div className="flex items-center gap-2">
                        <span className="text-base text-gray-900 font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>
                          File Upload
                        </span>
                        <FeatureTooltip content="Upload data files for AI analysis. Supports CSV, Excel, JSON, and other common formats" />
                      </div>
                    </td>
                    <td className="p-6 text-center text-gray-700">
                      <span style={{ fontFamily: 'Arial, sans-serif' }}>Under 5MB</span>
                    </td>
                    <td className="p-6 text-center text-gray-700">
                      <span style={{ fontFamily: 'Arial, sans-serif' }}>Under 50MB</span>
                    </td>
                    <td className="p-6 text-center text-gray-700">
                      <span style={{ fontFamily: 'Arial, sans-serif' }}>Under 500MB</span>
                    </td>
                  </tr>

                  {/* Data Analysis */}
                  <tr>
                    <td className="p-6 bg-gray-50">
                      <div className="flex items-center gap-2">
                        <span className="text-base text-gray-900 font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>
                          Real-time Data Analysis
                        </span>
                        <FeatureTooltip content="Analyze your data in real-time with instant insights and visualizations powered by AI" />
                      </div>
                    </td>
                    <td className="p-6 text-center">
                      <FiCheck className="w-5 h-5 text-orange-500 mx-auto" />
                    </td>
                    <td className="p-6 text-center">
                      <FiCheck className="w-5 h-5 text-orange-500 mx-auto" />
                    </td>
                    <td className="p-6 text-center">
                      <FiCheck className="w-5 h-5 text-orange-500 mx-auto" />
                    </td>
                  </tr>

                  {/* Advanced AI Models */}
                  <tr>
                    <td className="p-6 bg-gray-50">
                      <div className="flex items-center gap-2">
                        <span className="text-base text-gray-900 font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>
                          Advanced AI Models
                        </span>
                        <FeatureTooltip content="Access to the latest and most powerful AI models including GPT-4, Claude, and custom-trained models" />
                      </div>
                    </td>
                    <td className="p-6 text-center">
                      <FiMinus className="w-5 h-5 text-gray-300 mx-auto" />
                    </td>
                    <td className="p-6 text-center">
                      <FiCheck className="w-5 h-5 text-orange-500 mx-auto" />
                    </td>
                    <td className="p-6 text-center">
                      <FiCheck className="w-5 h-5 text-orange-500 mx-auto" />
                    </td>
                  </tr>

                  {/* Team Collaboration */}
                  <tr>
                    <td className="p-6 bg-gray-50">
                      <div className="flex items-center gap-2">
                        <span className="text-base text-gray-900 font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>
                          Team Collaboration
                        </span>
                        <FeatureTooltip content="Share analyses, insights, and workspaces with team members for better collaboration" />
                      </div>
                    </td>
                    <td className="p-6 text-center ">
                      <FiMinus className="w-5 h-5 text-gray-300 mx-auto" />
                    </td>
                    <td className="p-6 text-center text-gray-700 ">
                      <span style={{ fontFamily: 'Arial, sans-serif' }}>Up to 5 users</span>
                    </td>
                    <td className="p-6 text-center text-gray-700">
                      <span style={{ fontFamily: 'Arial, sans-serif' }}>Unlimited</span>
                    </td>
                  </tr>

                  {/* Custom Integrations */}
                  <tr className="">
                    <td className="p-6 bg-gray-50 ">
                      <div className="flex items-center gap-2">
                        <span className="text-base text-gray-900 font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>
                          Custom Integrations
                        </span>
                        <FeatureTooltip content="Connect with your existing tools and data sources like Salesforce, Google Analytics, databases, and more" />
                      </div>
                    </td>
                    <td className="p-6 text-center ">
                      <FiMinus className="w-5 h-5 text-gray-300 mx-auto" />
                    </td>
                    <td className="p-6 text-center text-gray-700 ">
                      <span style={{ fontFamily: 'Arial, sans-serif' }}>3 integrations</span>
                    </td>
                    <td className="p-6 text-center">
                      <FiCheck className="w-5 h-5 text-orange-500 mx-auto" />
                    </td>
                  </tr>

                  {/* Priority Support */}
                  <tr className="">
                    <td className="p-6 bg-gray-50 ">
                      <div className="flex items-center gap-2">
                        <span className="text-base text-gray-900 font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>
                          Priority Support
                        </span>
                        <FeatureTooltip content="Get faster response times and dedicated support channels for your questions and issues" />
                      </div>
                    </td>
                    <td className="p-6 text-center ">
                      <FiMinus className="w-5 h-5 text-gray-300 mx-auto" />
                    </td>
                    <td className="p-6 text-center ">
                      <FiCheck className="w-5 h-5 text-orange-500 mx-auto" />
                    </td>
                    <td className="p-6 text-center">
                      <FiCheck className="w-5 h-5 text-orange-500 mx-auto" />
                    </td>
                  </tr>

                  {/* API Access */}
                  <tr className="">
                    <td className="p-6 bg-gray-50 ">
                      <div className="flex items-center gap-2">
                        <span className="text-base text-gray-900 font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>
                          API Access
                        </span>
                        <FeatureTooltip content="Programmatic access to integrate Afterwon AI capabilities into your own applications and workflows" />
                      </div>
                    </td>
                    <td className="p-6 text-center ">
                      <FiMinus className="w-5 h-5 text-gray-300 mx-auto" />
                    </td>
                    <td className="p-6 text-center ">
                      <FiMinus className="w-5 h-5 text-gray-300 mx-auto" />
                    </td>
                    <td className="p-6 text-center">
                      <FiCheck className="w-5 h-5 text-orange-500 mx-auto" />
                    </td>
                  </tr>

                  {/* Custom Training */}
                  <tr className="">
                    <td className="p-6 bg-gray-50 ">
                      <div className="flex items-center gap-2">
                        <span className="text-base text-gray-900 font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>
                          Custom Training
                        </span>
                        <FeatureTooltip content="Train AI models on your specific data and use cases for industry-specific insights and terminology" />
                      </div>
                    </td>
                    <td className="p-6 text-center ">
                      <FiMinus className="w-5 h-5 text-gray-300 mx-auto" />
                    </td>
                    <td className="p-6 text-center ">
                      <FiMinus className="w-5 h-5 text-gray-300 mx-auto" />
                    </td>
                    <td className="p-6 text-center">
                      <FiCheck className="w-5 h-5 text-orange-500 mx-auto" />
                    </td>
                  </tr>

                  {/* Dedicated Account Manager */}
                  <tr>
                    <td className="p-6 bg-gray-50 ">
                      <div className="flex items-center gap-2">
                        <span className="text-base text-gray-900 font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>
                          Dedicated Account Manager
                        </span>
                        <FeatureTooltip content="A dedicated expert to help you maximize value, provide strategic guidance, and ensure smooth operations" />
                      </div>
                    </td>
                    <td className="p-6 text-center ">
                      <FiMinus className="w-5 h-5 text-gray-300 mx-auto" />
                    </td>
                    <td className="p-6 text-center ">
                      <FiMinus className="w-5 h-5 text-gray-300 mx-auto" />
                    </td>
                    <td className="p-6 text-center">
                      <FiCheck className="w-5 h-5 text-orange-500 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
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