/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: { center: true },
    
    extend: {
      screens: {
        "2xl": "1320px"
      },
      fontFamily:{
        aladin: ['"Aladin"', 'cursive'],

      }
      
    },
  },
  plugins: [],
}
