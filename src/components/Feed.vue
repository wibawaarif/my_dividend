<template>
  <v-app style="padding-left: 100px; padding-right: 100px;">
    <q-dialog v-model="errorDialog" position="top">
      <q-card style="width: 350px">
        <q-card-section>
          <div :class="[isError ? 'text-red' : 'text-green']" class="text-h6 text-bold">{{ isError ? 'Failed' : 'Success' }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ messages }}
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogDelete" width="700">
      <v-card>
        <v-card-title class="d-flex align-center justify-space-between pt-2">
          <span class="text-h5 ml-4">Delete Holding</span>
        
        </v-card-title>
        <v-card-text>
          <v-container>
            <span style="font-size: 18px;">Are you sure want to delete {{ selectedItemSymbol }} from holdings ?</span>
          </v-container>
        </v-card-text>
        <v-card-actions class="mb-2">
          <v-spacer></v-spacer>
          <v-btn
            @click="dialogDelete = false"
            color="blue-darken-4"
            variant="outlined"
            class="py-6 px-5 d-flex align-center mr-2 mb-2"
          >
            <span>Cancel</span>
          </v-btn>
          <v-btn
            style="background-color: #377dff; color: white"
            @click="confirmDelete()"
            class="py-6 px-5 d-flex align-center mr-6 mb-2"
          >
            <span>Confirm</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </q-dialog>
    <q-dialog @hide="clearFields('new-holding')" v-model="addHoldingDialog" width="620">
      <v-card>
        <v-card-title class="d-flex align-center justify-space-between pt-2">
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
              <v-col class="py-0" cols="12">
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
              <v-col class="py-1" cols="12">
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
              <v-col class="py-1" cols="12">
                <span>Sell Date</span>
                <VueDatePicker
                  :enable-time-picker="false"
                  class="mt-2"
                  input-class-name="dp-custom-input"
                  auto-apply
                  teleport-center
                  placeholder="Enter Sell Date..."
                  v-model="form.sellDate"
                ></VueDatePicker>
              </v-col>
              <v-col class="py-1" cols="12">
                <span
                  >Buy Price
                  <span class="text-red font-weight-bold">*</span></span
                >
                <q-input class="mt-2" outlined color="indigo" type="number" v-model="form.buyPrice" />
              </v-col>
              <v-col class="py-1" cols="12">
                <span
                  >Sell Price
                  <span class="text-red font-weight-bold">*</span></span
                >
                <q-input class="mt-2" outlined color="indigo" type="number" v-model="form.sellPrice" />
              </v-col>
              <v-col class="py-1" cols="12">
                <span
                  >Quantity
                  <span class="text-red font-weight-bold">*</span></span
                >
                <q-input class="mt-2" outlined color="indigo" type="number" v-model="form.quantity" />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="mb-2">
          <v-spacer></v-spacer>
          <v-btn
            :disabled="validateHolding"
            :loading="loading"
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

    <!-- <div class="d-flex justify-start">
      <v-tabs v-model="tab" color="indigo-accent-2" align-tabs="center">
        <v-tab class="mr-2">Summary</v-tab>
        <v-tab class="mr-2">Arif</v-tab>
        <v-tab @click="addAccountDialog = true" class="mr-2"
          >+ Add Account</v-tab
        >
      </v-tabs>
    </div> -->
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
        v-if="fetchLoading"
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="getholdings"
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
          <v-btn @click="deleteItem(item.raw.id, item.raw.symbol)" size="small" icon="mdi-delete">
          </v-btn>
        </template>
        <template v-slot:item.profitLoss="{ item }">
          <span :class="item.raw.profitLoss < 0 ? 'text-red' : 'text-green'">{{ item.raw.profitLoss }}</span>
        </template>
      </v-data-table>
      <div v-else class="q-pa-md">
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left" style="width: 150px">
            <q-skeleton animation="blink" type="text" />
          </th>
          <th class="text-right">
            <q-skeleton animation="blink" type="text" />
          </th>
          <th class="text-right">
            <q-skeleton animation="blink" type="text" />
          </th>
          <th class="text-right">
            <q-skeleton animation="blink" type="text" />
          </th>
          <th class="text-right">
            <q-skeleton animation="blink" type="text" />
          </th>
          <th class="text-right">
            <q-skeleton animation="blink" type="text" />
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="n in 5" :key="n">
          <td class="text-left">
            <q-skeleton animation="blink" type="text" width="85px" />
          </td>
          <td class="text-right">
            <q-skeleton animation="blink" type="text" width="50px" />
          </td>
          <td class="text-right">
            <q-skeleton animation="blink" type="text" width="35px" />
          </td>
          <td class="text-right">
            <q-skeleton animation="blink" type="text" width="65px" />
          </td>
          <td class="text-right">
            <q-skeleton animation="blink" type="text" width="25px" />
          </td>
          <td class="text-right">
            <q-skeleton animation="blink" type="text" width="85px" />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
    </v-card>

    <v-card v-if="fetchLoading" class="my-10 mx-auto">
      <div class="py-4 ml-5">
        <span class="my-10 font-weight-medium">Overall Dividend Growth</span>
      </div>

      <v-divider></v-divider>
      <div>
        <apexchart
          width="700"
          type="bar"
          :options="options"
          :series="series"
        ></apexchart>
      </div>
    </v-card>
      <div class="d-flex justify-center" v-else>
       <div style="width: 700px;" class="q-pa-md">
    <q-markup-table style="overflow: hidden;">
      <thead>
        <tr>
          <th class="text-left">
            <q-skeleton animation="blink" type="text" />
          </th>
          <th class="text-right">
            <q-skeleton animation="blink" type="text" />
          </th>
          <th class="text-right">
            <q-skeleton animation="blink" type="text" />
          </th>
          <th class="text-right">
            <q-skeleton animation="blink" type="text" />
          </th>
          <th class="text-right">
            <q-skeleton animation="blink" type="text" />
          </th>
          <th class="text-right">
            <q-skeleton animation="blink" type="text" />
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="n in 5" :key="n">
          <td class="text-left">
            <q-skeleton animation="blink" type="text" width="85px" />
          </td>
          <td class="text-right">
            <q-skeleton animation="blink" type="text" width="50px" />
          </td>
          <td class="text-right">
            <q-skeleton animation="blink" type="text" width="35px" />
          </td>
          <td class="text-right">
            <q-skeleton animation="blink" type="text" width="65px" />
          </td>
          <td class="text-right">
            <q-skeleton animation="blink" type="text" width="25px" />
          </td>
          <td class="text-right">
            <q-skeleton animation="blink" type="text" width="85px" />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</div>
  </v-app>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import { useStockStore } from "../stores/stocks";
