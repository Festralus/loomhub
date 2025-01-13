/** @type {import('tailwindcss').Config} */
export const content = [
  './components/**/*.{vue,js,ts}',
  './layouts/**/*.vue',
  './pages/**/*.vue',
  './icons/**/*.vue',
  './plugins/**/*.{js,ts}',
  './nuxt.config.{js,ts}',
];
export const theme = {
  extend: {
    colors: {
      'primary-default-color': '#000',
      'primary-disabled-color': 'rgba(255, 51, 51, 0.1)',
      'tw-ww': '#1DA1F2',
    },
  },
};
export const plugins = [];
