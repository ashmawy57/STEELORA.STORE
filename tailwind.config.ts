import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#1A1A1A",
          black: "#1A1A1A",
          950: "#0D0D0D",
          900: "#141414",
          800: "#1A1A1A",
          700: "#262626",
          600: "#333333",
        },
        gold: {
          DEFAULT: "#C6A664",
          champagne: "#C6A664",
          light: "#E4C27D",
          dark: "#A38445",
          50: "#FAF6EE",
          100: "#F4ECDC",
          200: "#E8D9B9",
          300: "#DBC596",
          400: "#C6A664",
          500: "#B8964E",
          600: "#987A38",
        },
        ivory: {
          DEFAULT: "#F5F5F5",
          white: "#F5F5F5",
          100: "#FFFFFF",
          200: "#F9F9F9",
          300: "#F5F5F5",
          400: "#EBEBEB",
        },
        steel: {
          DEFAULT: "#7D8791",
          gray: "#7D8791",
          light: "#A0AAB5",
          dark: "#5A636C",
          100: "#E9ECF0",
          200: "#CFD5DC",
          300: "#A0AAB5",
          400: "#7D8791",
          500: "#5A636C",
          600: "#444C54",
          700: "#2E343A",
          800: "#1C2126",
          900: "#0F1317",
        },
        sand: {
          DEFAULT: "#E8DFC8",
          beige: "#E8DFC8",
          light: "#F3EDE0",
          dark: "#D1C3A5",
        },
        surface: {
          dark: "#0B141C",
          card: "#131D24",
          container: "#172129",
          border: "#2C363E",
        },
      },
      fontFamily: {
        sans: ["Inter", "IBM Plex Sans Arabic", "Cairo", "system-ui", "sans-serif"],
        heading: ["Montserrat", "Cairo", "system-ui", "sans-serif"],
        arabicHeading: ["Cairo", "sans-serif"],
        arabicBody: ["IBM Plex Sans Arabic", "Cairo", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
        goldGlow: "0 0 25px -5px rgba(198, 166, 100, 0.4)",
        softCard: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
