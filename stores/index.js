import { defineStore } from 'pinia';
import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => {
    return {
      token: null,
      nickname: null,
      profilePicUrl: null,
      email: null,
      authenticated: false,
    };
  },
  actions: {
    // Method to check whether a user is logged in
    async checkSession() {
      const token = Cookies.get('token');

      if (token) {
        try {
          const response = await api.get('/auth/protected', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const nickname = response.data.nickname;
          const profilePicUrl = response.data.profilePicUrl;
          const email = response.data.email;
          this.setSession({ token, nickname, profilePicUrl, email });
        } catch (err) {}
      }
    },

    // Method to set user auth (log them in)
    setSession(payload) {
      this.nickname = payload.nickname;
      this.profilePicUrl = payload.profilePicUrl;
      this.email = payload.email;
      this.token = payload.token;

      if (payload.token) {
        this.authenticated = true;
      }
    },

    // Method to remove user auth
    deleteSessionToken() {
      Cookies.remove('token');
    },
  },
});
