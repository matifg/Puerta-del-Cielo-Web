/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./sections/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        /** Laptop / notebook (1024px–1535px; sin depender de la altura del viewport) */
        notebook: { raw: "(min-width: 1024px) and (max-width: 1535.98px)" },
        /** Monitor grande: galería con proporción amplia */
        desktop: { raw: "(min-width: 1536px)" },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
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