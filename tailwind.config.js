/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 1px 3px 1px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.30)'
      }
    },
  },
  plugins: [],
}

