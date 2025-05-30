/** @type {import('tailwindcss').Config} */
import primeui from "tailwindcss-primeui";
module.exports = {
  darkMode: ["selector", '[class="p-dark"]'],
  content: ["./src/**/*.{html,ts,scss}", "./index.html"],
  plugins: [primeui],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1920px",
    },
  },
};
