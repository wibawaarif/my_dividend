<template>
<v-app class="px-lg-16 px-2">

  <v-dialog
      v-model="addHoldingDialog"
      width="620"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">New Holding</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
              <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  v-model="selectedAccount"
                  label="Select Account"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Ticker"
                  v-model="ticker"
                  hint="*Example: AAPL"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Shares"
                  v-model="shares"
                  hint="Enter # of Shares"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Cost per share"
                  v-model="costPerShare"
                  hint="Enter Cost Basis"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="mb-2">
          <v-spacer></v-spacer>
          <v-btn
            style="background-color: #377DFF; color: white"
            @click="addHoldingDialog= false"
          >
            + Add Holding
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="clearFields('new-holding')"
          >
            Close
        </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="addAccountDialog"
      width="620"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">New Account</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Account Name"
                  v-model="accountName"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
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
            style="background-color: #377DFF; color: white"
            @click="addAccountDialog= false"
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
        <span class="text-h3 font-weight-bold">${{ totalInvestment ? totalInvestment : '1,521,532' }}</span>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn @click="addHoldingDialog = true" class="py-6 d-flex align-center" style="background-color: #377DFF; color: white">
        <span>+ Add Holding</span>
      </v-btn>
      </v-col>
    </v-row>
  </div>
  
  <div class="d-flex justify-start">
    <v-tabs
      v-model="tab"
      color="indigo-accent-2"
      align-tabs="center"
    >
      <v-tab class="mr-2">Summary</v-tab>
      <v-tab class="mr-2">Arif</v-tab>
      <v-tab @click="addAccountDialog = true" class="mr-2">+ Add Account</v-tab>
    </v-tabs>
  </div>
  <v-divider></v-divider>

  <v-sheet border="sm" class="d-flex flex-row my-10 rounded-lg" color="grey-lighten-5">
    <v-row class="px-6">
    <v-col class="d-flex flex-column py-10">
      <span  class="text-uppercase mb-2 text-grey text-subtitle-2">portfolio yield</span>
      <span class="font-weight-bold text-h6">{{ portfolioYield ? portfolioYield : '2.11%' }}</span>
    </v-col>
    <v-divider class="mt-8" thickness="2" length="80" vertical></v-divider>
    <v-col class="d-flex flex-column py-10">
      <span class="text-uppercase mb-2 text-grey text-subtitle-2">yield on cost</span>
      <span class="font-weight-bold text-h6">{{ yieldOnCost ? yieldOnCost : '5%' }}</span>
    </v-col>
    <v-divider class="mt-8" thickness="2" length="80" vertical></v-divider>
    <v-col class="d-flex flex-column py-10">
      <span class="text-uppercase mb-2 text-grey text-subtitle-2">annual income</span>
      <span class="font-weight-bold text-h6">${{ annualIncome ? annualIncome : '30,570' }}</span>
    </v-col>
    <v-divider class="mt-8" thickness="2" length="80" vertical></v-divider>
    <v-col class="d-flex flex-column py-10">
      <span class="text-uppercase mb-2 text-grey text-subtitle-2">portofolio beta</span>
      <span class="font-weight-bold text-h6">{{ portfolioBeta ? portfolioBeta : '2.11%' }}</span>
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
      <v-btn class="mr-2" @click="editItem(item.raw)" size="small" icon="mdi-pencil">
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
  <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>
</div>
</v-card>

</v-app>
 </template>
 
 <script>
 import VueApexCharts from 'vue3-apexcharts'

 export default {
   data() {
     return {
      tab: null,
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }],
      addHoldingDialog: false,
      addAccountDialog: false,
      accountName: '',
      selectedCurrency: '',
      selectedAccount: '',
      shares: '',
      ticker: '',
      costPerShare: '',
      items: [
        {
          title: 'Home',
          disabled: false,
          href: '/',
        },
        {
          title: 'Dashboard',
          disabled: true,
          href: 'dashboard',
        },
      ],
      search: '',
      itemsPerPage: 10,
        headers: [
          {
            title: 'Ticker',
            align: 'start',
            key: 'ticker',
          },
          { title: 'Shares', align: 'end', key: 'shares' },
          { title: 'Price', align: 'end', key: 'price' },
          { title: 'Change', align: 'end', key: 'change' },
          { title: 'Average Cost', align: 'end', key: 'averageCost' },
          { title: 'Profit/Loss', align: 'end', key: 'profitLoss' },
          { title: 'Dividend Yield', align: 'end', key: 'dividendYield' },
          { title: 'Yield On Cost', align: 'end', key: 'yieldOnCost' },
          { title: 'Annual Income', align: 'end', key: 'annualIncome' },
          { title: 'Actions', align: 'end', key: 'actions', sortable: false },
        ],
        desserts: [
          {
            ticker: 'AAPL',
            shares: 100,
            price: 157,
            change: 0.63,
            averageCost: 154.40,
            profitLoss: 120,
            dividendYield: 0.21,
            yieldOnCost: 0.60,
            annualIncome: 184,
          },
          {
            ticker: 'BRK',
            shares: 100,
            price: 157,
            change: 0.63,
            averageCost: 154.40,
            profitLoss: 120,
            dividendYield: 0.21,
            yieldOnCost: 0.60,
            annualIncome: 184,
          },
        ],
     };
   },
   methods: {
    clearFields(type) {
      if (type === 'new-account') {
        this.accountName = '';
        this.selectedCurrency = '';
        this.tab = this.tab - 1;
        this.addAccountDialog = false;
      } 

      if (type === 'new-holding') {
        this.selectedAccount = '';
        this.shares = '';
        this.ticker = '';
        this.costPerShare = '';
        this.addHoldingDialog = false;
      } 

    }
   },
   computed: {},
   mounted() {},
   created() {
    document.title = 'Dashboard | MyDividend'
  },
 };
 </script>
 
 <style scoped>
 .active {
   color: #377dff;
 }

 </style>
 