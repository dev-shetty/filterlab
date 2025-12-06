/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        surface: "#111111",
        primary: "#ffffff", // White for primary actions/text
        secondary: "#888888", // Gray for secondary
        accent: "#333333", // Dark gray for borders/accents
        text: "#ededed",
        muted: "#a1a1a1",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
      },
    },
  },
  plugins: [],
}
