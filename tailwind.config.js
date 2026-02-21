/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "var(--brand-bg)",
          gold: "var(--brand-gold)",
          surface: "var(--brand-surface)",
          muted: "var(--brand-muted)",
        },
      },
      fontFamily: {
        brand: ["Orbitron", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};