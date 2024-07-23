/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'smallDevice': {'min': '319px', 'max': '1439px'},        
      }
    },
  },
  plugins: [],
}

