'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import LoginModal from '../../components/Auth/LoginModal'
import LoadingScreen from '../../components/Auth/LoadingScreen'
import Footer from '../../components/Footer/Footer'
import { blogService, BlogPost } from '@/services/blog'
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
  FiTrendingUp,
  FiActivity,
  FiLock,
  FiCheck,
  FiChevronDown,
  FiFileText,
  FiGrid,
  FiDatabase,
} from 'react-icons/fi'

export default function BlogPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Finance' | 'Marketing' | 'Growth' | 'Research' | 'AI & Data Analysis' | 'Integrations' | 'Security & Compliance' | 'Company News'>('All')
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isLoadingScreenVisible, setIsLoadingScreenVisible] = useState(false)
  const [visibleCount, setVisibleCount] = useState(9)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'a-z' | 'z-a'>('newest')
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)
  const router = useRouter()

  // Firestore에서 블로그 데이터 가져오기
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true)
      const blogs = await blogService.getAllBlogs()
      setBlogPosts(blogs)
      setLoading(false)
    }

    fetchBlogs()
  }, [])

  // 블로그별 고유 아이콘 매핑 (제목 기반)
  const getBlogIcon = (title: string) => {
    switch (title) {
      case 'AI for Financial Forecasting':
        return <FiTrendingUp className="w-16 h-16 text-white" strokeWidth={1.5} />
      case 'From Campaign Data to Customer Insights':
        return <FiTarget className="w-16 h-16 text-white" strokeWidth={1.5} />
      case 'Real-Time Data Processing Revolution':
        return <FiActivity className="w-16 h-16 text-white" strokeWidth={1.5} />
      case 'Graph Neural Networks for Social Analysis':
        return <FiUsers className="w-16 h-16 text-white" strokeWidth={1.5} />
      case 'Time Series Forecasting with Transformers':
        return <FiBarChart className="w-16 h-16 text-white" strokeWidth={1.5} />
      case 'Privacy-Preserving Analytics in Production':
        return <FiLock className="w-16 h-16 text-white" strokeWidth={1.5} />
      case 'Multi-Modal Data Fusion Techniques':
        return <FiGrid className="w-16 h-16 text-white" strokeWidth={1.5} />
      case 'Explainable AI for Transparency':
        return <FiFileText className="w-16 h-16 text-white" strokeWidth={1.5} />
      case 'Building Scalable Data Pipelines':
        return <FiDatabase className="w-16 h-16 text-white" strokeWidth={1.5} />
      case 'Zero-Trust Security Architecture':
        return <FiShield className="w-16 h-16 text-white" strokeWidth={1.5} />
      default:
        return <FiBookOpen className="w-16 h-16 text-white" strokeWidth={1.5} />
    }
  }

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

  const categories = ['All', 'Finance', 'Marketing', 'Growth', 'Research', 'AI & Data Analysis', 'Integrations', 'Security & Compliance', 'Company News']

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory)

  // 정렬 적용
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortOrder) {
      case 'newest':
        // date 문자열을 Date 객체로 변환하여 비교
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case 'a-z':
        return a.title.localeCompare(b.title)
      case 'z-a':
        return b.title.localeCompare(a.title)
      default:
        return 0
    }
  })

  const visiblePosts = sortedPosts.slice(0, visibleCount)
  const hasMore = visibleCount < sortedPosts.length

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 9)
  }

  const getSortLabel = () => {
    switch (sortOrder) {
      case 'newest':
        return 'Newest First'
      case 'oldest':
        return 'Oldest First'
      case 'a-z':
        return 'A-Z'
      case 'z-a':
        return 'Z-A'
      default:
        return 'Sort'
    }
  }

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.sort-dropdown')) {
        setIsSortDropdownOpen(false)
      }
    }

    if (isSortDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSortDropdownOpen])

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
      <main className="relative z-10 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1
              className="text-4xl md:text-5xl font-bold text-black mb-6"
              style={{ fontFamily: 'Spectral, serif', fontWeight: 600 }}
            >
              Blog
            </h1>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-16">
            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category as any)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative sort-dropdown">
              <button
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 text-sm font-medium"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                <span>Sort</span>
                <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isSortDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <button
                    onClick={() => {
                      setSortOrder('newest')
                      setIsSortDropdownOpen(false)
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${sortOrder === 'newest' ? 'border-orange-500' : 'border-gray-300'}`}>
                        {sortOrder === 'newest' && <div className="w-2 h-2 rounded-full bg-orange-500" />}
                      </div>
                      <span className="text-sm text-gray-700 group-hover:text-gray-900" style={{ fontFamily: 'Arial, sans-serif' }}>
                        Newest First
                      </span>
                    </div>
                    {sortOrder === 'newest' && <FiCheck className="w-4 h-4 text-orange-500" />}
                  </button>
                  <button
                    onClick={() => {
                      setSortOrder('oldest')
                      setIsSortDropdownOpen(false)
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${sortOrder === 'oldest' ? 'border-orange-500' : 'border-gray-300'}`}>
                        {sortOrder === 'oldest' && <div className="w-2 h-2 rounded-full bg-orange-500" />}
                      </div>
                      <span className="text-sm text-gray-700 group-hover:text-gray-900" style={{ fontFamily: 'Arial, sans-serif' }}>
                        Oldest First
                      </span>
                    </div>
                    {sortOrder === 'oldest' && <FiCheck className="w-4 h-4 text-orange-500" />}
                  </button>
                  <button
                    onClick={() => {
                      setSortOrder('a-z')
                      setIsSortDropdownOpen(false)
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${sortOrder === 'a-z' ? 'border-orange-500' : 'border-gray-300'}`}>
                        {sortOrder === 'a-z' && <div className="w-2 h-2 rounded-full bg-orange-500" />}
                      </div>
                      <span className="text-sm text-gray-700 group-hover:text-gray-900" style={{ fontFamily: 'Arial, sans-serif' }}>
                        A-Z
                      </span>
                    </div>
                    {sortOrder === 'a-z' && <FiCheck className="w-4 h-4 text-orange-500" />}
                  </button>
                  <button
                    onClick={() => {
                      setSortOrder('z-a')
                      setIsSortDropdownOpen(false)
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${sortOrder === 'z-a' ? 'border-orange-500' : 'border-gray-300'}`}>
                        {sortOrder === 'z-a' && <div className="w-2 h-2 rounded-full bg-orange-500" />}
                      </div>
                      <span className="text-sm text-gray-700 group-hover:text-gray-900" style={{ fontFamily: 'Arial, sans-serif' }}>
                        Z-A
                      </span>
                    </div>
                    {sortOrder === 'z-a' && <FiCheck className="w-4 h-4 text-orange-500" />}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Blog Posts Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-gray-500">Loading blogs...</div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visiblePosts.map((post) => (
                <Link href={`/blog/${post.id}`} key={post.id}>
                  <article className="group cursor-pointer">
                    {/* Image */}
                    <div className={`aspect-[4/3] ${post.gradient} rounded-2xl overflow-hidden mb-4 group-hover:opacity-90 transition-opacity duration-300 relative flex items-center justify-center`}>
                      <div className="relative z-10 bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                        {getBlogIcon(post.title)}
                      </div>
                      {/* Decorative elements */}
                      <div className="absolute top-4 left-4 w-12 h-12 bg-white/10 rounded-full blur-lg" />
                      <div className="absolute bottom-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
                    </div>

                    {/* Title */}
                    <h3
                      className="text-black font-medium text-lg leading-tight mb-3 line-clamp-2 group-hover:text-orange-500 transition-colors"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      {post.title}
                    </h3>

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span style={{ fontFamily: 'Arial, sans-serif' }}>
                        {post.category}
                      </span>
                      <span>·</span>
                      <span style={{ fontFamily: 'Arial, sans-serif' }}>
                        {post.date}
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center mt-12">
              <button
                onClick={handleLoadMore}
                className="bg-gray-100 hover:bg-gray-200 text-black px-8 py-3 text-sm font-medium transition-all duration-200 rounded-full"
                style={{ fontWeight: 550, fontFamily: 'Arial, sans-serif' }}
              >
                Load More
              </button>
            </div>
          )}
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