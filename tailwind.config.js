/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./app.js",
    "./components/**/*.js",
    "./lib/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Brand Design System (from sample UI)
        'brand-bg':     '#0f121e',
        'brand-sidebar':'#0e111a',
        'brand-card':   '#151a26',
        'brand-hover':  '#1e2536',
        'brand-active': '#242c42',
        'brand-accent': '#f5bd23',
        'brand-accent-hover': '#e2ab17',
        'brand-border': '#1f2638',
        'brand-text-muted': '#8a99ad',

        // Legacy colors (kept for backwards compat)
        primary: {
          50:  '#f0fdfa',
          100: '#ccfbf1',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
        },
        darkbg: {
          950: '#030712',
          900: '#090d16',
          800: '#111827',
          700: '#1f2937',
        }
      },
      boxShadow: {
        'app': '0 12px 40px -10px rgba(0, 0, 0, 0.08)',
        'nav': '0 -8px 24px -6px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
