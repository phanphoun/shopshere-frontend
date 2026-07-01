/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx,css}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#5B3DF5',
          700: '#4C2EE8',
          800: '#3B1FD6',
          900: '#2D1BB5',
        },
        accent: {
          green: '#16A34A',
          red: '#EF4444',
          orange: '#F97316',
        },
        surface: {
          DEFAULT: '#FAFAFC',
          50: '#FAFAFC',
          100: '#F5F5FA',
          200: '#ECECF3',
        },
        border: {
          DEFAULT: '#ECECF3',
          50: '#F0F0F5',
          100: '#ECECF3',
          200: '#E0E0EB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0,0,0,0.05)',
        'soft-lg': '0 10px 30px rgba(91,61,245,0.08)',
        'card': '0 4px 12px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04)',
        'card-hover': '0 10px 30px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04)',
        'purple-glow': '0 10px 30px rgba(91,61,245,0.12)',
        'nav': '0 4px 20px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        'btn': '12px',
        'card': '18px',
        'nav': '20px',
        'input': '14px',
        'img': '16px',
        'pill': '9999px',
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '80': '20rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  safelist: [
    'bg-surface',
    'border-border',
    'shadow-card',
    'shadow-card-hover',
    'shadow-soft-lg',
    'shadow-nav',
    'rounded-btn',
    'rounded-card',
    'rounded-nav',
    'rounded-input',
    'rounded-img',
    'rounded-pill',
  ],
  plugins: [],
}
