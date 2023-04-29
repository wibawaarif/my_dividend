// stores/stocks.js

import { defineStore } from 'pinia'
// Import axios to make HTTP requests
import axios from "axios"
export const useUserStore = defineStore("users",{
   state: () => ({
      users: '',
  }),
  getters: {
    getUser(state){
        return state.users
      }
  },
  actions: {
    async registerUser(form) {
      try {
        const data = await axios.post('https://script.google.com/macros/s/AKfycbxAeAkDQdgoeUFhnWUyd-6sfDWB2aycl7B9r2pAuI9RX_JqLCPCB3-RshhfI2fgAugd/exec', {
          action: 'register',
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone
        });
        return data
        }
        catch (error) {
          return error
      }
    },
    async loginUser({phone}) {
      try {
        const data = await axios.post('https://script.google.com/macros/s/AKfycbxAeAkDQdgoeUFhnWUyd-6sfDWB2aycl7B9r2pAuI9RX_JqLCPCB3-RshhfI2fgAugd/exec', {
        action: 'logincreate',  
        phone
        });
        return data
        }
        catch (error) {
          return error
      }
    }
  },
  persist: {
    storage: sessionStorage
  }
})