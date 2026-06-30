/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f8fafc',
          100: '#eef2ff',
          500: '#4f46e5',
          600: '#4338ca'
        },
        accent: '#7c3aed'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial'],
        display: ['Poppins', 'Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}