import { useUserStore } from "../stores/users";
const store = useStockStore();
const userStore = useUserStore();

export default {
  data() {
    return {
      stockOptions: "",
      tab: null,
      selectedItemId: '',
      selectedItemSymbol: '',
      dialogDelete: false,
      holdings: [],
      loading: false,
      errorDialog: false,
      isError: false,
      fetchLoading: false,
      messages:"",
      options: {
        chart: {
              type: 'bar',
              height: 350,
              stacked: true,
              toolbar: {
                show: true
              },
              zoom: {
                enabled: true
              }
            },
            responsive: [{
              breakpoint: 480,
              options: {
                legend: {
                  position: 'bottom',
                  offsetX: -10,
                  offsetY: 0
                }
              }
            }],
            plotOptions: {
              bar: {
                horizontal: false,
                borderRadius: 10,
                dataLabels: {
                  total: {
                    enabled: true,
                    style: {
                      fontSize: '13px',
                      fontWeight: 900
                    }
                  }
                }
              },
            },
            xaxis: {
              categories: ['2021', '2022', '2023', '2024'],
            },
            legend: {
              position: 'right',
              offsetY: 40
            },
            colors: ['#0B0D0F', '#9371F0', '#31CFF3', '#4052EC', '#1D267D', '#5C469C', '#FFD95A', '#C07F00', '#19A7CE', '#088395', '#00FFCA', '#009FBD', '#FEFF86', '#FFB4B4', '#245953']
      },
      series: [],
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
        buyPrice: "",
        sellPrice: "",
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
          key: "symbol",
        },
        { title: "Shares", align: "end", key: "quantity" },
        { title: "Buy Price", align: "end", key: "buyPrice" },
        { title: "Sell Price", align: "end", key: "sellPrice" },
        { title: "Profit/Loss (%)", align: "end", key: "profitLoss" },
        { title: "Total Dividend", align: "end", key: "totalDividend" },
        { title: "Buy Date", align: "end", key: "buyDate" },
        { title: "Sell Date", align: "end", key: "sellDate" },
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
    deleteItem(id, symbol) {
      this.selectedItemId = id;
      this.selectedItemSymbol = symbol;
      this.dialogDelete = true;
    },
    confirmDelete() {
      store.deleteHoldings(this.selectedItemId, userStore.getToken).then(() => {
        this.isError = false;
        this.errorDialog = true;
        this.messages = 'Successfully deleted holding'
        this.loading = false
        setTimeout(() => {
          this.errorDialog = false
        }, 3000) 
    })
      .catch(() => {
        this.isError = true;
        this.errorDialog = true;
        this.messages = 'Failed to delete holding'
        this.loading = false
        setTimeout(() => {
          this.errorDialog = false
        }, 3000) 
      })
      this.dialogDelete = false;
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
        this.form.buyPrice = "";
        this.form.sellPrice = "";
        this.addHoldingDialog = false;
      }
    },
    async addStock() {
      this.isError = false;
      this.messages = '';
      this.loading = true;
      const res = await store.saveHoldings(this.form, userStore.getToken)
      if (res.data.status === 'failed') {
        this.isError = true;
        this.errorDialog = true;
        this.messages = res.data.errMessage
        this.loading = false
        setTimeout(() => {
          this.errorDialog = false
        }, 3000)
        return
      }
      await store.fetchHoldings(userStore.getToken)
      this.isError = false;
      this.loading = false
      this.addHoldingDialog = false;
      this.errorDialog = true;
      this.messages = "Holdings saved successfully"
      store.fetchHoldings(userStore.getToken).then(() => {
        this.holdings = store.getHoldings;
        this.fetchLoading = true;
        setTimeout(() => {
          this.errorDialog = false
        }, 3000)
        }).catch(() => {
          localStorage.clear();
          this.$router.push('/register');
        })
    },
  },
  computed: {
    getStocks() {
      return store.getStocks;
    },
    getholdings() {
      const holdings = store.getHoldings.map(x => {
        return {
          id: x.id,
          totalDividend: x.totalDividend,
          symbol: x.symbol,
          buyPrice: x.buyPrice,
          sellPrice: x.sellPrice,
          buyDate: new Date(x.buyDate).toLocaleDateString(),
          sellDate: new Date(x.sellDate).toLocaleDateString(),
          quantity: x.quantity, 
          profitLoss: `${Math.round((((x.sellPrice - x.buyPrice) / x.buyPrice * 100) + Number.EPSILON) * 100)  / 100}`,
        }
      })
      return holdings
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
    if (!localStorage.getItem('holdings')) {
      store.fetchHoldings(userStore.getToken).then(() => {

      this.holdings = store.getHoldings;
      this.fetchLoading = true;
    }).catch(() => {
        localStorage.clear();
        this.$router.push('/register');
    })
    } else {
      this.holdings = localStorage.getItem('holdings');
      this.fetchLoading = true;
    }

     // using dummy data
     const data = {
          2021: {
            amount: 5000,
            amountBySymbol: {
              HCLTECH: 5000,
              ASHOKLEY: 888
            },
          },
          2022: {
            amount: 24700,
            amountBySymbol: {
              HCLTECH: 24000,
              ASHOKLEY: 100,
              WIPRO: 600,
            },
          },
            2023: {
            amount: 24700,
            amountBySymbol: {
              AHOKL: 2512,
              WIPRO: 102,
            },
          },
              2024: {
            amount: 24700,
            amountBySymbol: {
              ASHOKLEY: 999,
            },
          },
        };

        const toArray = Object.entries(data);
        const result = [];

        for (let i = 0; i < toArray.length; i++) {
          for (let [a, s] of Object.entries(toArray[i][1].amountBySymbol)) {
            result.push({
              name: a,
              data: [s],
              year: [toArray[i][0]]
            });
          }
        }

        const years = Object.keys(data)

        const uniqueKeys = {};

        for (let i = 0; i < result.length; i++) {
          const currentObj = result[i];
          
          if (uniqueKeys[currentObj.name]) {
            uniqueKeys[currentObj.name].data.push(...currentObj.data);
            uniqueKeys[currentObj.name].year.push(...currentObj.year);

            result.splice(i,1);
            i--;
            continue;
          }

          uniqueKeys[currentObj.name] = currentObj;
        }

        result.map((item,) => {
            for(let i of years) {
                if (!item.year.includes(i)) {
                    item.year.splice(years.indexOf(i), 0, null)
                }
            }
            delete item["year"]
        })
      
      this.series = result;
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
