<template>
  <v-container style="overflow-y: hidden;" class="px-0 py-0 h-screen" fluid>
  <Navbar type="homepage" />

  <v-app id="home-wrapper">
    <v-row class="mt-lg-16 mt-0 mb-0 mb-lg-16">
      <v-col id="body-wrapper" class="d-flex mt-2 flex-column">

        <div id="branding-h1-wrapper">
          <span id="branding-h1" style="color: #377DFF; font-weight: 800; font-family: 'Jost', sans-serif;">Grow Your<br/> Wealth Through Smart Investments</span>
        </div>
        <div id="branding-h2-wrapper">
          <span id="branding-h2" style="color: #7E8E99; font-weight: 400;">Invest in your future with MyDividend - the ultimate resource for dividend investors.</span>
      </div>
        <div id="primary-btn-wrapper" style="width: 350px;" class="d-flex mt-4">

          <q-select max-values="5"  @virtual-scroll="onScroll" style="width: 600px;"  rounded placeholder="Search markets here" fill-input input-debounce="0" :loading="loadingOnClick && loadingStockSymbol" @update:model-value="selectedStockDetail" @focus="testing" use-input standout class="mt-1" outlined bottom-slots v-model="selectedStock" :options="stockOptions" @filter="filterFn">

<template v-slot:prepend>
  <q-icon style="background-color: #2862FF; border-radius: 100%; padding: 7px" color="white" name="search" @click.stop.prevent />
</template>
</q-select>

          <!-- <v-btn
            style="background-color: #377dff; color: white"
            :to="checkSession"
            elevation="8"
            size="x-large"
            class="py-8 d-flex align-center mr-6 mb-2"
          >
            <span style="font-weight: 700;">Get Started For Free</span>
          </v-btn> -->

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

      <v-col id="image-wrapper" class="d-flex justify-end">
        <div>
          <v-img :width="620" src="../assets/hero.png" ></v-img>
        </div>

      </v-col>

    </v-row>

    <v-divider id="primary-divider" style="margin-top: 7rem; visibility: hidden;" />

    <!-- <div style="height: 100vh;" class="text-center">

    <v-row id="body-2-wrapper" class="d-flex justify-center mt-6">

      <div id="body-3-wrapper" class="text-center mt-4">

      <span style="color: #64FCD9; font-size: 48px; font-weight: 600;">Stock Screener</span>

      <q-select placeholder="Search for a company" fill-input input-debounce="0" :loading="loadingOnClick && loadingStockSymbol" @update:model-value="selectedStockDetail" @focus="testing" use-input standout class="mt-8" outlined bottom-slots v-model="selectedStock" :options="stockOptions" @filter="filterFn">

        <template v-slot:prepend>
          <q-icon name="search" @click.stop.prevent />
        </template>
      </q-select>

    </div>

    </v-row>

    <div id="body-4-wrapper" class="my-12">
    <span id="branding-h3" style="color: rgba(13, 37, 53, 0.7);">A Simple Tool  to See All Your <br/>
Dividends in One Place</span>
</div> -->

      <!-- <v-row>

        <v-col class="d-flex flex-column align-center">
          <v-img class="mt-2" :width="220" src="../assets/hero-1.png" />
          <span class="mt-10" style="font-weight: 500; font-size: 20px; text-decoration: underline; text-decoration-color: #64FCD9;">Simple to Use</span>
          <span style="font-size: 18px; color: #7E8E99;" class="mt-2">Get started with a free account. Add<br/> your stocks manually or<br/>
download them from your broker.<br/> Receive alerts, see payments,<br/> 
project future growth.</span>
        </v-col>


        <v-col id="body-5-wrapper" class="d-flex flex-column align-center">
          <div>
          <v-img class="mt-2" :width="220" src="../assets/hero-2.png" />
        </div>
          <span class="mt-10" style="font-weight: 500; font-size: 20px; text-decoration: underline; text-decoration-color: #64FCD9;">Link Your Accounts</span>
          <span style="font-size: 18px; color: #7E8E99;" class="mt-2">Effortlessly connect to thousands of<br/> banks and brokerage firms using Plaid.<br/> The easiest way to add, track, and<br /> analyze your dividends stocks.</span>
          
</v-col>
      </v-row> -->

  <!-- </div> -->

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

 <style>
@media (min-width: 600px) {
  #home-wrapper {
    padding-left: 100px;
    padding-right : 100px;
  }

  #branding-h1 {
    font-size: 64px;
  }

  #body-wrapper {
    justify-content: space-between;
    height: 560px;
  }

  #branding-h2 {
    font-size: 20px;
  }

  #primary-btn-wrapper {
    justify-content: between;
  }

  #body-3-wrapper {
    width: 399.2px;
  }

  #branding-h3 {
    font-size: 36px;
  }
  
}

/* Styles for screens less than 600px */
@media (max-width: 599px) {
  #home-wrapper {
    padding-left: 0;
    padding-right : 0;
  }

  #body-wrapper {
    padding-left: 32px;
    padding-right: 32px;
    margin-top: 0;
    padding-top: 0;
    height: 500px;
  }

  #branding-h1 {
    font-size: 45px;
    line-height: 60px;
  }

  #branding-h2 {
    font-size: 15px;
  }

  #branding-h2-wrapper {
    margin-top: 20px;
    margin-left: 2px;
  }

  #primary-btn-wrapper {
    justify-content: center;
    height: 200px;
    align-items: center;
  }

  #image-wrapper {
    display: none !important;
  }

  #primary-divider {
    display: none;
  }

  #body-2-wrapper {
    padding-top: 5px;
  }

  #body-3-wrapper {
    width: max-content;
    padding-left: 32px;
    padding-right: 32px;
  }

  #body-4-wrapper {
    padding-left: 18px;
    padding-right: 18px;
  }

  #branding-h3 {
    font-size: 24px;
  }

  #body-5-wrapper {
    padding-bottom: 50px;
  }
  
}

</style>
 