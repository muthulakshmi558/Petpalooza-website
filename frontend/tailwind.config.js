/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        persianblue: "#1C49C2",
        deepblue: "#0045FF",
        palegreen: "#98FB98",
      },
    },
  },
  plugins: [],
}
