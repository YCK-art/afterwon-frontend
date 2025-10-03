'use client'

import { useState, useEffect } from 'react'

interface FollowUpQuestionsProps {
  questions: string[]
  onQuestionClick: (question: string) => void
  isLoading: boolean
}

export default function FollowUpQuestions({ questions, onQuestionClick, isLoading }: FollowUpQuestionsProps) {
  const [isGenerating, setIsGenerating] = useState(true)

  useEffect(() => {
    // 관련 질문이 생성되는 시뮬레이션 (실제로는 이미 생성된 상태)
    if (questions && questions.length > 0) {
      const timer = setTimeout(() => {
        setIsGenerating(false)
      }, 1500) // 1.5초 후 생성 완료
      return () => clearTimeout(timer)
    }
  }, [questions])

  if (!questions || questions.length === 0) return null

  return (
    <div className="mt-4 space-y-2">
      <div className="text-sm text-gray-700 font-semibold mb-3 flex items-center gap-2">
        관련 질문
        {isGenerating && (
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-orange-400 rounded-full animate-bounce"></div>
            <div className="w-1 h-1 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1 h-1 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        )}
      </div>
      {questions.map((question, index) => (
        <button
          key={index}
          onClick={() => !isLoading && onQuestionClick(question)}
          disabled={isLoading}
          className="w-full text-left p-3 bg-orange-50 border border-orange-200 rounded-lg hover:border-orange-300 hover:bg-orange-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
        >
          {/* Shine effect */}
          <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-orange-200/20 to-transparent transform skew-x-12 group-hover:left-[100%] transition-all duration-700 ease-out"></div>

          <div className="flex items-center justify-between relative z-10">
            <span className="text-sm text-black group-hover:text-gray-900 pr-2">
              {question}
            </span>
            <svg
              className="w-4 h-4 text-orange-500 group-hover:text-orange-600 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </button>
      ))}
    </div>
  )
}