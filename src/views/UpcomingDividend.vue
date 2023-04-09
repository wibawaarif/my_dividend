<template>
  <v-container class="px-0 py-0" fluid>
    <Navbar type="dashboard" />
    <v-app style="padding-left: 100px; padding-right: 100px">
      <v-breadcrumbs class="px-0" :items="items" />

      <div class="py-4">

          <span style="font-weight: 500; font-size: 32px;"
            >Upcoming Dividends</span
          >

      <div class="d-flex justify-start">
      <v-tabs v-model="tab" color="indigo-accent-2" align-tabs="center">
        <v-tab class="mr-2">Summary</v-tab>
        <v-tab class="mr-2">Arif</v-tab>
      </v-tabs>
    </div>

    <v-divider></v-divider>


    <v-card class="my-10 mx-auto">
      <div class="py-4 ml-5">
        <span class="my-10 font-weight-medium">Expected Dividends</span>
      </div>

      <v-divider></v-divider>
      <div>
        <apexchart
         height="500"
          type="line"
          :options="options"
          :series="series"
        ></apexchart>
      </div>
    </v-card>

    <v-card class="my-10 mx-auto">
      <div style="height: 75px; width: 50%;" class="d-flex align-center px-6 justify-between">
         <span style="font-weight: 500; font-size: 18px;">Average: $90</span>
         <span style="font-weight: 500; font-size: 18px;">Highest: $184</span>
         <span style="font-weight: 500; font-size: 18px;">Lowest: 33</span>
         <span style="font-weight: 500; font-size: 18px;">Variance: 100%</span>
      </div>
    </v-card>

    </div>
    </v-app>
  </v-container>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Navbar,
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
          data: [30, 220, 70, 120, 49, 460, 70, 30],
        },
      ],
    };
  },
  created() {
    document.title = "Upcoming Dividends | MyDividend";
  },
};
</script>

<style lang="scss"></style>
