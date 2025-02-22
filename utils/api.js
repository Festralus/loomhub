import axios from 'axios';
import { useRuntimeConfig } from '#imports';

export default function useApi() {
  const config = useRuntimeConfig();
  return axios.create({
    baseURL: config.public.apiBase,
  });
}
