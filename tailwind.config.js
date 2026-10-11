/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#173C2E',
          deep: '#10291F',
          light: '#1f4e3c',
        },
        gold: {
          antique: '#B39458',
          rich: '#D8A33E',
          light: '#dfc68b',
          faint: 'rgba(179, 148, 88, 0.12)',
        },
        ivory: {
          DEFAULT: '#F7F3E9',
          light: '#FCFAF5',
        },
        cream: {
          DEFAULT: '#EFE6D4',
          subtle: '#E8DEC9',
        },
        charcoal: {
          DEFAULT: '#24251F',
          muted: '#40423A',
        },
        olive: {
          DEFAULT: '#777B64',
          dark: '#5C604C',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        'luxury': '0.18em',
        'subtle': '0.08em',
      },
      boxShadow: {
        'subtle-elevation': '0 4px 20px -2px rgba(16, 41, 31, 0.05)',
        'premium': '0 12px 32px -4px rgba(16, 41, 31, 0.08)',
        'drawer': '-10px 0 35px -5px rgba(16, 41, 31, 0.15)',
      },
    },
  },
  plugins: [],
}
