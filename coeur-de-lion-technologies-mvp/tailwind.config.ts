import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0b4da2',
          red: '#e5302b',
          gold: '#c9a227',
        },
      },
      borderRadius: {
        '2xl': '1rem',
      }
    },
  },
  plugins: [],
}
export default config
