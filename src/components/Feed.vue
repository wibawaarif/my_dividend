<template>
  <v-app style="padding-left: 100px; padding-right: 100px;">
    <q-dialog @hide="clearFields('new-holding')" v-model="addHoldingDialog" width="620">
      <v-card>
        <v-card-title class="d-flex align-center justify-space-between pt-4">
          <span class="text-h5 ml-4">New Holding</span>
          <v-btn
            flat
            icon
            dark
            class="mr-2"
            @click="clearFields('new-holding')"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <span
                  >Select Stock Symbol
                  <span class="text-red font-weight-bold">*</span></span
                >
                <q-select
                  @focus="triggerLoading"
                  class="mt-2"
                  v-model="form.symbol"
                  outlined
                  bg-color="white"
                  color="indigo"
                  clearable
                  input-debounce="0"
                  use-input
                  :loading="loadingStockSymbol && loadingOnClick"
                  :options="stockOptions"
                  @filter="filterFn"
                >
                </q-select>
              </v-col>
              <v-col cols="12">
                <span
                  >Buy Date
                  <span class="text-red font-weight-bold">*</span></span
                >
                <VueDatePicker
                  :enable-time-picker="false"
                  class="mt-2"
                  input-class-name="dp-custom-input"
                  placeholder="Enter Buy Date..."
                  auto-apply
                  v-model="form.buyDate"
                ></VueDatePicker>
              </v-col>
              <v-col cols="12">
                <span>Sell Date</span>
                <VueDatePicker
                  :enable-time-picker="false"
                  class="mt-2"
                  input-class-name="dp-custom-input"
                  auto-apply
                  teleport-center
                  placeholder="Enter Sell Date..."
                  v-model="sellDate"
                ></VueDatePicker>
              </v-col>
              <v-col cols="12">
                <span
                  >Quantity
                  <span class="text-red font-weight-bold">*</span></span
                >
                <q-input class="mt-2" outlined color="indigo" type="number" v-model="quantity" />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="mb-2">
          <v-spacer></v-spacer>
          <v-btn
            :disabled="validateHolding"
            style="background-color: #377dff; color: white"
            @click="addStock()"
            class="py-6 d-flex align-center mr-6 mb-2"
          >
            <span>+ Add Holding</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </q-dialog>

    <v-dialog v-model="addAccountDialog" width="620">
      <v-card>
        <v-card-title>
          <span class="text-h5">New Account</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Account Name"
                  v-model="accountName"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="['USD', 'SGR']"
                  v-model="selectedCurrency"
                  label="Select Currency"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="mb-2">
          <v-spacer></v-spacer>
          <v-btn
            style="background-color: #377dff; color: white"
            @click="addAccountDialog = false"
          >
            + Add Account
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="clearFields('new-account')"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-breadcrumbs class="px-0" :items="items" />

    <div class="py-4">
      <v-row no-gutters="true" align="center">
        <v-col>
          <span class="text-h3 font-weight-bold"
            >${{ totalInvestment ? totalInvestment : "1,521,532" }}</span
          >
        </v-col>
        <v-col class="d-flex justify-end">
          <v-btn
            @click="addHoldingDialog = true"
            class="py-6 d-flex align-center"
            style="background-color: #377dff; color: white"
          >
            <span>+ Add Holding</span>
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <div class="d-flex justify-start">
      <v-tabs v-model="tab" color="indigo-accent-2" align-tabs="center">
        <v-tab class="mr-2">Summary</v-tab>
        <v-tab class="mr-2">Arif</v-tab>
        <v-tab @click="addAccountDialog = true" class="mr-2"
          >+ Add Account</v-tab
        >
      </v-tabs>
    </div>
    <v-divider></v-divider>

    <v-sheet
      border="sm"
      class="d-flex flex-row my-10 rounded-lg"
      color="grey-lighten-5"
    >
      <v-row class="px-6">
        <v-col class="d-flex flex-column py-10">
          <span class="text-uppercase mb-2 text-grey text-subtitle-2"
            >portfolio yield</span
          >
          <span style="text-decoration: underline; text-decoration-color: #64FCD9; text-decoration-thickness: 4px; text-underline-offset: 4px;" class="font-weight-bold text-h6">{{
            portfolioYield ? portfolioYield : "2.11%"
          }}</span>
        </v-col>
        <v-divider class="mt-8" thickness="2" length="80" vertical></v-divider>
        <v-col class="d-flex flex-column py-10">
          <span class="text-uppercase mb-2 text-grey text-subtitle-2"
            >yield on cost</span
          >
          <span style="text-decoration: underline; text-decoration-color: #64FCD9; text-decoration-thickness: 4px; text-underline-offset: 4px;" class="font-weight-bold text-h6">{{
            yieldOnCost ? yieldOnCost : "5%"
          }}</span>
        </v-col>
        <v-divider class="mt-8" thickness="2" length="80" vertical></v-divider>
        <v-col class="d-flex flex-column py-10">
          <span class="text-uppercase mb-2 text-grey text-subtitle-2"
            >annual income</span
          >
          <span style="text-decoration: underline; text-decoration-color: #64FCD9; text-decoration-thickness: 4px; text-underline-offset: 4px;" class="font-weight-bold text-h6"
            >${{ annualIncome ? annualIncome : "30,570" }}</span
          >
        </v-col>
        <v-divider class="mt-8" thickness="2" length="80" vertical></v-divider>
        <v-col class="d-flex flex-column py-10">
          <span class="text-uppercase mb-2 text-grey text-subtitle-2"
            >portfolio beta</span
          >
          <span style="text-decoration: underline; text-decoration-color: #64FCD9; text-decoration-thickness: 4px; text-underline-offset: 4px;" class="font-weight-bold text-h6">{{
            portfolioBeta ? portfolioBeta : "2.11%"
          }}</span>
        </v-col>
      </v-row>
    </v-sheet>

    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search Holdings"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="desserts"
        item-value="name"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn
            class="mr-2"
            @click="editItem(item.raw)"
            size="small"
            icon="mdi-pencil"
          >
          </v-btn>
          <v-btn @click="deleteItem(item.raw)" size="small" icon="mdi-delete">
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-card class="my-10 mx-auto">
      <div class="py-4 ml-5">
        <span class="my-10 font-weight-medium">Expected Dividends</span>
      </div>

      <v-divider></v-divider>
      <div>
        <apexchart
          width="500"
          type="bar"
          :options="options"
          :series="series"
        ></apexchart>
      </div>
    </v-card>

    <v-snackbar v-model="notification">
      Holding added
      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import { useStockStore } from "../stores/stocks";
