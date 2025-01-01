// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: "#152490",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        bebas: ['"Bebas Neue"', "cursive"], // Bebas Neue
        mona: ['"Mona Sans"', "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
