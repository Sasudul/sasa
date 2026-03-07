/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Oswald', 'sans-serif'],
      },
      colors: {
        wa: {
          green: '#25D366',       // Bright Green
          teal: '#128C7E',        // Teal
          dark: '#0B141A',        // Dark Mode BG
          card: '#202C33',        // Dark Card
          light: '#FFFFFF',       // Mode BG
          gray: '#8696A0',        // Gray Text
        }
      },
    },
  },
  plugins: [],
}
