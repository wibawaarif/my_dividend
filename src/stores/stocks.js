// stores/stocks.js

import { defineStore } from 'pinia'
// Import axios to make HTTP requests
import axios from "axios"

export const useStockStore = defineStore("stock",{
   state: () => ({
      stocks: [],
  }),
  getters: {
    getStocks(state){
        return state.stocks
      }
  },
  actions: {
    async fetchStocks() {
      try {
        const data = await axios.get(`https://script.googleusercontent.com/macros/echo?user_content_key=${process.env.VITE_HOLDING_KEY}&lib=${process.env.VITE_HOLDING_LIB}`)
          this.stocks = data.data.data.securities.sort()
        }
        catch (error) {
          alert(error)
          console.log(error)
      }
    }
  },
})