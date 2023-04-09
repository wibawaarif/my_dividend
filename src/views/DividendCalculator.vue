<template>
  <v-container class="px-0 py-0 h-screen" fluid>
    <Navbar type="homepage" />
    <v-app style="padding-left: 100px; padding-right: 100px">
      <div class="mt-10">
        <span style="font-size: 40px; color: rgba(13, 37, 53, 0.8)"
          >Calculate Your Dividend Income</span
        >
        <div
          class="d-flex justify-between w-auto mb-6 mt-6"
          style="width: 400px"
        >
          <div style="width: 420px">
            <span
              style="
                font-weight: 500;
                font-size: 16px;
                color: rgba(13, 37, 53, 0.8);
              "
              >Starting Principal ($)</span
            >
            <q-input
              v-model="startingPrincipal"
              class="mt-2 mb-2"
              outlined
              type="number"
            >
            </q-input>
          </div>

          <div style="width: 420px">
            <span
              style="
                font-weight: 500;
                font-size: 16px;
                color: rgba(13, 37, 53, 0.8);
              "
              >Monthly Contribution ($)</span
            >
            <q-input
              v-model="monthlyContribution"
              class="mt-2 mb-2"
              outlined
              type="number"
            >
            </q-input>
          </div>

          <div style="width: 420px">
            <span
              style="
                font-weight: 500;
                font-size: 16px;
                color: rgba(13, 37, 53, 0.8);
              "
              >Dividend Growth Rate (%)</span
            >
            <q-input
              v-model="divGrowthRate"
              class="mt-2 mb-2"
              outlined
              type="number"
            >
            </q-input>
          </div>
        </div>

        <div
          class="d-flex justify-between w-auto mb-6 mt-6"
          style="width: 400px"
        >
          <div style="width: 420px">
            <span
              style="
                font-weight: 500;
                font-size: 16px;
                color: rgba(13, 37, 53, 0.8);
              "
              >Annual Dividend Yield (%)</span
            >
            <q-input
              v-model="annualDivYield"
              class="mt-2 mb-2"
              outlined
              type="number"
            >
            </q-input>
          </div>

          <div style="width: 420px">
            <span
              style="
                font-weight: 500;
                font-size: 16px;
                color: rgba(13, 37, 53, 0.8);
              "
              >Maximum Dividend Yield (%)</span
            >
            <q-input
              v-model="maxDivYield"
              class="mt-2 mb-2"
              outlined
              type="number"
            >
            </q-input>
          </div>

          <div style="width: 420px">
            <span
              style="
                font-weight: 500;
                font-size: 16px;
                color: rgba(13, 37, 53, 0.8);
              "
              >Annual Share Price Growth (%)</span
            >
            <q-input
              v-model="annualGrowth"
              class="mt-2 mb-2"
              outlined
              type="number"
            >
            </q-input>
          </div>
        </div>

        <div class="d-flex w-auto mb-6 mt-6" style="width: 400px">
          <div style="width: 420px">
            <span
              style="
                font-weight: 500;
                font-size: 16px;
                color: rgba(13, 37, 53, 0.8);
              "
              >Number of Years</span
            >
            <q-input
              v-model="numberOfYears"
              class="mt-2 mb-2"
              outlined
              type="number"
            >
            </q-input>
          </div>
        </div>

        <div class="d-flex w-100 justify-center mt-12">
          <div class="w-25" style="max-width: 400px">
            <v-btn
              block
              style="background-color: #377dff; color: white"
              elevation="8"
              size="x-large"
              class="py-8 d-flex align-center"
              @click="calculate()"
            >
              <span>Calculate Returns</span>
            </v-btn>
          </div>
        </div>

        <div v-if="showCalculation" class="w-100 d-flex justify-center mt-12">
          <div class="w-75">
            <span
              style="
                color: rgba(13, 37, 53, 0.8);
                font-weight: 500;
                font-size: 18px;
              "
              >The dividend returns earned from investing ${{
                startingPrincipal
              }}
              for {{ numberOfYears }} years at a compounded rate of
              {{ divGrowthRate }}% and a dividend yield of {{ annualDivYield }}%
              are shown below.</span
            >
            <q-table
              v-model:pagination="pagination"
              :rows-per-page-options="[0]"
              class="mt-6 mb-12"
              row-key="index"
              :rows="dividendCalculation"
              no-data-label="Data Not Available"
              :columns="columns"
            />
          </div>
        </div>
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
      showCalculation: false,
      dividendCalculation: [],
      startingPrincipal: 0,
      monthlyContribution: 0,
      annualDivYield: 0,
      annualGrowth: 0,
      numberOfYears: 0,
      maxDivYield: 0,
      divGrowthRate: 0,
      pagination: {
        rowsPerPage: 0,
      },
      columns: [
        {
          name: "year",
          label: "Year",
          field: "year",
          align: "left",
          headerStyle: "font-size: 16px",
        },
        {
          name: "yield",
          label: "Yield",
          field: "yield",
          align: "left",
          headerStyle: "font-size: 16px",
        },
        {
          name: "current",
          label: "Current Year's Dividend",
          field: "current",
          align: "left",
          headerStyle: "font-size: 16px",
        },
        {
          name: "total",
          label: "Total Dividends",
          field: "total",
          align: "left",
          headerStyle: "font-size: 16px",
        },
        {
          name: "totalValue",
          field: "totalValue",
          label: "Total Value",
          align: "left",
          headerStyle: "font-size: 16px",
        },
      ],
    };
  },
  methods: {
    calculate() {
      this.showCalculation = true;
      let yieldValue = 0;
      for (let i = 0; i < this.numberOfYears; i++) {
        yieldValue +=
          Number(this.annualDivYield) * (Number(this.divGrowthRate) / 100);
        this.dividendCalculation.push({
          year: i + 1,
          yield: yieldValue,
          current: this.divGrowthRate,
          total: this.divGrowthRate + this.maxDivYield,
          totalValue: 100 * (10 * 1),
        });
      }
    },
  },
  created() {
    document.title = "Dividend Calculator | MyDividend";
  },
};
</script>

<style>
.q-table tbody td {
  font-size: 16px;
}

.q-table tbody td:first-child {
  font-weight: 700;
}
</style>
