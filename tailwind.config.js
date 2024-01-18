/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkblack: "#0C0C0C",
        darkblack2: "#0f0f0f",
        dark: "#1A1A1A",
        black: "#333",
        white: "#FAFAFA",
        pink: "#e91e63",
        pink2: "#ff0057",
        lightgrey: "#ebebeb",
        lightgrey2: "#c4c4c4",
        lightgrey3: "#D4D4D4",
        // old ui
        lightgrey4: "#f3f3f6",
        grey: "#656569",
        darkgrey: "#515151",
        lightblue: "#e7f4f7",
        blue: "#4071b8",
        blue2: "#2e5aac",
        blue3: "#276b75",
        blue4: "#008d9d",
        green: "#56c568",
        goldenyellow: "#f2be5e",
      },
      screens: {
        "2xs": "380px",
        xs: "420px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
  },
  plugins: [],
};
