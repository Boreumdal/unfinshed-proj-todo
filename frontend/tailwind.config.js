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
        'theme-dark': '#131213',
        'theme-dark-fore': '#1c1d1c',
        'theme-dark-text': '#e3e3e3',
        'theme-light': '#FFFFFF',
        'theme-light': '#0f0e0f'
      }
    },
  },
  plugins: [],
}

