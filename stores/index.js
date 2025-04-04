import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import useApi from '/utils/api';

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
      shopSortingOption: 0,
    };
  },

  actions: {
    getSortingOption() {
      const shopSortingOption = Cookies.get('shopSortingOption') || 0;
    },
    setSortingOption(payload) {
      if (payload !== undefined && sortingOptions[savedOption]) {
        console.log(payload);
        this.shopSortingOption = this.sortingOptions[payload];
      } else {
        this.shopSortingOption = 0;
      }
    },
  },
});

export const sortingOptions = {
  0: { name: 'Most popular' },
  1: { name: 'Newest Arrivals' },
  2: { name: 'Highest Rated' },
  3: { name: 'Price: Low to High' },
  4: { name: 'Price: High to Low' },
  5: { name: 'Name: A-Z' },
  6: { name: 'Name: Z-A' },
};
