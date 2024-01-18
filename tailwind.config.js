/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightgrey: "#f3f3f6",
        lightgrey2: "#fcfcfd",
        lightgrey3: "#d9d6d6",
        lightgrey4: "#ebebeb",
        white: "#FAFAFA",
        black: "#333",
        darkblack: "#0C0C0C",
        dark: "#1A1A1A",
        grey: "#656569",
        darkgrey: "#515151",
        lightblue: "#e7f4f7",
        blue: "#4071b8",
        blue2: "#2e5aac",
        blue3: "#276b75",
        blue4: "#008d9d",
        green: "#56c568",
        goldenyellow: "#f2be5e",
        pink: "#e91e63",
        pink2: "#ff0057",
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
