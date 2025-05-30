// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: false },

  css: [
    '/assets/styles/input.css',
    '/assets/styles/output.css',
    '/assets/styles/styleGlobal.css',
    '/assets/styles/styleFonts.css',
  ],

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE,
    },
  },

  compatibilityDate: '2025-02-19',
});
