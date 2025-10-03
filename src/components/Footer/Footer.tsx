import Image from 'next/image'
import Link from 'next/link'
import { FaTwitter, FaInstagram } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'

export default function Footer() {
  return (
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
                  href="/#usecase"
                  className="text-white/80 hover:text-white transition-colors"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Finance
                </Link>
              </li>
              <li>
                <Link
                  href="/#usecase"
                  className="text-white/80 hover:text-white transition-colors"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="/#usecase"
                  className="text-white/80 hover:text-white transition-colors"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Product Team
                </Link>
              </li>
              <li>
                <Link
                  href="/#usecase"
                  className="text-white/80 hover:text-white transition-colors"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Consulting
                </Link>
              </li>
              <li>
                <Link
                  href="/#usecase"
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
              <li>
                <Link
                  href="/security"
                  className="text-white/80 hover:text-white transition-colors"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Security
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
  )
}
