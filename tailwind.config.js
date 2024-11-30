/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-default-color': '#000',
        'primary-disabled-color': 'rgba(255, 51, 51, 0.1)',
        'tw-ww': '#1DA1F2',
      },
    },
  },
  plugins: [],
};
