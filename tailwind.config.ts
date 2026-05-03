import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'paprika': '#C1440E',
        'camaron': '#E86A33',
        'oro': '#D4A853',
        'arena': '#F5E6CA',
        'negro': '#1A1A1A',
        'mar': '#1B4965',
        'blanco': '#FAF8F5',
        'vidrio': '#A8C5B8',
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
