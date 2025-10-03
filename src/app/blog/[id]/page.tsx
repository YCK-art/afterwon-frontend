'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter, useParams } from 'next/navigation'
import { blogService, BlogPost } from '@/services/blog'
import LoginModal from '../../../components/Auth/LoginModal'
import LoadingScreen from '../../../components/Auth/LoadingScreen'
import Footer from '../../../components/Footer/Footer'
import {
  FiArrowUpRight,
  FiArrowLeft,
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
  FiTrendingUp,
  FiActivity,
  FiZap,
  FiCpu,
  FiLock,
  FiPackage,
  FiPieChart,
  FiFileText,
  FiGrid,
  FiDatabase,
  FiGlobe,
  FiCloud,
} from 'react-icons/fi'

export default function BlogDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [blog, setBlog] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isLoadingScreenVisible, setIsLoadingScreenVisible] = useState(false)

  useEffect(() => {
    const fetchBlog = async () => {
      if (params.id) {
        setLoading(true)
        const blogData = await blogService.getBlogById(params.id as string)
        setBlog(blogData)
        setLoading(false)
      }
    }

    fetchBlog()
  }, [params.id])

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

  // 블로그별 고유 아이콘 매핑 (제목 기반)
  const getBlogIcon = (title: string) => {
    switch (title) {
      case 'AI for Financial Forecasting':
        return <FiTrendingUp className="w-32 h-32 text-white" strokeWidth={1.5} />
      case 'From Campaign Data to Customer Insights':
        return <FiTarget className="w-32 h-32 text-white" strokeWidth={1.5} />
      case 'Real-Time Data Processing Revolution':
        return <FiActivity className="w-32 h-32 text-white" strokeWidth={1.5} />
      case 'Graph Neural Networks for Social Analysis':
        return <FiUsers className="w-32 h-32 text-white" strokeWidth={1.5} />
      case 'Time Series Forecasting with Transformers':
        return <FiBarChart className="w-32 h-32 text-white" strokeWidth={1.5} />
      case 'Privacy-Preserving Analytics in Production':
        return <FiLock className="w-32 h-32 text-white" strokeWidth={1.5} />
      case 'Multi-Modal Data Fusion Techniques':
        return <FiGrid className="w-32 h-32 text-white" strokeWidth={1.5} />
      case 'Explainable AI for Transparency':
        return <FiFileText className="w-32 h-32 text-white" strokeWidth={1.5} />
      case 'Building Scalable Data Pipelines':
        return <FiDatabase className="w-32 h-32 text-white" strokeWidth={1.5} />
      case 'Zero-Trust Security Architecture':
        return <FiShield className="w-32 h-32 text-white" strokeWidth={1.5} />
      default:
        return <FiBookOpen className="w-32 h-32 text-white" strokeWidth={1.5} />
    }
  }

  const formatContent = (content: string) => {
    const lines = content.split('\n')
    const elements: JSX.Element[] = []
    let key = 0

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()

      if (!line) {
        elements.push(<div key={key++} className="h-3" />)
        continue
      }

      // Main section titles (larger, bold)
      if (
        line === 'Why Traditional Forecasting Falls Short' ||
        line === 'How AI Improves Financial Forecasting' ||
        line === 'Real-World Examples of AI in Forecasting' ||
        line === 'Business Benefits Beyond Accuracy' ||
        line === 'Key Challenges in Adopting AI Forecasting' ||
        line === 'Afterwon: Making Forecasting Simple' ||
        line === 'Why Traditional Marketing Analytics Isn\'t Enough' ||
        line === 'How AI Enhances Marketing Analytics' ||
        line === 'Real-World Examples of AI in Marketing Decisions' ||
        line === 'Business Impact of AI-Driven Marketing Insights' ||
        line === 'Challenges and Considerations' ||
        line === 'Afterwon: Simplifying Marketing Analytics with AI'
      ) {
        elements.push(
          <h2
            key={key++}
            className="text-3xl font-bold text-black mt-8 mb-4"
            style={{ fontFamily: 'SpectralLight, serif' }}
          >
            {line}
          </h2>
        )
        continue
      }

      // Numbered subsections (1., 2., 3.)
      if (/^\d+\.\s+/.test(line)) {
        const match = line.match(/^(\d+\.\s+)(.+)/)
        if (match) {
          elements.push(
            <h3
              key={key++}
              className="text-xl font-bold text-black mt-6 mb-2"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              {match[1]}{match[2]}
            </h3>
          )
        }
        continue
      }

      // Case studies (📊 Case X:)
      if (line.startsWith('📊 Case')) {
        elements.push(
          <h3
            key={key++}
            className="text-2xl font-bold text-orange-600 mt-8 mb-3"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            {line}
          </h3>
        )
        continue
      }

      // Bullet points
      if (line.startsWith('•')) {
        const text = line.substring(1).trim()
        // Check if it starts with bold text (e.g., "Problem:", "AI Solution:", "Impact:")
        const boldMatch = text.match(/^([^:]+:)(.*)/)
        if (boldMatch) {
          elements.push(
            <li key={key++} className="ml-6 mb-2 text-gray-800 leading-relaxed" style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>
              <strong className="font-semibold text-black">{boldMatch[1]}</strong>
              {boldMatch[2]}
            </li>
          )
        } else {
          elements.push(
            <li key={key++} className="ml-6 mb-2 text-gray-800 leading-relaxed" style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>
              {text}
            </li>
          )
        }
        continue
      }

      // Separator line
      if (line === '⸻' || line === '---') {
        elements.push(
          <div key={key++} className="my-5 border-t-2 border-gray-200" />
        )
        continue
      }

      // Regular paragraph
      elements.push(
        <p
          key={key++}
          className="text-gray-800 leading-relaxed mb-3"
          style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', lineHeight: '1.8' }}
        >
          {line}
        </p>
      )
    }

    return elements
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 mb-4">Blog not found</div>
          <button
            onClick={() => router.push('/blog')}
            className="text-orange-500 hover:text-orange-600"
          >
            Back to Blog
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={`min-h-screen bg-white ${isLoginModalOpen ? 'blur-sm' : ''}`}>
        {/* Toolbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
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
                      fontFamily: 'SpectralLight, serif',
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
                        fontFamily: 'Arial, sans-serif',
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
                              style={{ fontFamily: 'Arial, sans-serif' }}
                            >
                              Finance
                            </div>
                            <div
                              className="text-xs text-gray-600 leading-relaxed whitespace-nowrap"
                              style={{ fontFamily: 'Arial, sans-serif' }}
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
                              style={{ fontFamily: 'Arial, sans-serif' }}
                            >
                              Marketing
                            </div>
                            <div
                              className="text-xs text-gray-600 leading-relaxed whitespace-nowrap"
                              style={{ fontFamily: 'Arial, sans-serif' }}
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
                              style={{ fontFamily: 'Arial, sans-serif' }}
                            >
                              Product Team
                            </div>
                            <div
                              className="text-xs text-gray-600 leading-relaxed whitespace-nowrap"
                              style={{ fontFamily: 'Arial, sans-serif' }}
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
                              style={{ fontFamily: 'Arial, sans-serif' }}
                            >
                              Consulting
                            </div>
                            <div
                              className="text-xs text-gray-600 leading-relaxed whitespace-nowrap"
                              style={{ fontFamily: 'Arial, sans-serif' }}
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
                              style={{ fontFamily: 'Arial, sans-serif' }}
                            >
                              Research
                            </div>
                            <div
                              className="text-xs text-gray-600 leading-relaxed whitespace-nowrap"
                              style={{ fontFamily: 'Arial, sans-serif' }}
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
                    style={{ fontFamily: 'Arial, sans-serif', fontWeight: 550 }}
                  >
                    Careers
                  </a>
                  <div className="relative group">
                    <span
                      className="text-black hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                      style={{
                        fontFamily: 'Arial, sans-serif',
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
                              style={{ fontFamily: 'Arial, sans-serif' }}
                            >
                              Blog
                            </div>
                            <div
                              className="text-xs text-gray-600 leading-relaxed whitespace-nowrap"
                              style={{ fontFamily: 'Arial, sans-serif' }}
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
                              style={{ fontFamily: 'Arial, sans-serif' }}
                            >
                              Help Center
                            </div>
                            <div
                              className="text-xs text-gray-600 leading-relaxed whitespace-nowrap"
                              style={{ fontFamily: 'Arial, sans-serif' }}
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
                              style={{ fontFamily: 'Arial, sans-serif' }}
                            >
                              Security
                            </div>
                            <div
                              className="text-xs text-gray-600 leading-relaxed whitespace-nowrap"
                              style={{ fontFamily: 'Arial, sans-serif' }}
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
                    style={{ fontFamily: 'Arial, sans-serif', fontWeight: 550 }}
                  >
                    Pricing
                  </a>
                  <a
                    href="#enterprise"
                    className="text-black hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif', fontWeight: 550 }}
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

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="min-[1000px]:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200 z-60 shadow-lg">
              <div className="px-8 py-6 space-y-4">
                <a
                  href="/#usecase"
                  className="block text-black hover:text-gray-600 py-3 text-lg font-medium transition-colors border-b border-gray-200 last:border-b-0"
                  style={{
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: 500,
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Use cases
                </a>
                <a
                  href="/careers"
                  className="block text-black hover:text-gray-600 py-3 text-lg font-medium transition-colors border-b border-gray-200 last:border-b-0"
                  style={{ fontFamily: 'Arial, sans-serif', fontWeight: 500 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Careers
                </a>
                <a
                  href="/blog"
                  className="block text-black hover:text-gray-600 py-3 text-lg font-medium transition-colors border-b border-gray-200 last:border-b-0"
                  style={{ fontFamily: 'Arial, sans-serif', fontWeight: 500 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Resources
                </a>
                <a
                  href="/pricing"
                  className="block text-black hover:text-gray-600 py-3 text-lg font-medium transition-colors border-b border-gray-200 last:border-b-0"
                  style={{ fontFamily: 'Arial, sans-serif', fontWeight: 500 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </a>
                <a
                  href="#enterprise"
                  className="block text-black hover:text-gray-600 py-3 text-lg font-medium transition-colors border-b border-gray-200 last:border-b-0"
                  style={{ fontFamily: 'Arial, sans-serif', fontWeight: 500 }}
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
        <main className="relative z-10 pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <button
              onClick={() => router.push('/blog')}
              className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors mb-8"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              <FiArrowLeft size={20} />
              <span>Back to Blog</span>
            </button>

            {/* Hero Image */}
            <div className={`aspect-[21/9] ${blog.gradient} rounded-2xl mb-8 relative overflow-hidden flex items-center justify-center`}>
              {/* Icon */}
              <div className="relative z-10 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-12 shadow-2xl">
                  {getBlogIcon(blog.title)}
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            </div>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
              <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full font-medium">
                {blog.category}
              </span>
              <span>·</span>
              <span>{blog.date}</span>
            </div>

            {/* Title */}
            <h1
              className="text-5xl font-bold text-black mb-8"
              style={{ fontFamily: 'SpectralLight, serif' }}
            >
              {blog.title}
            </h1>

            {/* Content */}
            <article className="prose prose-lg max-w-none">
              {formatContent(blog.content)}
            </article>

            {/* CTA Section */}
            <div className="mt-16 mb-8">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-12 text-center shadow-lg border border-orange-200">
                <div className="max-w-2xl mx-auto">
                  <h3
                    className="text-3xl font-bold text-black mb-4"
                    style={{ fontFamily: 'SpectralLight, serif' }}
                  >
                    Ready to Transform Your Data?
                  </h3>
                  <p
                    className="text-gray-700 text-lg mb-8 leading-relaxed"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Start using Afterwon today and turn your spreadsheets into actionable insights with AI-powered analysis.
                  </p>
                  <div className="flex justify-center">
                    <button
                      onClick={handleGetStartedClick}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold text-base transition-all duration-200 flex items-center justify-center gap-2 group shadow-md hover:shadow-xl"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      Get Started Free
                      <FiArrowUpRight
                        size={18}
                        className="transition-transform duration-200 group-hover:rotate-45"
                      />
                    </button>
                  </div>
                </div>
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
