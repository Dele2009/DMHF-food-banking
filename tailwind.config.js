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
        "yellow-theme": {
          extend: "default", // Inherit from the default HeroUI theme
          colors: {
            background: "#FFEB9B",
            foreground: "#332F27",
            primary: {
              50: "#FFF8D1",
              100: "#FFEFB3",
              200: "#FFE680",
              300: "#FFD84D",
              400: "#FFCA1A",
              500: "#E6B200",
              600: "#B38E00",
              700: "#806B00",
              800: "#4D4700",
              900: "#1A1300",
              DEFAULT: "#FFD84D",
              foreground: "#332F27",
            },
            focus: "#FFCA1A",
          },
          layout: {
            disabledOpacity: "0.4",
            radius: {
              small: "4px",
              medium: "8px",
              large: "12px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
        "yellow-theme-dark": {
          extend: "yellow-theme",
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

