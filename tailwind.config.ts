import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: { DEFAULT: '1.25rem', md: '2rem' }, screens: { '2xl': '1240px' } },
    extend: {
      colors: {
        navy: {
          50: '#EEF3F8', 100: '#D6E1EC', 200: '#AFC3D8', 300: '#7F9DBD', 400: '#4E7499',
          500: '#2C5580', 600: '#1F4670', 700: '#18395D', 800: '#122D4B', 900: '#0D223A', 950: '#081627',
        },
        petro: { 50: '#E8F6FC', 100: '#C6E9F7', 400: '#2BAEDF', 500: '#0190C6', 600: '#0177A6', 700: '#015F86' },
        leaf: {
          50: '#F1F8EC', 100: '#DDEFD2', 200: '#BCDFA6', 300: '#94CB73', 400: '#6CB848',
          500: '#4FA334', 600: '#3D862B', 700: '#2F6A22', 800: '#27551E', 900: '#1F441A',
        },
        ink: { DEFAULT: '#0F1B2A', soft: '#3B4A5C', muted: '#5B6B7D' },
        surface: { DEFAULT: '#FFFFFF', alt: '#F5F8F6', line: '#E3E9EF' },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(2.5rem, 5.2vw, 4.25rem)', { lineHeight: '1.04', letterSpacing: '-0.025em' }],
        'h1': ['clamp(2.1rem, 4vw, 3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'h2': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.12', letterSpacing: '-0.018em' }],
        'h3': ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
      },
      boxShadow: {
        card: '0 1px 2px rgba(13,34,58,.05), 0 8px 24px -12px rgba(13,34,58,.14)',
        lift: '0 2px 4px rgba(13,34,58,.06), 0 24px 48px -20px rgba(13,34,58,.28)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #0D223A 0%, #122D4B 45%, #15506A 100%)',
        'leaf-gradient': 'linear-gradient(135deg, #3D862B 0%, #4FA334 100%)',
        'mist': 'linear-gradient(120deg, #F1F8EC 0%, #F5F8F6 45%, #E8F6FC 100%)',
      },
      keyframes: {
        'fade-up': { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'none' } },
      },
      animation: { 'fade-up': 'fade-up .6s cubic-bezier(.2,.7,.2,1) both' },
    },
  },
  plugins: [],
};
export default config;
