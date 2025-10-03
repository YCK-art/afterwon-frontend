'use client'
import Link from 'next/link'

import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
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
  FiArrowLeft
} from 'react-icons/fi'

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.id

  // Job data - in a real app this would come from an API
  const jobData = {
    '1': {
      title: 'Technical Co-founder',
      type: 'Full time',
      location: 'Seoul, KR',
      workType: 'On-site',
      equity: '1%',
      description: 'Join Afterwon as a Technical Co-founder and help shape the future of data analysis and AI-powered decision making.'
    },
    '2': {
      title: 'Creator Collaboration',
      type: 'Collaboration',
      location: 'All',
      workType: 'Remote',
      equity: 'Share Revenue',
      description: 'Partner with Afterwon to showcase the future of AI data analysis to your audience across social media platforms.'
    }
  }

  const job = jobData[jobId as keyof typeof jobData]

  if (!job) {
    return <div>Job not found</div>
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Toolbar - Same as Landing Page */}
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
                          <div className="font-semibold text-sm text-black mb-1" style={{fontFamily: 'Arial, sans-serif'}}>
                            Finance
                          </div>
                          <div className="text-xs text-gray-600 leading-relaxed whitespace-nowrap" style={{fontFamily: 'Arial, sans-serif'}}>
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
                          <div className="font-semibold text-sm text-black mb-1" style={{fontFamily: 'Arial, sans-serif'}}>
                            Marketing
                          </div>
                          <div className="text-xs text-gray-600 leading-relaxed whitespace-nowrap" style={{fontFamily: 'Arial, sans-serif'}}>
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
                          <div className="font-semibold text-sm text-black mb-1" style={{fontFamily: 'Arial, sans-serif'}}>
                            Product Team
                          </div>
                          <div className="text-xs text-gray-600 leading-relaxed whitespace-nowrap" style={{fontFamily: 'Arial, sans-serif'}}>
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
                          <div className="font-semibold text-sm text-black mb-1" style={{fontFamily: 'Arial, sans-serif'}}>
                            Consulting
                          </div>
                          <div className="text-xs text-gray-600 leading-relaxed whitespace-nowrap" style={{fontFamily: 'Arial, sans-serif'}}>
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
                          <div className="font-semibold text-sm text-black mb-1" style={{fontFamily: 'Arial, sans-serif'}}>
                            Research
                          </div>
                          <div className="text-xs text-gray-600 leading-relaxed whitespace-nowrap" style={{fontFamily: 'Arial, sans-serif'}}>
                            Convert research data into visual stories
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Resources dropdown */}
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
                          <div className="font-semibold text-sm text-black mb-1" style={{fontFamily: 'Arial, sans-serif'}}>
                            Blog
                          </div>
                          <div className="text-xs text-gray-600 leading-relaxed whitespace-nowrap" style={{fontFamily: 'Arial, sans-serif'}}>
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
                          <div className="font-semibold text-sm text-black mb-1" style={{fontFamily: 'Arial, sans-serif'}}>
                            Help Center
                          </div>
                          <div className="text-xs text-gray-600 leading-relaxed whitespace-nowrap" style={{fontFamily: 'Arial, sans-serif'}}>
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
                          <div className="font-semibold text-sm text-black mb-1" style={{fontFamily: 'Arial, sans-serif'}}>
                            Security
                          </div>
                          <div className="text-xs text-gray-600 leading-relaxed whitespace-nowrap" style={{fontFamily: 'Arial, sans-serif'}}>
                            Learn about our security measures and compliance
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                <Link href="/careers" className="text-black hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors" style={{fontFamily: 'Arial, sans-serif', fontWeight: 550}}>
                  Careers
                </Link>
                <Link href="/#enterprise" className="text-black hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors" style={{fontFamily: 'Arial, sans-serif', fontWeight: 550}}>
                  Enterprise sales
                </Link>
              </div>
            </div>

            {/* Desktop Get Started Button */}
            <div className="hidden min-[1000px]:flex items-center space-x-4 mr-2 sm:mr-4 lg:mr-6">
              <button className="bg-gray-200 hover:bg-gray-300 text-black px-6 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-2 group rounded-full" style={{fontWeight: 550}}>
                <FiArrowUpRight size={16} className="transition-transform duration-200 group-hover:rotate-45" />
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="text-center mb-12">
          {/* Back to careers */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => router.push('/careers')}
              className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors text-sm"
              style={{fontFamily: 'Arial, sans-serif'}}
            >
              <FiArrowLeft size={16} />
              Back to careers
            </button>
          </div>

          {/* Job Title */}
          <h1
            className="text-4xl md:text-5xl font-medium text-black mb-6"
            style={{fontFamily: 'Spectral, serif', fontWeight: 500}}
          >
            {job.title}
          </h1>

          {/* Job Details */}
          <div className="flex items-center justify-center gap-4 text-gray-600 text-lg mb-8" style={{fontFamily: 'Arial, sans-serif'}}>
            <span>{job.location}</span>
            <span>•</span>
            <span>{job.workType}</span>
            <span>•</span>
            <span>{jobId === '1' ? 'Offers Equity' : 'Share Revenue'}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg transition-all duration-300 text-lg font-medium" style={{fontFamily: 'Arial, sans-serif'}}>
              Apply now
            </button>
            <button className="border border-gray-300 hover:border-gray-400 text-black px-8 py-3 rounded-lg transition-all duration-300 text-lg" style={{fontFamily: 'Arial, sans-serif'}}>
              Refer someone
            </button>
          </div>
        </div>

        {/* About Afterwon Section */}
        <div className="mb-12">
          <h2
            className="text-2xl font-medium text-black mb-6"
            style={{fontFamily: 'Spectral, serif', fontWeight: 600}}
          >
            About Afterwon
          </h2>
          <div className="prose max-w-none" style={{fontFamily: 'Arial, sans-serif'}}>
            <p className="text-gray-700 leading-relaxed mb-4">
              Afterwon is building the world&apos;s most advanced AI data analyst, surpassing the capabilities of ChatGPT, Claude, and any existing AI solution in the market. Founded in 2025, we&apos;re in beta development with a clear vision: to create AI that doesn&apos;t just answer questions about data, but truly understands, analyzes, and provides insights that human analysts would.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our AI data analyst will be specifically trained and optimized for data analysis tasks, making it more accurate, faster, and more insightful than general-purpose AI models. We&apos;re not building another chatbot—we&apos;re creating the ultimate data analysis companion.
            </p>
            <p className="text-gray-700 leading-relaxed">
              {jobId === '1'
                ? "We&apos;re seeking a Technical Co-founder who shares our vision of revolutionizing data analysis through superior AI technology. Join us in building something that will set the new standard for AI-powered data analysis."
                : "We&apos;re looking for influential content creators who can help us share this revolutionary technology with the world. Partner with us to showcase the future of AI data analysis to your audience."
              }
            </p>
          </div>
        </div>

        {/* What We Look For Section */}
        <div>
          <h2
            className="text-2xl font-medium text-black mb-6"
            style={{fontFamily: 'Spectral, serif', fontWeight: 600}}
          >
            {jobId === '1' ? 'What We Look For' : 'What We Offer'}
          </h2>
          {jobId === '1' ? (
            <div className="prose max-w-none" style={{fontFamily: 'Arial, sans-serif'}}>
              <p className="text-gray-700 leading-relaxed mb-6">
                As a Technical Co-founder, you&apos;ll be instrumental in building and scaling our platform. We&apos;re looking for someone who combines technical excellence with entrepreneurial vision.
              </p>

              <h3 className="text-xl font-medium text-black mb-4">Technical Excellence</h3>
              <ul className="space-y-2 mb-6 text-gray-700">
                <li>• <strong>Full-stack development expertise</strong> - React/Next.js, Node.js, TypeScript, and modern web frameworks</li>
                <li>• <strong>AI/ML and Prompt Engineering</strong> - Experience with LLMs, prompt optimization, AI model fine-tuning, and API integration (OpenAI, Anthropic, etc.)</li>
                <li>• <strong>Data processing and analysis</strong> - Python, pandas, data visualization libraries, and ETL pipeline development</li>
                <li>• <strong>Cloud infrastructure</strong> - AWS/GCP experience with containerization (Docker/Kubernetes) and CI/CD pipelines</li>
              </ul>

              <h3 className="text-xl font-medium text-black mb-4">Business Acumen</h3>
              <ul className="space-y-2 mb-6 text-gray-700">
                <li>• <strong>Product development experience</strong> - Previous involvement in building and launching software products from concept to market</li>
                <li>• <strong>Startup experience</strong> - Understanding of early-stage company dynamics, resource constraints, and rapid iteration cycles</li>
                <li>• <strong>Customer-centric mindset</strong> - Direct experience gathering user feedback and translating insights into product improvements</li>
              </ul>

              <h3 className="text-xl font-medium text-black mb-4">Leadership & Collaboration</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Technical leadership</strong> - Experience leading development teams and making architectural decisions</li>
                <li>• <strong>Cross-functional collaboration</strong> - Ability to work effectively with business, design, and product stakeholders</li>
                <li>• <strong>Execution excellence</strong> - Demonstrated track record of shipping products and meeting technical milestones</li>
              </ul>
            </div>
          ) : (
            <div className="prose max-w-none" style={{fontFamily: 'Arial, sans-serif'}}>
              <p className="text-gray-700 leading-relaxed mb-6">
                We&apos;re seeking influential content creators across Instagram, TikTok, LinkedIn, and other social platforms to collaborate with us in showcasing Afterwon&apos;s revolutionary AI data analysis capabilities.
              </p>

              <h3 className="text-xl font-medium text-black mb-4">Collaboration Opportunities</h3>
              <ul className="space-y-2 mb-6 text-gray-700">
                <li>• <strong>Content Creation</strong> - Create engaging content showcasing Afterwon&apos;s AI capabilities and data analysis features</li>
                <li>• <strong>Platform Coverage</strong> - Instagram posts/stories, TikTok videos, LinkedIn articles, YouTube content, and other social platforms</li>
                <li>• <strong>Product Demonstrations</strong> - Showcase real-world use cases and demonstrate the power of our AI data analyst</li>
                <li>• <strong>Thought Leadership</strong> - Share insights about the future of AI and data analysis with your audience</li>
              </ul>

              <h3 className="text-xl font-medium text-black mb-4">What We&apos;re Looking For</h3>
              <ul className="space-y-2 mb-6 text-gray-700">
                <li>• <strong>Engaged Audience</strong> - Active followers interested in technology, AI, data, or business content</li>
                <li>• <strong>Content Quality</strong> - Proven track record of creating high-quality, engaging content</li>
                <li>• <strong>Authenticity</strong> - Genuine interest in AI technology and data analysis tools</li>
                <li>• <strong>Consistency</strong> - Regular posting schedule and audience interaction</li>
              </ul>

              <h3 className="text-xl font-medium text-black mb-4">Benefits</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Revenue Sharing</strong> - Competitive compensation based on performance and reach</li>
                <li>• <strong>Early Access</strong> - Exclusive access to beta features and product updates</li>
                <li>• <strong>Creative Freedom</strong> - Flexibility in content creation and platform choice</li>
                <li>• <strong>Partnership Growth</strong> - Opportunity to grow with us as we scale our platform</li>
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}