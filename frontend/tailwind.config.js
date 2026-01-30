/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ice': '#EAEFEF',
        'slate': '#BFC9D1',
        'navy': '#25343F',
        'coral': '#FF9B51',
      },
      fontFamily: {
        'display': ['Fraunces', 'serif'],
        'body': ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
