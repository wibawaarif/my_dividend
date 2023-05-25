<template>
  <div>
    <Navbar type="dashboard" />
    <v-app style="padding-left: 100px; padding-right: 100px">
      <v-breadcrumbs class="px-0" :items="items" />

      <div class="py-4">

          <span style="font-weight: 500; font-size: 32px;"
            >Upcoming Dividends</span
          >

      <div class="d-flex justify-start">
      <!-- <v-tabs v-model="tab" color="indigo-accent-2" align-tabs="center">
        <v-tab class="mr-2">Summary</v-tab>
        <v-tab class="mr-2">Arif</v-tab>
      </v-tabs> -->
    </div>

    <v-divider class="mt-3"></v-divider>
     

    <v-card class="my-10 mx-auto d-flex justify-center">
      <div style="width: 500px;" id="chart">
        <apexchart type="heatmap" height="350" :options="chartOptions" :series="series"></apexchart>
      </div>
      <!-- <div class="d-flex justify-center" >
      <calendar-heatmap style="width: 1000px;" tooltip-unit="dividends" :end-date="endDate" :values="values"/>
    </div> -->
    </v-card>

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
      <!-- <div v-else class="q-pa-md">
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
  </div> -->
    </v-card>

    <!-- <v-card class="my-10 mx-auto">
      <div style="height: 75px; width: 50%;" class="d-flex align-center px-6 justify-between">
         <span style="font-weight: 500; font-size: 18px;">Average: $90</span>
         <span style="font-weight: 500; font-size: 18px;">Highest: $184</span>
         <span style="font-weight: 500; font-size: 18px;">Lowest: 33</span>
         <span style="font-weight: 500; font-size: 18px;">Variance: 100%</span>
      </div>
    </v-card> -->

    </div>
    </v-app>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { CalendarHeatmap } from 'vue3-calendar-heatmap'

export default {
  components: {
    Navbar,
    CalendarHeatmap
  },
  data() {
    return {
      tab: null,
      items: [
        {
          title: "Home",
          disabled: false,
          href: "/",
        },
        {
          title: "Upcoming Dividends",
          disabled: true,
          href: "upcoming-dividends",
        },
      ],
      // options: {
      //   chart: {
      //     id: "vuechart-example",
      //   },
      //   xaxis: {
      //     categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      //   },
      // },
      series: [  {
      name: "Mon",
      data: this.generateData(9, {
        min: -30,
        max: 55
      })
    },
    {
      name: "Tue",
      data: this.generateData(9, {
        min: -30,
        max: 55
      })
    },
    {
      name: "Wed",
      data: this.generateData(9, {
        min: -30,
        max: 55
      })
    },
    {
      name: "Thu",
      data: this.generateData(9, {
        min: -30,
        max: 55
      })
    },
    {
      name: "Fri",
      data: this.generateData(9, {
        min: 0,
        max: 0
      })
    },
    {
      name: "Sat",
      data: this.generateData(9, {
        min: -30,
        max: 55
      })
    },
    {
      name: "Sun",
      data: this.generateData(9, {
        min: -30,
        max: 55
      })
    },
  ],
          chartOptions: {
            chart: {
              height: 350,
              type: 'heatmap',
            },
            dataLabels: {
              enabled: false
            },
            colors: ["#008FFB"],
            title: {
              text: 'HeatMap Chart (Single color)'
            },
          },
      headers: [
        {
          title: "Ticker",
          align: "start",
          key: "symbol",
        },
        { title: "Amount", align: "end", key: "amount" },
        { title: "Ex Date", align: "end", key: "exDate" },
        { title: "Record Date", align: "end", key: "recordDate" },
        { title: "Description", align: "end", key: "description", sortable: false },
      ],
      // series: [
      //   {
      //     name: "series-1",
      //     data: [30, 220, 70, 120, 49, 460, 70, 30],
      //   },
      // ],
    };
  },
  computed: {
    endDate() {
      const end = "2023-05-18"
      return end
    },
    values() {
      const value = [{
        count: 45, 
        date: "2023-05-16"
      }, {
        count: 30, 
        date: "2023-05-15"
      }]
      return value
    },
  },
  methods: {
    generateData(count, yrange) {
      var i = 0;
      var series = [];
      while (i < count) {
        var x = (i + 1).toString();
        var y =
          Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push({
          x: x,
          y: y
        });
        i++;
      }
  return series;
}
  },
  created() {
    document.title = "Upcoming Dividends | MyDividend";
  },
};
</script>

<style>
.vch__legend {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: end;
}

.vch__days__labels__wrapper {
  visibility: hidden;
}

</style>
