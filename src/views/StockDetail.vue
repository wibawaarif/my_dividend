<template>
   <v-container class="px-0 py-0" fluid>
    <Navbar type="homepage" />
   <h1>You're selecting stock : {{ $route.params.symbol }}</h1>
   <span v-if="selectedStockDetail">{{ selectedStockDetail }}</span>
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
  selectedStockDetail: null,
}
},
methods: {
},
computed: {

},
mounted() {
  store.fetchStockDetail(this.$route.params.symbol).then((data) => {
      this.selectedStockDetail = data.data.history
    });
},
created() {
 document.title = "Stock Detail | MyDividend";
}
}
 </script>
 