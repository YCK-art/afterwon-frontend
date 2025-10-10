import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'cormorant': ['CormorantGaramond', 'serif'],
        'spectral': ['SpectralLight', 'serif'],
        'nunito': ['NunitoSans', 'sans-serif'],
      },
      animation: {
        'bounce': 'bounce 1s infinite',
        'shine': 'shine 3s infinite',
      },
      keyframes: {
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      }
    },
  },
  plugins: [],
  important: true, // Force all Tailwind classes to be !important
} satisfies Config;