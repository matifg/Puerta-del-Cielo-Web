/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: "#2563ad",
        secondary: "#40c2de",
        dark: "#000000",
        light: "#ffffff",
        grayCustom: "#828282",
      },
    },
  },
  plugins: [],
};