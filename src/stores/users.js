// stores/stocks.js

import { defineStore } from "pinia";
// Import axios to make HTTP requests
import axios from "axios";

const USER_URL = "https://script.google.com/macros/s/AKfycbyT_QVUPdnjB4VnXDBhN959it62t4jiWC-52gi1H515VOvj_CSAv-t7IS0hiIVnSJr_/exec";

export const useUserStore = defineStore("users", {
  state: () => ({
    users: "",
    token: "",
    membership: "",
  }),
  getters: {
    getUser(state) {
      return state.users;
    },
    getToken(state) {
      return state.token;
    },
    getMembership(state) {
      return state.membership;
    }
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
        this.membership = data.data.data.membership;
        this.users = data.data.data.userName;
        this.token = data.data.data.sessionToken;
        return data;
      } catch (error) {
        return error;
      }
    },
    async logout() {
      try {
          await axios.post(
          USER_URL,
          {
            action: "logout",
            token: this.state.token
          },
          {
            headers: {
              "Content-Type": "text/plain;charset=utf-8",
            },
          }
        );
      } catch (error) {
        return error;
      }
    },
  },
  persist: {
    storage: sessionStorage,
  },
});
