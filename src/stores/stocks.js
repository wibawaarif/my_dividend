// stores/stocks.js

import { defineStore } from 'pinia'
// Import axios to make HTTP requests
import axios from "axios"

const HOLDINGS_URL = "https://script.google.com/macros/s/AKfycbz3IntRXsII5g1BJRp77-z4XYgW4jcC1RooctJqgZXRxGdrpL7_eR2mXPC5zs4OZg/exec";

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
        const data = await axios.post(HOLDINGS_URL, {
          action: 'getholding',
          token,
        }, {
            headers: {
              "Content-Type": "text/plain;charset=utf-8",
            },
        })
        if (data.data.status === 'failed') {
          throw new Error('Invalid Token')
        }
        this.holdings = data.data.data.holdings
        localStorage.setItem('holdings', JSON.stringify(this.holdings))
        return data

    },
    async saveHoldings(form, token) {
      try {
        const data = await axios.post(HOLDINGS_URL, Object.assign(form, {
          action: 'saveholding',
          token,
        }), {
            headers: {
              "Content-Type": "text/plain;charset=utf-8",
            },
        })
        if (data.data.errMessage === 'Invalid auth token') {
          return data
        }
        return data
        }
        catch (error) {
          alert(error)
          console.log(error)
      }
    },
    async deleteHoldings(id, token) {
        const data = await axios.post(HOLDINGS_URL, {
          id,
          action: "deleteholding",
          token,
        }, {
            headers: {
              "Content-Type": "text/plain;charset=utf-8",
            },
        })
        if (data.data.status === 'failed') {
          throw new Error('Failed to delete')
        }

        this.holdings = this.holdings.filter(holding => holding.id !== id)

        return data


    }
  },
  persist: {
    storage: sessionStorage
  }
})