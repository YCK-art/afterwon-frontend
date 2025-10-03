'use client'

import { useState, KeyboardEvent, useRef, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  onFileUpload?: (file: File) => void
  isLoading: boolean
  disabled?: boolean
  hasFile?: boolean
  placeholder?: string
}

export default function ChatInput({ onSendMessage, onFileUpload, isLoading, disabled, hasFile, placeholder }: ChatInputProps) {
  const [input, setInput] = useState('')
  const [isDragOver, setIsDragOver] = useState(false)
  const [selectedMode, setSelectedMode] = useState('Default')
  const [showModelDropdown, setShowModelDropdown] = useState(false)
  const [selectedDomain, setSelectedDomain] = useState('General')
  const [showDomainDropdown, setShowDomainDropdown] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const modelDropdownRef = useRef<HTMLDivElement>(null)
  const domainDropdownRef = useRef<HTMLDivElement>(null)

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modelDropdownRef.current && !modelDropdownRef.current.contains(event.target as Node)) {
        setShowModelDropdown(false)
      }
      if (domainDropdownRef.current && !domainDropdownRef.current.contains(event.target as Node)) {
        setShowDomainDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = () => {
    if (!input.trim() || isLoading || disabled) return
    onSendMessage(input) // trim() 제거하여 줄바꿈 보존
    setInput('')

    // 전송 후 텍스트 영역 높이를 기본값으로 리셋
    if (textareaRef.current) {
      textareaRef.current.style.height = '60px'
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  // File upload functionality
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0 || !onFileUpload) return
    const file = acceptedFiles[0]
    await onFileUpload(file)
  }, [onFileUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024, // 50MB
    disabled: isLoading,
    noClick: true,
    noKeyboard: true
  })

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && onFileUpload) {
      onFileUpload(file)
    }
    // 파일 업로드 후 input 초기화
    if (e.target) {
      e.target.value = ''
    }
  }

  // Get icon for selected mode
  const getModelIcon = (mode: string) => {
    switch (mode) {
      case 'Default':
        return '/image/afterwon.png'
      case 'GPT-5':
        return '/image/gpt.svg'
      case 'Claude 4.5 Sonnet':
        return '/image/claude.png'
      default:
        return '/image/afterwon.png'
    }
  }

  // Get SVG icon for selected domain
  const getDomainIcon = (domain: string) => {
    const iconMap: Record<string, JSX.Element> = {
      'General': (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      'Finance': (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      'Marketing': (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
      'Product': (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      'Research': (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
    return iconMap[domain] || iconMap['General']
  }

  return (
    <div className="space-y-3">
      {/* Main Input Area - Claude Style */}
      <div
        {...getRootProps()}
        className={`relative transition-all duration-200 ${
          isDragActive ? 'ring-2 ring-blue-400 ring-offset-2' : ''
        }`}
      >
        <input {...getInputProps()} />
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          accept=".csv,.xls,.xlsx"
          className="hidden"
        />

        <div className="relative bg-white border border-gray-300 rounded-2xl shadow-md hover:shadow-lg focus-within:border-orange-400 focus-within:ring-1 focus-within:ring-orange-400 transition-all">
          {/* Badge Options Row */}
          <div className="flex items-center gap-1.5 px-3 pt-2 pb-1.5">
            {/* AI Model Badge with Dropdown */}
            <div ref={modelDropdownRef} className="relative">
              <button
                onClick={() => setShowModelDropdown(!showModelDropdown)}
                className="flex items-center gap-1 px-2 py-0.5 bg-orange-100 hover:bg-orange-200 text-orange-800 rounded-full text-xs font-medium transition-colors"
              >
                <Image
                  src={getModelIcon(selectedMode)}
                  alt={selectedMode}
                  width={12}
                  height={12}
                  className="rounded-sm"
                />
                <span>{selectedMode}</span>
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown */}
              {showModelDropdown && (
                <div className="absolute bottom-full left-0 mb-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[180px]">
                  {/* Dropdown Title */}
                  <div className="px-3 py-2 border-b border-gray-200">
                    <span className="text-xs font-bold text-gray-700" style={{ fontFamily: 'Spectral-ExtraBold, serif' }}>AI Model</span>
                  </div>

                  {/* Model Options */}
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setSelectedMode('Default')
                        setShowModelDropdown(false)
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center gap-2 ${
                        selectedMode === 'Default'
                          ? 'bg-orange-50 text-orange-800 font-semibold'
                          : 'text-black hover:bg-orange-50'
                      }`}
                    >
                      <Image
                        src="/image/afterwon.png"
                        alt="Default"
                        width={16}
                        height={16}
                        className="rounded-sm"
                      />
                      <span>Default</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedMode('GPT-5')
                        setShowModelDropdown(false)
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center gap-2 ${
                        selectedMode === 'GPT-5'
                          ? 'bg-orange-50 text-orange-800 font-semibold'
                          : 'text-black hover:bg-orange-50'
                      }`}
                    >
                      <Image
                        src="/image/gpt.svg"
                        alt="GPT-5"
                        width={16}
                        height={16}
                        className="rounded-sm"
                      />
                      <span>GPT-5</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedMode('Claude 4.5 Sonnet')
                        setShowModelDropdown(false)
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center gap-2 ${
                        selectedMode === 'Claude 4.5 Sonnet'
                          ? 'bg-orange-50 text-orange-800 font-semibold'
                          : 'text-black hover:bg-orange-50'
                      }`}
                    >
                      <Image
                        src="/image/claude.png"
                        alt="Claude 4.5 Sonnet"
                        width={16}
                        height={16}
                        className="rounded-sm"
                      />
                      <span>Claude 4.5 Sonnet</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mode Badge with Dropdown */}
            <div ref={domainDropdownRef} className="relative">
              <button
                onClick={() => setShowDomainDropdown(!showDomainDropdown)}
                className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs font-medium transition-colors"
              >
                {getDomainIcon(selectedDomain)}
                <span>{selectedDomain}</span>
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown */}
              {showDomainDropdown && (
                <div className="absolute bottom-full left-0 mb-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[150px]">
                  {/* Dropdown Title */}
                  <div className="px-3 py-2 border-b border-gray-200">
                    <span className="text-xs font-bold text-gray-700" style={{ fontFamily: 'Spectral-ExtraBold, serif' }}>Mode</span>
                  </div>

                  {/* Domain Options */}
                  <div className="py-1">
                    {['General', 'Finance', 'Marketing', 'Product', 'Research'].map((domain) => (
                      <button
                        key={domain}
                        onClick={() => {
                          setSelectedDomain(domain)
                          setShowDomainDropdown(false)
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center gap-2 ${
                          selectedDomain === domain
                            ? 'bg-orange-50 text-orange-800 font-semibold'
                            : 'text-black hover:bg-orange-50'
                        }`}
                      >
                        <span className="w-4 h-4 flex items-center justify-center">
                          {getDomainIcon(domain)}
                        </span>
                        <span>{domain}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Extended Memory Badge */}
            <button className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs font-medium transition-colors">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
              <span>Extended Memory</span>
            </button>
          </div>

          {/* Input Area */}
          <div className="relative flex items-center min-h-[60px]">
          {/* Plus Button */}
          {onFileUpload && (
            <button
              onClick={handleFileSelect}
              disabled={isLoading}
              className="flex-shrink-0 flex items-center justify-center w-12 h-12 text-gray-600 hover:text-black disabled:opacity-50 transition-colors"
              title="파일 업로드"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          )}

          {/* Text Input */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder || (!hasFile ? "파일을 업로드하고 데이터에 대해 질문해보세요..." : "데이터에 대해 질문해보세요...")}
            className="flex-1 py-0 px-0 bg-transparent border-none resize-none focus:outline-none text-black placeholder:text-gray-400 text-base leading-6 flex items-center"
            rows={1}
            disabled={isLoading}
            style={{
              height: '60px',
              minHeight: '60px',
              maxHeight: '150px',
              paddingTop: '18px',
              paddingBottom: '18px'
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = '60px';
              const newHeight = Math.max(60, Math.min(target.scrollHeight, 150));
              target.style.height = newHeight + 'px';
            }}
          />

          {/* Send Button */}
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0 flex items-center justify-center w-12 h-12 text-gray-600 hover:text-black disabled:opacity-50 transition-colors"
            title="메시지 전송"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
          </div>
        </div>

        {/* Drag overlay */}
        {isDragActive && (
          <div className="absolute inset-0 bg-blue-50 bg-opacity-90 border-2 border-dashed border-blue-300 rounded-2xl flex items-center justify-center z-10">
            <div className="text-blue-600 font-medium">파일을 여기에 드롭하세요</div>
          </div>
        )}
      </div>
      
      {/* Helper text */}
      <div className="text-xs text-gray-500 text-center">
        {!hasFile ? (
          "CSV, Excel 파일을 업로드하거나 드래그해서 분석을 시작하세요"
        ) : (
          "Enter로 전송 • Shift+Enter로 줄바꿈"
        )}
      </div>
    </div>
  )
}