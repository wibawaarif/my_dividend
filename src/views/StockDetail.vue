<template>
   <v-container class="px-0 py-0" fluid>
    <Navbar type="homepage" />
    
   <div style="padding-left: 100px; padding-right: 100px;">

    <div class="d-flex justify-between mt-2">

      <div class="d-flex flex-column">
        <span style="font-size: 48px; font-weight: 500;">{{ $route.params.symbol }}</span>
        <span style="color: rgba(0, 0, 0, 0.6); font-size: 20px; font-weight: 500;">NSE: {{ $route.params.symbol }}</span>
      </div>

      <div class="d-flex align-end">
      <v-btn
            style="background-color: #377DFF; color: white;"
            to="/dashboard"
            class="d-flex align-center py-6 mb-2"
          >
            <span style="font-weight: 600">Add to Portfolio</span>
          </v-btn>
        </div>

    </div>

    <v-divider class="mt-4 mb-4" />

<div v-if="selectedStockDetail">
    <q-table
      row-key="index"
      title="Dividend History"
      :rows="selectedStockDetail"
      no-data-label="Data Not Available"
      :columns="columns"
    />

    <v-card v-if="selectedStockDetail.length > 0" width="500" class="my-10 mx-auto">
      <div class="py-4 ml-5">
        <span class="my-10 font-weight-medium">Ex Date</span>
      </div>

      <v-divider></v-divider>
      <div>
        <apexchart
          width="500"
          type="bar"
          :options="optionsChart"
          :series="seriesChart"
        ></apexchart>
      </div>
    </v-card>

    </div>

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

</div>
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
  options: {
        chart: {
          id: "Ex-date Chart",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
  selectedStockDetail: null,
  columns: [
    {
      name: 'index',
      label: 'No',
      field: 'index',
      align: 'left',
    },
    {
      name: 'currency',
      label: 'Currency',
      field: 'currency',
      align: 'left',
      sortable: true
    },
    {
      name: 'amount',
      label: 'Amount',
      field: 'amount',
      align: 'left',
      sortable: true
    },
    {
      name: 'exDate',
      label: 'Ex Date',
      field: 'exDate',
      align: 'left',
      sortable: true
    },
    {
      name: 'purpose',
      field: 'purpose',
      label: 'Detail',
      align: 'left',
    }
  ],
}
},
methods: {
},
computed: {
  optionsChart() {
    const grabYear = this?.selectedStockDetail.map((x, index) => {
      const dateParts = x.exDate.split("-");
      const year = dateParts[0];
      const month = dateParts[1];
      const formattedDate = `${month}-${year}`;

      return formattedDate;
    })

    const options =  {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: grabYear,
        },
      }
    return options;

    },
    seriesChart() {
      const grabAmount = this?.selectedStockDetail.map((x, index) => x.amount)
      const series = [
        {
          name: "amount",
          data: grabAmount,
        },
      ]

      return series;
    } 
},
mounted() {
  store.fetchStockDetail(this.$route.params.symbol).then((data) => {
      this.selectedStockDetail = data
    });
},
beforeCreate() {
  store.fetchStocks()
    .then(() => {
      const isValidSymbol = store.getStocks.includes(this.$route.params.symbol)
      if(!isValidSymbol) {
        return this.$router.push({name: 'NotFound'})
      }
    })
},
created() {
 document.title = "Stock Detail | MyDividend";
}
}
 </script>
 