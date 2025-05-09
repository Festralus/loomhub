import axios from 'axios';

// Provide the Axios instance as "$api" throughout the project
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