const store = useStockStore();
import { useUserStore } from "../stores/users";
const userStore = useUserStore();

export default {
  data() {
    return {
      stockOptions: "",
      tab: null,
      notification: false,
      options: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ],
      addHoldingDialog: false,
      addAccountDialog: false,
      accountName: "",
      loadingOnClick: false,
      selectedCurrency: "",
      shares: "",
      form: {
        symbol: "",
        buyDate: "",
        sellDate: "",
        quantity: "",
      },
      items: [
        {
          title: "Home",
          disabled: false,
          href: "/",
        },
        {
          title: "Dashboard",
          disabled: true,
          href: "dashboard",
        },
      ],
      search: "",
      itemsPerPage: 10,
      headers: [
        {
          title: "Ticker",
          align: "start",
          key: "ticker",
        },
        { title: "Shares", align: "end", key: "shares" },
        { title: "Price", align: "end", key: "price" },
        { title: "Change", align: "end", key: "change" },
        { title: "Average Cost", align: "end", key: "averageCost" },
        { title: "Profit/Loss", align: "end", key: "profitLoss" },
        { title: "Dividend Yield", align: "end", key: "dividendYield" },
        { title: "Yield On Cost", align: "end", key: "yieldOnCost" },
        { title: "Annual Income", align: "end", key: "annualIncome" },
        { title: "Actions", align: "end", key: "actions", sortable: false },
      ],
    };
  },
  methods: {
    filterFn(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.stockOptions = this.getStocks.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    triggerLoading() {
      this.loadingOnClick = true;
    },
    clearFields(type) {
      if (type === "new-account") {
        this.accountName = "";
        this.selectedCurrency = "";
        this.tab = this.tab - 1;
        this.addAccountDialog = false;
      }

      if (type === "new-holding") {
        this.form.symbol = "";
        this.form.quantity = "";
        this.form.sellDate = "";
        this.form.buyDate = "";
        this.addHoldingDialog = false;
      }
    },
    addStock() {
      this.addHoldingDialog = false;
      this.notification = true;
    },
  },
  computed: {
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
    validateHolding() {
      if (this.form.symbol === "") {
        return true;
      }

      if (this.form.buyDate === "") {
        return true;
      }

      if (this.quantity === "") {
        return true;
      }

      return false;
    },
  },
  mounted() {
    store.fetchStocks().then(() => {
      this.stockOptions = store.getStocks;
    });
    store.fetchHoldings(userStore.getToken).then(() => {
      // this.stockOptions = store.getHoldings;
      console.log(store.getHoldings)
    });
  },
  created() {
    document.title = "Dashboard | MyDividend";
  },
};
</script>

<style>
.active {
  color: #377dff;
}

.dp-custom-input {
  padding-top: 15px;
  padding-bottom: 15px;
  border: 1px solid grey;
  background-color: white;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.v-input__control {
  border-top: 1px solid grey;
  border-left: 1px solid grey;
  border-right: 1px solid grey;
} 

.text-indigo-accent-2 {
  color: #64FCD9 !important;
}

</style>
