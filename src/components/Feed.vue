<template>
<v-app class="px-lg-16 px-2">
    <v-breadcrumbs class="px-0" :items="items" />

    <div class="py-4">
    <v-row no-gutters="true" align="center">
      <v-col>
        <span class="text-h3 font-weight-bold">${{ totalInvestment ? totalInvestment : 1521532 }}</span>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn class="py-6 d-flex align-center" style="background-color: #377DFF; color: white">
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
      <v-tab class="px-0" :value="1">Landscape</v-tab>
      <v-tab class="px-0" :value="2">City</v-tab>
      <v-tab class="px-0" :value="3">Abstract</v-tab>
    </v-tabs>
  </div>
</v-app>
 </template>
 
 <script>
 export default {
   data() {
     return {
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
     };
   },
   methods: {},
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
 