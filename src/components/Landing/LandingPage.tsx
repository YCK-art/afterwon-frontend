"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiArrowUpRight,
  FiArrowLeft,
  FiArrowRight,
  FiPlay,
  FiMenu,
  FiX,
  FiDollarSign,
  FiTrendingUp,
  FiBarChart,
  FiChevronDown,
  FiChevronUp,
  FiMail,
  FiUsers,
  FiTarget,
  FiLayers,
  FiBookOpen,
  FiLifeBuoy,
  FiShield,
  FiGlobe,
  FiCheck,
  FiActivity,
  FiLock,
  FiGrid,
  FiFileText,
  FiDatabase,
} from "react-icons/fi";
import { FaTwitter, FaInstagram } from "react-icons/fa";
import LoginModal from "../Auth/LoginModal";
import LoadingScreen from "../Auth/LoadingScreen";
import { blogService } from "@/services/blog";
import type { BlogPost } from "@/services/blog";
import { authService } from "@/services/auth";
import { useRouter } from "next/navigation";

// FAQ Item Component
function FAQItem({ question, answer, isLast }: { question: string; answer: string; isLast?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${!isLast ? 'border-b border-gray-200' : ''}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
      >
        <span
          className="text-lg font-medium text-black pr-4"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          {question}
        </span>
        <div className="flex-shrink-0">
          <FiChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6">
          <p
            className="text-gray-600 leading-relaxed"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoadingScreenVisible, setIsLoadingScreenVisible] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("Finance");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const autoSlideIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Sample images for the slider (you can replace with actual image paths)
  const images = [
    "/image/logo.png", // Using existing logo as placeholder
    "/image/logo.png", // You can add more image paths here
    "/image/logo.png",
  ];

  const formats = [
    "Finance",
    "Marketing",
    "Product Team",
    "Consulting",
    "Research",
  ];

  const reviews = [
    {
      text: "I feel like I've been riding a bike using AI tools and it seems like you've handed me a motorcycle.",
      author: "Hedge Fund Portfolio Manager"
    },
    {
      text: "This platform transformed our data analysis workflow completely. What used to take hours now takes minutes.",
      author: "Senior Data Analyst"
    },
    {
      text: "The insights we get from our financial data are incredible. It's like having a team of analysts at our fingertips.",
      author: "Investment Director"
    }
  ];

  // State for latest blog posts
  const [latestBlogs, setLatestBlogs] = useState<BlogPost[]>([]);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check for redirect result on page load
  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        const user = await authService.checkRedirectResult();
        if (user) {
          console.log("User signed in via redirect:", user);
          setIsLoadingScreenVisible(true);
          // Add delay and redirect to chat
          await new Promise((resolve) => setTimeout(resolve, 1500));
          router.push("/chat");
        }
      } catch (error) {
        console.error("Redirect result error:", error);
      }
    };

    checkRedirectResult();
  }, [router]);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isLanguageMenuOpen && !target.closest('.language-selector')) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLanguageMenuOpen]);

  // Progress bar and auto-slide effect for cards
  useEffect(() => {
    const startProgressAndAutoSlide = () => {
      // Clear existing intervals
      if (autoSlideIntervalRef.current) {
        clearInterval(autoSlideIntervalRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }

      // Reset progress
      setProgressPercentage(0);

      // Progress bar update (every 70ms for smooth animation = 7000ms / 100)
      let progress = 0;
      progressIntervalRef.current = setInterval(() => {
        progress += 1;
        setProgressPercentage(progress);

        if (progress >= 100) {
          clearInterval(progressIntervalRef.current!);
        }
      }, 70);

      // Auto slide after 7 seconds
      autoSlideIntervalRef.current = setTimeout(() => {
        console.log("Auto-slide triggered");

        // Get current state directly from the ref to avoid stale closure
        setSelectedFormat((currentFormat) => {
          const currentIndex = formats.indexOf(currentFormat);
          const nextIndex = (currentIndex + 1) % formats.length;
          const nextFormat = formats[nextIndex];
          console.log(
            `Moving from ${currentFormat} (index: ${currentIndex}) to ${nextFormat} (index: ${nextIndex})`
          );

          // Move to next card immediately with the correct index
          setTimeout(() => {
            const moveCard = () => {
              if (scrollContainerRef.current) {
                const container = scrollContainerRef.current.parentElement;
                if (container) {
                  const cardWidth = window.innerWidth * 0.85; // 85vw per card
                  const scrollPosition = nextIndex * cardWidth;

                  console.log(
                    `Scrolling to position: ${scrollPosition}, cardWidth: ${cardWidth}, nextIndex: ${nextIndex}`
                  );

                  container.scrollTo({
                    left: scrollPosition,
                    behavior: "smooth",
                  });

                  // Verify scroll position after a delay
                  setTimeout(() => {
                    if (Math.abs(container.scrollLeft - scrollPosition) > 10) {
                      console.log("Scroll failed, retrying...");
                      container.scrollTo({
                        left: scrollPosition,
                        behavior: "smooth",
                      });
                    }
                  }, 500);
                } else {
                  console.error("Container not found");
                }
              } else {
                console.log("ScrollContainerRef not ready yet, skipping");
              }
            };

            // Try to move immediately and with delay
            moveCard();
            setTimeout(moveCard, 100);
          }, 50);

          return nextFormat;
        });

        // Reset progress
        setProgressPercentage(0);

        // Restart the cycle immediately
        setTimeout(() => startProgressAndAutoSlide(), 200);
      }, 7000);
    };

    // Start auto slide only on client side with a delay to ensure DOM is ready
    if (typeof window !== "undefined") {
      const timer = setTimeout(() => {
        if (scrollContainerRef.current) {
          startProgressAndAutoSlide();
        } else {
          // Retry after a longer delay if ref is not ready
          const retryTimer = setTimeout(() => {
            startProgressAndAutoSlide();
          }, 500);
        }
      }, 100);

      return () => clearTimeout(timer);
    }

    // Cleanup on unmount
    return () => {
      if (autoSlideIntervalRef.current) {
        clearTimeout(autoSlideIntervalRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  // Hero section image auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  // Fetch latest blog posts
  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const blogs = await blogService.getAllBlogs();
        // Get latest 3 blogs sorted by date
        const sortedBlogs = blogs
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 3);
        setLatestBlogs(sortedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchLatestBlogs();
  }, []);

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
    setIsLoginModalOpen(true);
  };

  const handleStartLoading = () => {
    setIsLoadingScreenVisible(!isLoadingScreenVisible);
  };

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
    // Replace iframe src with autoplay parameter
    if (iframeRef.current) {
      iframeRef.current.src =
        "https://www.youtube.com/embed/UF8uR6Z6KLc?autoplay=1&enablejsapi=1";
    }
  };

  const handleFormatClick = (format: string) => {
    setSelectedFormat(format);
    const index = formats.indexOf(format);

    // Clear current timers
    if (autoSlideIntervalRef.current) {
      clearTimeout(autoSlideIntervalRef.current);
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    // Reset progress
    setProgressPercentage(0);

    // Move to selected card with enhanced reliability
    const moveToCard = () => {
      if (scrollContainerRef.current && index !== -1) {
        const container = scrollContainerRef.current.parentElement;
        if (container) {
          const cardWidth = window.innerWidth * 0.85; // 85vw per card
          const scrollPosition = index * cardWidth;

          console.log(
            `Moving to selected card: ${format}, position: ${scrollPosition}`
          );

          container.scrollTo({
            left: scrollPosition,
            behavior: "smooth",
          });

          // Verify scroll position
          setTimeout(() => {
            if (Math.abs(container.scrollLeft - scrollPosition) > 10) {
              console.log("Initial scroll failed, using auto behavior");
              container.scrollTo({
                left: scrollPosition,
                behavior: "auto",
              });
            }
          }, 300);
        }
      }
    };

    moveToCard();
    setTimeout(moveToCard, 50); // Backup attempt

    // Restart the auto-slide cycle from the new position
    setTimeout(() => {
      // Progress bar update
      let progress = 0;
      progressIntervalRef.current = setInterval(() => {
        progress += 1;
        setProgressPercentage(progress);

        if (progress >= 100) {
          clearInterval(progressIntervalRef.current!);
        }
      }, 70);

      // Auto slide after 7 seconds - restart the continuous cycle
      autoSlideIntervalRef.current = setTimeout(() => {
        // Move to next format and reset progress simultaneously
        const currentIndex = formats.indexOf(format);
        const nextIndex = (currentIndex + 1) % formats.length;
        const nextFormat = formats[nextIndex];

        // Update format and reset progress in same render
        setSelectedFormat(nextFormat);
        setProgressPercentage(0);

        // Force card movement with multiple attempts
        const moveCard = () => {
          if (scrollContainerRef.current) {
            const container = scrollContainerRef.current.parentElement;
            if (container) {
              const cardWidth = window.innerWidth * 0.85;
              const scrollPosition = nextIndex * cardWidth;

              console.log(
                `Manual scroll to position: ${scrollPosition}, cardWidth: ${cardWidth}, nextIndex: ${nextIndex}`
              );

              container.scrollTo({
                left: scrollPosition,
                behavior: "smooth",
              });

              // Verify scroll position after a delay
              setTimeout(() => {
                if (Math.abs(container.scrollLeft - scrollPosition) > 10) {
                  console.log("Manual scroll failed, retrying...");
                  container.scrollTo({
                    left: scrollPosition,
                    behavior: "auto",
                  });
                }
              }, 500);
            }
          }
        };

        // Try to move immediately and with delay
        moveCard();
        setTimeout(moveCard, 100);

        // Continue the infinite cycle by restarting the function
        const startAutoSlide = () => {
          // Clear existing intervals
          if (autoSlideIntervalRef.current) {
            clearTimeout(autoSlideIntervalRef.current);
          }
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
          }

          // Reset progress
          setProgressPercentage(0);

          // Progress bar update (every 70ms for smooth animation = 7000ms / 100)
          let progress = 0;
          progressIntervalRef.current = setInterval(() => {
            progress += 1;
            setProgressPercentage(progress);

            if (progress >= 100) {
              clearInterval(progressIntervalRef.current!);
            }
          }, 70);

          // Auto slide after 7 seconds
          autoSlideIntervalRef.current = setTimeout(() => {
            // Move to next format and reset progress simultaneously
            const currentIndex = formats.indexOf(selectedFormat);
            const nextIndex = (currentIndex + 1) % formats.length;
            const nextFormat = formats[nextIndex];

            // Update format and reset progress in same render
            setSelectedFormat(nextFormat);
            setProgressPercentage(0);

            // Move to next card
            if (scrollContainerRef.current) {
              const container = scrollContainerRef.current.parentElement;
              const cardWidth = window.innerWidth * 0.85;
              const scrollPosition = nextIndex * cardWidth;

              if (container) {
                container.scrollTo({
                  left: scrollPosition,
                  behavior: "smooth",
                });
              }
            }

            // Restart the cycle
            setTimeout(() => startAutoSlide(), 200);
          }, 7000);
        };

        setTimeout(() => startAutoSlide(), 200);
      }, 7000);
    }, 300);
  };

  const handlePrevious = () => {
    const currentIndex = formats.indexOf(selectedFormat);
    if (currentIndex > 0) {
      handleFormatClick(formats[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    const currentIndex = formats.indexOf(selectedFormat);
    if (currentIndex < formats.length - 1) {
      handleFormatClick(formats[currentIndex + 1]);
    }
  };

  const handlePreviousReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const handleNextReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      (prevIndex + 1) % reviews.length
    );
  };

  return (
    <>
      <div
        className={`min-h-screen bg-white relative ${
          isLoginModalOpen ? "blur-sm" : ""
        }`}
      >
        {/* Toolbar */}
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? "bg-white/80 backdrop-blur-md" : "bg-white"
          }`}
        >
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
                        {formats.map((format) => {
                          const formatInfo = {
                            Finance: {
                              icon: (
                                <FiDollarSign className="w-5 h-5 text-orange-500" />
                              ),
                              description:
                                "Transform complex financial data into insights",
                            },
                            Marketing: {
                              icon: (
                                <FiTarget className="w-5 h-5 text-orange-500" />
                              ),
                              description:
                                "Turn campaign data into marketing intelligence",
                            },
                            "Product Team": {
                              icon: (
                                <FiUsers className="w-5 h-5 text-orange-500" />
                              ),
                              description:
                                "Analyze product metrics and KPIs efficiently",
                            },
                            Consulting: {
                              icon: (
                                <FiBarChart className="w-5 h-5 text-orange-500" />
                              ),
                              description:
                                "Deliver data-driven solutions for clients",
                            },
                            Research: {
                              icon: (
                                <FiLayers className="w-5 h-5 text-orange-500" />
                              ),
                              description:
                                "Convert research data into visual stories",
                            },
                          };

                          return (
                            <a
                              key={format}
                              href={`#${format
                                .toLowerCase()
                                .replace(" ", "-")}`}
                              onClick={(e) => {
                                e.preventDefault();
                                handleFormatClick(format);
                                // Scroll to the format section
                                const section =
                                  document.getElementById("usecase");
                                if (section) {
                                  section.scrollIntoView({
                                    behavior: "smooth",
                                  });
                                }
                              }}
                              className="flex items-center gap-4 px-5 py-4 h-16 text-black hover:bg-gray-50 transition-all duration-200 mx-2 rounded-md"
                            >
                              <div className="flex-shrink-0 w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                                {
                                  formatInfo[format as keyof typeof formatInfo]
                                    ?.icon
                                }
                              </div>
                              <div className="flex-grow">
                                <div
                                  className="font-semibold text-sm text-black mb-1"
                                  style={{ fontFamily: "Arial, sans-serif" }}
                                >
                                  {format}
                                </div>
                                <div
                                  className="text-xs text-gray-600 leading-relaxed whitespace-nowrap"
                                  style={{ fontFamily: "Arial, sans-serif" }}
                                >
                                  {
                                    formatInfo[
                                      format as keyof typeof formatInfo
                                    ]?.description
                                  }
                                </div>
                              </div>
                            </a>
                          );
                        })}
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

              {/* Language Selector & Desktop Get Started Button */}
              <div className="hidden min-[1000px]:flex items-center space-x-4" style={{ marginRight: '10px' }}>
                {/* Language Selector */}
                <div className="relative language-selector">
                  <button
                    onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                    className="p-2 rounded-full hover:bg-orange-100 transition-colors group"
                  >
                    <FiGlobe className="w-5 h-5 text-gray-600 group-hover:text-orange-500 transition-colors" />
                  </button>

                  {/* Language Dropdown */}
                  {isLanguageMenuOpen && (
                    <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      <button
                        onClick={() => {
                          setSelectedLanguage('EN')
                          setIsLanguageMenuOpen(false)
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-orange-50 transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-600">EN</span>
                          <span className="text-sm text-gray-700">English</span>
                        </div>
                        {selectedLanguage === 'EN' && <FiCheck className="w-4 h-4 text-orange-500" />}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedLanguage('KR')
                          setIsLanguageMenuOpen(false)
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-orange-50 transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-600">KR</span>
                          <span className="text-sm text-gray-700">한국어</span>
                        </div>
                        {selectedLanguage === 'KR' && <FiCheck className="w-4 h-4 text-orange-500" />}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedLanguage('JA')
                          setIsLanguageMenuOpen(false)
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-orange-50 transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-600">JA</span>
                          <span className="text-sm text-gray-700">日本語</span>
                        </div>
                        {selectedLanguage === 'JA' && <FiCheck className="w-4 h-4 text-orange-500" />}
                      </button>
                    </div>
                  )}
                </div>

                {/* Get Started Button */}
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
                  href="#usecase"
                  className="block text-black hover:text-gray-600 py-3 text-lg font-medium transition-colors border-b border-gray-200 last:border-b-0"
                  style={{
                    fontFamily: "NunitoSans, sans-serif",
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
                  href="#enterprise"
                  className="block text-black hover:text-gray-600 py-3 text-lg font-medium transition-colors border-b border-gray-200 last:border-b-0"
                  style={{
                    fontFamily: "NunitoSans, sans-serif",
                    fontWeight: 500,
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Enterprise sales
                </a>
                <button
                  onClick={() => {
                    handleGetStartedClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-black px-6 py-3 text-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 group mt-4 rounded-full"
                >
                  <FiArrowUpRight
                    size={20}
                    className="transition-transform duration-200 group-hover:rotate-45"
                  />
                  Get Started
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <main className="relative z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-7xl font-bold text-black mb-6 leading-tight">
              <span style={{ fontFamily: "Spectral-ExtraBold, serif" }}>
                Data Meets{" "}
              </span>
              <span
                style={{
                  fontFamily: "Spectral-ExtraBoldItalic, serif",
                  fontStyle: "italic",
                }}
              >
                Intelligence
              </span>
            </h1>

            <p
              className="text-2xl text-black mb-12 max-w-4xl mx-auto leading-relaxed font-medium"
              style={{ fontFamily: "Arial, sans-serif", fontWeight: 500 }}
            >
              Upload your data, ask questions, get instant analysis and
              visualizations
            </p>

            <div className="flex justify-center gap-4 mb-16">
              <button
                onClick={handleGetStartedClick}
                className="bg-black hover:bg-gray-800 text-white px-6 py-2 text-base font-medium transition-colors duration-200 rounded-full"
                style={{ fontFamily: "Arial, sans-serif", fontWeight: 500 }}
              >
                Start Now
              </button>
              <button
                className="text-gray-600 hover:text-black px-6 py-2 text-base font-medium border border-gray-300 hover:border-gray-400 transition-colors duration-200 rounded-full"
                style={{ fontFamily: "Arial, sans-serif", fontWeight: 500 }}
              >
                View More
              </button>
            </div>
          </div>

          {/* Image Slider - Full width touching vertical lines */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Image viewer spanning full width from left line to right line */}
            <div className="absolute left-0 right-0">
              <div className="bg-white aspect-[20/10] flex items-center justify-center relative overflow-hidden shadow-lg group">
                {/* YouTube Video */}
                <iframe
                  ref={iframeRef}
                  src="https://www.youtube.com/embed/UF8uR6Z6KLc?enablejsapi=1"
                  title="YouTube video player"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />

                {/* Custom Play Button Overlay */}
                {!isVideoPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50 cursor-pointer">
                    <button
                      onClick={handlePlayVideo}
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-[#cc4400] via-[#ff6600] to-[#cc4400] flex items-center justify-center relative overflow-hidden z-50 cursor-pointer transition-all duration-300 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-all before:duration-700 hover:before:left-full"
                    >
                      <FiPlay
                        size={20}
                        className="text-white ml-0.5 relative z-10"
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* Spacer for proper height */}
            <div className="aspect-[20/10] opacity-0"></div>
          </div>
        </main>
      </div>

      {/* Company Logos Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center overflow-x-auto">
            <div className="flex items-center gap-8 md:gap-12 lg:gap-16 min-w-max">
              {/* Logo placeholders */}
              <div className="flex items-center justify-center w-24 h-12 bg-white rounded">
                <Image
                  src="/image/logo1.avif"
                  alt="Logo 1"
                  width={80}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-center w-24 h-12 bg-white rounded">
                <span className="text-xs text-gray-500 font-medium">logo2</span>
              </div>
              <div className="flex items-center justify-center w-24 h-12 bg-white rounded">
                <span className="text-xs text-gray-500 font-medium">logo3</span>
              </div>
              <div className="flex items-center justify-center w-24 h-12 bg-white rounded">
                <span className="text-xs text-gray-500 font-medium">logo4</span>
              </div>
              <div className="flex items-center justify-center w-24 h-12 bg-white rounded">
                <span className="text-xs text-gray-500 font-medium">logo5</span>
              </div>
              <div className="flex items-center justify-center w-24 h-12 bg-white rounded">
                <span className="text-xs text-gray-500 font-medium">logo6</span>
              </div>
              <div className="flex items-center justify-center w-24 h-12 bg-white rounded">
                <span className="text-xs text-gray-500 font-medium">logo7</span>
              </div>
              <div className="flex items-center justify-center w-24 h-12 bg-white rounded">
                <span className="text-xs text-gray-500 font-medium">logo8</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* File Format Section */}
      <section id="usecase" className="bg-white py-8 md:py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Data Analytics Hero Section */}
          <div className="text-center mb-0">
            {/* Tool Icons Row */}
            <div className="flex items-center justify-center gap-8" style={{ marginBottom: "20px" }}>
              <div className="flex items-center justify-center w-16 h-16 bg-white rounded-lg shadow-md">
                <Image
                  src="/image/stripe.png"
                  alt="Stripe"
                  width={50}
                  height={30}
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-center w-16 h-16 bg-white rounded-lg shadow-md">
                <Image
                  src="/image/word.png"
                  alt="Word"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-center w-16 h-16 bg-white rounded-lg shadow-md">
                <Image
                  src="/image/excel.png"
                  alt="Excel"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-center w-16 h-16 bg-white rounded-lg shadow-md">
                <Image
                  src="/image/googleads.svg"
                  alt="Google Ads"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-center w-16 h-16 bg-white rounded-lg shadow-md">
                <Image
                  src="/image/meta.svg"
                  alt="Meta"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* File Format Section */}
      <section
        id="usecase-details"
        className="bg-white pt-12 md:pt-16 pb-8 md:pb-12 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Title and Description */}
          <div className="max-w-4xl mx-auto text-center" style={{ marginTop: "-70px" }}>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight"
              style={{ fontFamily: "Spectral, serif", fontWeight: 650 }}
            >
              Meet the <span className="italic">data intelligence</span> center
              for fast-moving teams
            </h2>

            <p className="text-xl md:text-2xl text-black leading-relaxed max-w-2xl mx-auto">
              From upload to insights, give your team everything they need to
              analyze quickly, visualize clearly, and keep decisions
              data-driven.
            </p>
          </div>
        </div>

        {/* Tab Control - Centered */}
        <div className="flex justify-center mb-16 overflow-x-auto px-4" style={{ marginTop: "90px" }}>
          <div className="flex gap-2 md:gap-4 min-w-max">
            {formats.map((format) => (
              <button
                key={format}
                onClick={() => handleFormatClick(format)}
                className={`relative overflow-hidden px-3 md:px-6 py-2 md:py-3 font-medium text-sm md:text-base transition-all duration-200 whitespace-nowrap ${
                  selectedFormat === format
                    ? "bg-gray-400 text-white"
                    : "bg-gray-400 text-white hover:bg-gray-500"
                }`}
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                {/* Animated Progress Background */}
                {selectedFormat === format && progressPercentage > 0 && (
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[#cc4400] via-[#ff6600] to-[#cc4400] transition-all duration-75 ease-linear"
                    style={{
                      width: `${progressPercentage}%`,
                      clipPath: `inset(0 ${100 - progressPercentage}% 0 0)`,
                    }}
                  />
                )}

                {/* Button Text */}
                <span className="relative z-10 text-white">{format}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Screen Display */}
        <div className="w-full overflow-hidden relative z-20">
          <div
            ref={scrollContainerRef}
            className="flex pb-4 transition-transform duration-700 ease-in-out"
            style={{
              width: "calc(85vw * 5)",
              scrollBehavior: "smooth",
              paddingLeft: "0",
              scrollSnapType: "x mandatory",
            }}
          >
            {formats.map((format, index) => (
              <div
                key={`${format}-${index}`}
                className="flex-shrink-0 w-[85vw] flex justify-center items-center scroll-snap-align-start"
              >
                {/* Screen View */}
                <div className="w-[80vw] h-[50vh] md:h-[60vh] lg:h-[65vh] bg-black relative z-30 shadow-2xl border border-gray-300 flex items-center justify-center rounded-lg group">
                  {format === "Product Team" ? (
                    <>
                      <Image
                        src="/image/product.png"
                        alt="Product Team View"
                        fill
                        className="object-cover"
                      />
                      {/* Transparent text overlay */}
                      <div className="absolute top-4 md:top-8 left-4 md:left-8 bg-gradient-to-br from-[#cc4400]/20 via-[#ff6600]/30 to-[#cc4400]/20 backdrop-blur-sm p-4 md:p-8 max-w-xs md:max-w-md">
                        <h3
                          className="text-black text-xl md:text-3xl font-bold mb-2 md:mb-4 flex items-center gap-2"
                          style={{ fontFamily: "SpectralLight, serif" }}
                        >
                          Product Team
                          <span className="transition-transform duration-200 hover:rotate-45 cursor-pointer">
                            <FiArrowUpRight
                              size={20}
                              className="text-black md:hidden"
                            />
                            <FiArrowUpRight
                              size={24}
                              className="text-black hidden md:block"
                            />
                          </span>
                        </h3>
                        <p
                          className="text-black text-sm md:text-lg leading-relaxed"
                          style={{ fontFamily: "Arial, sans-serif" }}
                        >
                          No More, Mind Buggling Excels to Analyze the Product
                        </p>
                      </div>
                    </>
                  ) : format === "Finance" ? (
                    <>
                      <Image
                        src="/image/finance.png"
                        alt="Finance View"
                        fill
                        className="object-cover"
                      />
                      {/* Transparent text overlay for Finance */}
                      <div className="absolute top-4 md:top-8 left-4 md:left-8 bg-gradient-to-br from-[#cc4400]/20 via-[#ff6600]/30 to-[#cc4400]/20 backdrop-blur-sm p-4 md:p-8 max-w-xs md:max-w-md">
                        <h3
                          className="text-black text-xl md:text-3xl font-bold mb-2 md:mb-4 flex items-center gap-2"
                          style={{ fontFamily: "SpectralLight, serif" }}
                        >
                          Finance
                          <span className="transition-transform duration-200 hover:rotate-45 cursor-pointer">
                            <FiArrowUpRight
                              size={20}
                              className="text-black md:hidden"
                            />
                            <FiArrowUpRight
                              size={24}
                              className="text-black hidden md:block"
                            />
                          </span>
                        </h3>
                        <p
                          className="text-black text-sm md:text-lg leading-relaxed"
                          style={{ fontFamily: "Arial, sans-serif" }}
                        >
                          Transform Complex Financial Data into Clear,
                          Actionable Insights
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="text-white text-lg font-medium"
                        style={{ fontFamily: "NunitoSans, sans-serif" }}
                      >
                        {format} View
                      </div>
                      {/* Transparent text overlay for other formats */}
                      <div className="absolute top-4 md:top-8 left-4 md:left-8 bg-gradient-to-br from-[#cc4400]/20 via-[#ff6600]/30 to-[#cc4400]/20 backdrop-blur-sm p-4 md:p-8 max-w-xs md:max-w-md">
                        <h3
                          className="text-black text-xl md:text-3xl font-bold mb-2 md:mb-4 flex items-center gap-2"
                          style={{ fontFamily: "SpectralLight, serif" }}
                        >
                          {format}
                          <span className="transition-transform duration-200 hover:rotate-45 cursor-pointer">
                            <FiArrowUpRight
                              size={20}
                              className="text-black md:hidden"
                            />
                            <FiArrowUpRight
                              size={24}
                              className="text-black hidden md:block"
                            />
                          </span>
                        </h3>
                        <p
                          className="text-black text-sm md:text-lg leading-relaxed"
                          style={{ fontFamily: "Arial, sans-serif" }}
                        >
                          {format === "Finance" &&
                            "Transform Complex Financial Data into Clear, Actionable Insights"}
                          {format === "Marketing" &&
                            "Turn Campaign Data into Strategic Marketing Intelligence"}
                          {format === "Consulting" &&
                            "Deliver Data-Driven Solutions for Strategic Decision Making"}
                          {format === "Research" &&
                            "Convert Research Data into Compelling Visual Stories"}
                        </p>
                      </div>
                    </>
                  )}

                  {/* Left Navigation Button - hide for Finance */}
                  {format !== "Finance" && (
                    <div className="absolute left-0 top-0 h-full w-32 flex items-center justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={handlePrevious}
                        className="w-12 h-12 bg-white bg-opacity-50 hover:bg-opacity-70 border border-gray-300 flex items-center justify-center transition-all duration-200 ml-4"
                      >
                        <FiArrowLeft size={20} className="text-gray-700" />
                      </button>
                    </div>
                  )}

                  {/* Right Navigation Button - hide for Research */}
                  {format !== "Research" && (
                    <div className="absolute right-0 top-0 h-full w-32 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={handleNext}
                        className="w-12 h-12 bg-white bg-opacity-50 hover:bg-opacity-70 border border-gray-300 flex items-center justify-center transition-all duration-200 mr-4"
                      >
                        <FiArrowRight size={20} className="text-gray-700" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-black"
                style={{ fontFamily: 'Spectral, serif', fontWeight: 650 }}
              >
                Work-Life <span className="italic">Changing</span>
              </h2>
            </div>
            <p
              className="text-xl md:text-2xl text-black leading-relaxed max-w-3xl mx-auto"
              style={{ fontFamily: 'Arial, sans-serif', fontWeight: 500 }}
            >
              See how professionals are transforming their daily workflows with our intelligent data platform
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="bg-gray-300 rounded-lg mb-6 h-40"></div>
              <h3 className="text-xl font-semibold text-black mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                Deep & Actionable Data Insights
              </h3>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Arial, sans-serif' }}>
                From raw spreadsheets to clear strategies, every analysis comes with practical next steps.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="bg-gray-300 rounded-lg mb-6 h-40"></div>
              <h3 className="text-xl font-semibold text-black mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                Full Integration with Your Tools
              </h3>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Arial, sans-serif' }}>
                Seamlessly connect Stripe, Google Drive, Meta Ads and more to keep your workflow intact.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="bg-gray-300 rounded-lg mb-6 h-40"></div>
              <h3 className="text-xl font-semibold text-black mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                Beautiful, Interactive Charts
              </h3>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Arial, sans-serif' }}>
                Dynamic visuals you can zoom, filter, and customise for truly insightful storytelling.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Banner Section */}
      <section className="bg-white py-4 md:py-6">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-orange-200 rounded-lg px-8 md:px-12 py-16 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <h2
                  className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight"
                  style={{ fontFamily: 'Spectral, serif', fontWeight: 650 }}
                >
                  Connected to All Your Tools
                </h2>
                <p
                  className="text-lg md:text-xl text-gray-700 leading-relaxed"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Unify data across teams and platforms, so everyone—from analysts to executives works with the same insights in real time.
                </p>
              </div>

              {/* Right Image Placeholder */}
              <div className="flex justify-center">
                <div className="w-full max-w-lg h-80 bg-transparent border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-lg">Image Placeholder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <h2
            className="text-4xl md:text-5xl font-bold text-black mb-12"
            style={{ fontFamily: 'Spectral, serif', fontWeight: 650 }}
          >
            FAQs
          </h2>

          {/* FAQ Items */}
          <div className="border border-gray-200 rounded-lg">
            <FAQItem
              question="Is Afterwon its own web application separate from Excel?"
              answer="Yes, Afterwon is a standalone web application that works independently from Excel while providing seamless integration capabilities."
            />
            <FAQItem
              question="Can Afterwon pull in data from outside my excel workbook?"
              answer="Absolutely! Afterwon can connect to various external data sources including databases, APIs, cloud services, and other file formats beyond Excel."
            />
            <FAQItem
              question="Can Afterwon give me actionable insights, rather than just AI-generated summaries?"
              answer="Yes, Afterwon goes beyond simple summaries to provide specific, actionable recommendations based on your data analysis and business context."
            />
            <FAQItem
              question="Is Afterwon limited to a specific set of workflows?"
              answer="No, Afterwon is designed to be flexible and can adapt to various workflows across different industries and use cases."
            />
            <FAQItem
              question="How does Afterwon manage the data in my Excel files? Are my Excel files and queries used for model training?"
              answer="Your data privacy is our priority. Your Excel files and queries are not used for model training, and all data is processed securely with enterprise-grade encryption."
            />
            <FAQItem
              question="How can I trust Afterwon's outputs to be accurate?"
              answer="Afterwon uses advanced AI models with built-in validation, provides transparency in its analysis process, and allows you to verify results against your original data."
            />
            <FAQItem
              question="Am I allowed to download Afterwon at my firm?"
              answer="Afterwon is a web-based application, so there's no software to download. Access is provided through your web browser with enterprise security compliance."
              isLast={true}
            />
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-white py-16 md:py-20 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex justify-between items-center mb-12">
            <h2
              className="text-4xl md:text-5xl font-bold text-black"
              style={{ fontFamily: 'Spectral, serif', fontWeight: 650 }}
            >
              Latest <span className="italic">Data</span> Insights
            </h2>
            <Link
              href="/blog"
              className="text-orange-500 hover:text-orange-600 font-medium transition-colors flex items-center gap-2"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              View All
              <FiArrowUpRight size={16} className="transition-transform duration-200 hover:rotate-45" />
            </Link>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestBlogs.map((blog, index) => (
              <Link key={blog.id} href={`/blog/${blog.id}`}>
                <div className="group cursor-pointer">
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <div
                      className={`w-full ${
                        index === 0 ? 'h-[508px]' : index === 1 ? 'h-[276px]' : 'h-[474px]'
                      } ${blog.gradient} group-hover:scale-105 transition-transform duration-300 relative flex items-center justify-center`}
                    >
                      <div className="relative z-10 bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                        {getBlogIcon(blog.title)}
                      </div>
                      {/* Decorative elements */}
                      <div className="absolute top-4 left-4 w-12 h-12 bg-white/10 rounded-full blur-lg" />
                      <div className="absolute bottom-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3
                      className="text-xl font-semibold text-black group-hover:text-orange-500 transition-colors line-clamp-2"
                      style={{ fontFamily: 'Spectral, serif', fontWeight: 650 }}
                    >
                      {blog.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span style={{ fontFamily: 'Arial, sans-serif' }}>{blog.category}</span>
                      <span>•</span>
                      <span style={{ fontFamily: 'Arial, sans-serif' }}>{blog.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
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
                  <a
                    href="/#usecase"
                    className="text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Finance
                  </a>
                </li>
                <li>
                  <a
                    href="/#usecase"
                    className="text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Marketing
                  </a>
                </li>
                <li>
                  <a
                    href="/#usecase"
                    className="text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Product Team
                  </a>
                </li>
                <li>
                  <a
                    href="/#usecase"
                    className="text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Consulting
                  </a>
                </li>
                <li>
                  <a
                    href="/#usecase"
                    className="text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Research
                  </a>
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
                  <a
                    href="/blog"
                    className="text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/help"
                    className="text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="/security"
                    className="text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Security
                  </a>
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
                  <a
                    href="/careers"
                    className="text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Open Positions
                  </a>
                </li>
                <li>
                  <a
                    href="/careers"
                    className="text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Company Culture
                  </a>
                </li>
                <li>
                  <a
                    href="/careers"
                    className="text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Benefits
                  </a>
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
                  <a
                    href="/pricing"
                    className="text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Plans & Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="/pricing"
                    className="text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Free Trial
                  </a>
                </li>
                <li>
                  <a
                    href="/pricing"
                    className="text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Enterprise
                  </a>
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
                    <a
                      href="/#enterprise"
                      className="text-white/80 hover:text-white transition-colors"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      Enterprise Sales
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#enterprise"
                      className="text-white/80 hover:text-white transition-colors"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      Security
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#enterprise"
                      className="text-white/80 hover:text-white transition-colors"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      Integrations
                    </a>
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
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <FaTwitter size={24} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="mailto:contact@afterwon.com"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <FiMail size={24} />
                </a>
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
                <a
                  href="/privacy"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onStartLoading={handleStartLoading}
      />
      <LoadingScreen isVisible={isLoadingScreenVisible} />
    </>
  );
}
