/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'emerald-theme': '#06D6A0',
        'pink-theme': '#c74025',
        'sunglow': '#FFD166',
        'ncs': '#118AB2',
        'blue-theme': '#00A6FB',
        'steelblue-theme': '#0582CA',
        'accent-1': '#041C32',
        'accent-2': '#ECB365',
        'theme-1': '#393E46',
        'theme-2': '#FFFFFF'
      }
    },
  },
  plugins: [],
}

