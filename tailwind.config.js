/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.js", "./index.js", "./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0F7FF',
          100: '#E0EFFF',
          200: '#BADAFF',
          300: '#7CB9FF',
          400: '#3897FF',
          500: '#0176FF',
          600: '#005FD1',
          700: '#004BA6',
          800: '#00367A',
          900: '#002554',
        },
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        surface: {
          white: '#FFFFFF',
          soft: '#F9FAFB',
          glass: 'rgba(255, 255, 255, 0.8)',
        },
        accent: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
        }
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
      },
    },
  },
  plugins: [],
}