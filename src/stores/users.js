// stores/stocks.js

import { defineStore } from "pinia";
// Import axios to make HTTP requests
import axios from "axios";

const USER_URL = "https://script.google.com/macros/s/AKfycbxAeAkDQdgoeUFhnWUyd-6sfDWB2aycl7B9r2pAuI9RX_JqLCPCB3-RshhfI2fgAugd/exec";

export const useUserStore = defineStore("users", {
  state: () => ({
    users: "",
    token: ""
  }),
  getters: {
    getUser(state) {
      return state.users;
    },
    getToken(state) {
      return state.token;
    },
  },
  actions: {
    async registerUser(form) {
      try {
        const data = await axios.post(
          USER_URL,
          {
            action: "register",
            firstName: form.firstName,
            lastName: form.lastName,
            phone: form.phone,
          },
          {
            headers: {
              "Content-Type": "text/plain;charset=utf-8",
            },
          }
        );
        return data;
      } catch (error) {
        return error;
      }
    },
    async loginUser({ phone }) {
      try {
        const data = await axios.post(
          USER_URL,
          {
            action: "logincreate",
            phone,
          },
          {
            headers: {
              "Content-Type": "text/plain;charset=utf-8",
            },
          }
        );
        return data;
      } catch (error) {
        return error;
      }
    },
    async verifyLoginUser({ phone, otp }) { 
      try {
        const data = await axios.post(
          USER_URL,
          {
            action: "loginverify",
            phone,
            otp,
          },
          {
            headers: {
              "Content-Type": "text/plain;charset=utf-8",
            },
          }
        );
        this.token = data.data.data.sessionToken
        return data;
      } catch (error) {
        return error;
      }
    },
  },
  persist: {
    storage: sessionStorage,
  },
});
