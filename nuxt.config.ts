// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [
    '/assets/styles/input.css',
    '/assets/styles/output.css',
    '/assets/styles/styleGlobal.css',
    '/assets/styles/styleFonts.css',
  ],
});
