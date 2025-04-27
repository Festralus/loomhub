import axios from 'axios';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const api = axios.create({
    baseURL:
      config.public.apiBase ||
      'https://loomhub-backend-production.up.railway.app',
  });

  return {
    provide: {
      api,
    },
  };
});
