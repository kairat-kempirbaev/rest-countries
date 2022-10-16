/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        db: "hsl(209, 23%, 22%)",
        vdb:" hsl(207, 26%, 17%)",
        lvdb:"hsl(200, 15%, 8%)",
        dg:"hsl(0, 0%, 52%)",
        vlg:"hsl(0, 0%, 98%)",
        wht:"hsl(0, 0%, 100%)"
      }
    },
    fontFamily: {
      'sans': ['Nunito Sans', ...defaultTheme.fontFamily.sans],
    },

  },

  plugins: [],
}