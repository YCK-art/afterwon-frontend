'use client'

import { useEffect, useState } from 'react'

interface LoadingScreenProps {
  isVisible: boolean
}

export default function LoadingScreen({ isVisible }: LoadingScreenProps) {
  const [dots, setDots] = useState('')

  // Animated dots effect
  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return ''
        return prev + '.'
      })
    }, 500)

    return () => clearInterval(interval)
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-orange-100 z-[100] flex flex-col items-center justify-center">
      {/* Loading Spinner - Simple dotted circle */}
      <div className="relative mb-8">
        <div className="w-16 h-16 animate-spin">
          {/* Create 8 dots around the circle */}
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="absolute w-3 h-3 bg-black rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${index * 45}deg) translateY(-24px)`,
                opacity: 1 - (index * 0.125), // Fade effect
              }}
            />
          ))}
        </div>
      </div>

      {/* Loading Text with Animation */}
      <div className="text-center">
        <h2 className="text-2xl font-light text-black mb-2" style={{fontFamily: 'SpectralLight, serif'}}>
          Logging in{dots}
        </h2>
        <p className="text-black text-sm font-medium" style={{fontFamily: 'NunitoSans, sans-serif', fontWeight: 500}}>
          Please wait while we authenticate your account
        </p>
      </div>

      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-200/30 via-transparent to-orange-300/20 pointer-events-none"></div>

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #fb923c 1px, transparent 1px),
            linear-gradient(to bottom, #fb923c 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      ></div>
    </div>
  )
}