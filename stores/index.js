import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
// import useApi from '/utils/api';
import { useApi } from '@/composables/useApi.js';

export const useAuthStore = defineStore({
  id: 'auth',

  state: () => {
    return {
      token: null,
      nickname: null,
      profilePicUrl: null,
      authenticated: false,
    };
  },

  actions: {
    // Method to check whether a user is logged in
    async getSession() {
      const api = useApi();
      const token = Cookies.get('token');

      if (token) {
        try {
          const response = await api.get('/auth/protected', {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.setSession({
            token,
            nickname: response.data.nickname,
            profilePicUrl: response.data.profilePicUrl,
          });
        } catch (err) {
          console.error('Error checking session:', err);
          this.clearSession();
        }
      } else {
        this.clearSession();
      }
    },

    // Method to set user auth (log them in)
    setSession(payload) {
      if (payload.token) {
        this.authenticated = true;
        this.token = payload.token;
        this.nickname = payload.nickname;
        this.profilePicUrl = payload.profilePicUrl;
        // this.email = payload.email;
      } else {
        this.clearSession();
      }
    },

    // Method to remove user auth
    deleteSessionToken() {
      Cookies.remove('token');
      this.clearSession();
    },

    // Method to clear the session
    clearSession() {
      this.nickname = null;
      this.profilePicUrl = null;
      this.authenticated = false;
    },
  },
});

export const useSortingStore = defineStore({
  id: 'sort',

  state: () => {
    return {
      shopSortingOption: ref(Number(Cookies.get('shopSortingOption')) || 0),
      sortingOptions: [
        { name: 'Most popular' },
        { name: 'Newest Arrivals' },
        { name: 'Most discounted' },
        { name: 'Highest Rated' },
        { name: 'Price: Low to High' },
        { name: 'Price: High to Low' },
        { name: 'Name: A-Z' },
        { name: 'Name: Z-A' },
      ],
    };
  },

  actions: {
    setSortingOption(payload) {
      if (this.sortingOptions[payload]) {
        this.shopSortingOption = payload;
        Cookies.set('shopSortingOption', String(payload), {
          expires: 7,
        });
      } else {
        this.shopSortingOption = 0;
        Cookies.set('shopSortingOption', '0', {
          expires: 7,
        });
      }
    },
  },
});
