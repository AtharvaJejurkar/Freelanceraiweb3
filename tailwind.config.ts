import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        headline: ['"Source Serif 4"', 'serif'],
        body: ['"Hanken Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          900: '#12181F',
          800: '#1B2A38',
        },
        vault: {
          800: '#1B2A38',
          700: '#233240',
        },
        paper: {
          50: '#F6F4EE',
        },
        brass: {
          600: '#8E662D',
          500: '#B8863B',
          400: '#D4A14F',
        },
        verified: {
          600: '#2F6F5E',
        },
        dispute: {
          600: '#A83A3A',
        },
        admin: {
          700: '#4A3F73',
        },
        surface: {
          dim: '#051522',
          DEFAULT: '#051522',
          bright: '#2c3b49',
          container: '#12212f',
          low: '#0d1d2a',
          high: '#1c2b39',
          highest: '#273645',
        },
        'on-surface': '#d4e4f7',
        'on-surface-variant': '#c5c6cb',
        outline: {
          DEFAULT: '#8f9195',
          variant: '#44474b',
        },
      },
      spacing: {
        'margin-mobile': '16px',
        'margin-desktop': '64px',
        gutter: '24px',
      },
      maxWidth: {
        'container': '1280px',
      },
      boxShadow: {
        'hard': '4px 4px 0px 0px #010f1c',
      },
      animation: {
        'wax-seal-appear': 'wax-seal-appear 0.6s ease-out forwards',
        'check-draw': 'check-draw 0.4s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out forwards',
      },
      keyframes: {
        'wax-seal-appear': {
          '0%': { transform: 'scale(0) rotate(-180deg)', opacity: '0' },
          '50%': { transform: 'scale(1.2) rotate(10deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        'check-draw': {
          '0%': { strokeDasharray: '0 100' },
          '100%': { strokeDasharray: '100 0' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'wax-gradient': 'radial-gradient(circle at 30% 30%, #f9c06e 0%, #B8863B 100%)',
        'ledger-line': 'linear-gradient(to right, #44474b 1px, transparent 1px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
