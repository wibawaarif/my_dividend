<template>
  <v-container class="px-0 py-0 h-screen" fluid>
  <Navbar type="homepage" />

  <v-app style="padding-left: 100px; padding-right: 100px;">
    <v-row class="mt-16 mb-16">
      <v-col style="height: 560px;" class="d-flex mt-2 flex-column justify-between">

        <span style="color: #377DFF; font-size: 64px; font-weight: 800; font-family: 'Jost', sans-serif;">Grow Your<br/> Wealth Through Smart Investments</span>

        <span style="color: #7E8E99; font-weight: 400; font-size: 20px;">Invest in your future with MyDividend - the ultimate resource for dividend investors.</span>

        <div style="width: 350px;" class="d-flex mt-4 justify-between">

          <v-btn
            style="background-color: #377dff; color: white"
            :to="checkSession"
            elevation="8"
            size="x-large"
            class="py-8 d-flex align-center mr-6 mb-2"
          >
            <span style="font-weight: 700;">Get Started For Free</span>
          </v-btn>

          <!-- <v-btn
            @click="scrollPage"
            color="blue"
            variant="outlined"
            size="x-large"
            class="py-8 d-flex align-center mr-6 mb-2"
          >
            <span style="font-weight: 700;">Stock Screener</span>
          </v-btn> -->

        </div>

      </v-col>

      <v-col class="d-flex justify-end">
        <div>
          <v-img :width="620" src="../assets/hero.png" ></v-img>
        </div>

      </v-col>

    </v-row>

    <v-divider style="margin-top: 7rem; visibility: hidden;" />

    <div style="height: 100vh;" class="text-center">

    <v-row class="d-flex justify-center mt-6">

      <div class="text-center w-50 mt-4">

      <span style="color: #64FCD9; font-size: 48px; font-weight: 600;">Stock Screener</span>

      <q-select placeholder="Search for a company" fill-input input-debounce="0" :loading="loadingOnClick && loadingStockSymbol" @update:model-value="selectedStockDetail" @focus="testing" use-input standout class="mt-8" outlined bottom-slots v-model="selectedStock" :options="stockOptions" @filter="filterFn">

        <template v-slot:prepend>
          <q-icon name="search" @click.stop.prevent />
        </template>
      </q-select>

    </div>

    </v-row>

    <div class="my-12">
    <span style="font-size: 36px; color: rgba(13, 37, 53, 0.7);">A Simple Tool  to See All Your <br/>
Dividends in One Place</span>
</div>

      <v-row>

        <v-col class="d-flex flex-column align-center">
          <v-img class="mt-2" :width="220" src="../assets/hero-1.png" />
          <span class="mt-10" style="font-weight: 500; font-size: 20px; text-decoration: underline; text-decoration-color: #64FCD9;">Simple to Use</span>
          <span style="font-size: 18px; color: #7E8E99;" class="mt-2">Get started with a free account. Add<br/> your stocks manually or<br/>
download them from your broker.<br/> Receive alerts, see payments,<br/> 
project future growth.</span>
        </v-col>


        <v-col class="d-flex flex-column align-center">
          <div>
          <v-img class="mt-2" :width="220" src="../assets/hero-2.png" />
        </div>
          <span class="mt-10" style="font-weight: 500; font-size: 20px; text-decoration: underline; text-decoration-color: #64FCD9;">Link Your Accounts</span>
          <span style="font-size: 18px; color: #7E8E99;" class="mt-2">Effortlessly connect to thousands of<br/> banks and brokerage firms using Plaid.<br/> The easiest way to add, track, and<br /> analyze your dividends stocks.</span>
          
</v-col>
      </v-row>

  </div>

  </v-app>

</v-container>
 </template>
 
<script>
   import Navbar from '@/components/Navbar.vue'
   import { useStockStore } from "../stores/stocks";
  const store = useStockStore();

   export default {
    components: {
    Navbar
  },
  data() {
    return {
      selectedStock: '',
      stocks: ["test", "test123"],
      stockOptions: "",
      loadingOnClick: false,

   }
  },
  methods: {
    scrollPage() {
      window.scrollTo({top: 960, behavior: 'smooth'});
    },
    testing() {
      this.loadingOnClick = true;
    },  
    selectedStockDetail(value) {
      this.$router.push({ name: 'stockDetail', params: { symbol: value } })
    },
    filterFn(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.stockOptions = this.getStocks.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
  },
  computed: {
    checkSession() {
      return localStorage.getItem('token') ? '/dashboard' : '/register' 
    },
    getStocks() {
      return store.getStocks;
    },
    loadingStockSymbol() {
      if (this.getStocks.length === 0) {
        return true
      } else {
        return false
      }
    }, 
  },
  mounted() {
    store.fetchStocks().then(() => {
      this.stockOptions = store.getStocks;
    });
  },
  created() {
    document.title = "Home | MyDividend";
  }
}
 </script>
 