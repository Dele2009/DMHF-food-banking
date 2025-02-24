/** @type {import('tailwindcss').Config} */
import {heroui} from '@heroui/react'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    heroui({
      themes: {
        "yellow-theme-dark": {
          extend: "dark",
          colors: {
            background: "#1A1A1A",
            foreground: "#E6E6E6",
            primary: {
              50: "#E6B200",
              100: "#B38E00",
              200: "#806B00",
              300: "#4D4700",
              400: "#1A1300",
              500: "#FFD84D",
              600: "#FFCA1A",
              700: "#FFB700",
              800: "#FF9C00",
              900: "#FF8000",
              DEFAULT: "#FFD84D",
              foreground: "#E6E6E6",
            },
            focus: "#FFCA1A",
          },
        },
      },
    })
  ],
};

