/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "btn-primary-bg-default-color": "#000",
        "btn-primary-bg-disabled-color": "rgba(255, 51, 51, 0.1)",
      },
    },
  },
  plugins: [],
};
