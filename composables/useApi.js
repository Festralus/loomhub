// Provides access to the global API instance throughout the project
export const useApi = () => {
  return useNuxtApp().$api;
};
