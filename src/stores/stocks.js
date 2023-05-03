// stores/stocks.js

import { defineStore } from 'pinia'
// Import axios to make HTTP requests
import axios from "axios"

export const useStockStore = defineStore("stock",{
   state: () => ({
      stocks: [],
      holdings: [],
  }),
  getters: {
    getStocks(state){
        return state.stocks
      },
    getHoldings(state){
        return state.holdings
      }
  },
  actions: {
    async fetchStocks() {
      try {
        const data = await axios.get(`https://script.googleusercontent.com/macros/echo?user_content_key=${import.meta.env.VITE_HOLDING_KEY}&lib=${import.meta.env.VITE_HOLDING_LIB}`)
          this.stocks = data.data.data.securities.sort()
        }
        catch (error) {
          alert(error)
          console.log(error)
      }
    },
    async fetchStockDetail(symbol) {
      try {
        const data = await axios.get(`https://script.google.com/macros/s/AKfycbyGNt9Dyo6mdXQwLZQqmNMsBzirm5Wp-z6MhjQ9NpFo05tKC7TZT9yPM2heUzHT8JsMGg/exec?symbol=${symbol}`)
        return data.data.data.history.map((x, index) => {
          return {
          amount: x.amount,
          index: index + 1,
          currency: x.currency,
          purpose: x.purpose,
          exDate: x.exDate,
          }
        })
        }
        catch (error) {
          alert(error)
          console.log(error)
      }
    },
    async fetchHoldings(token) {
      try {
        const data = await axios.post('https://script.google.com/macros/s/AKfycbzfnz1wW5KlCYh40uE-MNJP2o2Zo3BTh1fdPhpn0noOU7avXYfGdhwakAKAkfq80G8m7A/exec', {
          action: 'getholding',
          token,
        }, {
            headers: {
              "Content-Type": "text/plain;charset=utf-8",
            },
        })
        this.holdings = data.data
        return data
        }
        catch (error) {
          alert(error)
          console.log(error)
      }
    }
  },
  persist: {
    storage: sessionStorage
  }
})