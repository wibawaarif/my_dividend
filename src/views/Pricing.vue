<template>
  <v-container class="px-0 py-0" fluid>
    <Navbar type="homepage" />
    <div style="padding-left: 100px; padding-right: 100px;">
   <div class="d-flex flex-column justify-center text-center">
      <span style="font-weight: 800; font-size: 60px; color: rgba(13, 37, 53, 0.8);">Pay <span style="color:#64FCD9">Once</span>,<br/> Grow Your Dividend <span style="color: #64FCD9">Forever</span></span>
      <div class="d-flex justify-center mt-4">
         <v-btn @click="changeState('monthly')" :class="isYearly ? 'active-btn' :  'inactive-btn'" class="d-flex align-center py-6 px-7" style="background-color: #377DFF; color: white; border-radius: 10px;" >
            <span style="font-weight: 700; font-size: 16px; text-transform: none;">Monthly</span>
         </v-btn>
         <v-btn @click="changeState('yearly')" :class="isYearly ? 'inactive-btn'  : 'active-btn'" class="d-flex align-center py-6 px-7" style="border-radius: 10px; color: #377DFF;" variant="outlined">
            <span style="font-weight: 700; font-size: 16px; text-transform: none;">Yearly</span>
         </v-btn>
      </div>
      <div class="d-flex justify-center mt-4">
         <v-card
      color="grey-lighten-4"
        class="mt-6 mr-6"
        style="border-radius: 20px"
        width="375"
        height="475"
      >

      <div style="height: 150px;" class="d-flex flex-column justify-center mt-4">
         <span style="color: #64FCD9; font-size: 18px;">Free</span>
         <span style="font-size: 48px;">$0</span>
         <span style="font-size: 14px; color: rgba(199, 199, 199, 1);">per month</span>

      </div>

      <v-divider></v-divider>
   
      <div class="d-flex justify-center mt-4">
      <div style="width: 330px;" class="d-flex flex-column">
         <span style="text-align: left; font-size: 16px; color: rgba(121, 119, 119, 1)">Dividend Calculator</span>
         <span class="mt-2" style="text-align: left; font-size: 16px; color: rgba(121, 119, 119, 1)">Unlimited “Manual” Portofolios</span>
         <span class="mt-2" style="text-align: left; font-size: 16px; color: rgba(121, 119, 119, 1)"><span style="font-weight: 700;">One</span> Linked Account</span>
         <span class="mt-2" style="text-align: left; font-size: 16px; color: rgba(121, 119, 119, 1)">Basic Dividend Alerts</span>
         <span class="mt-2" style="text-align: left; font-size: 16px; color: rgba(121, 119, 119, 1)">Future Value Projections</span>
         <span class="mt-2" style="text-align: left; font-size: 16px; color: rgba(121, 119, 119, 1)">Diversification Analysis</span>

         <v-btn style="background-color: #377DFF; color: white" class="mt-5 py-7" block>
            <span style="text-transform: none; font-weight: 600; font-size: 16px;">Get Started</span>
         </v-btn>

      </div>
   </div>

      </v-card>

      <v-card
      color="grey-lighten-4"
        class="mt-6 mr-6"
        style="border-radius: 20px"
        width="375"
        height="475"
      >

      <div style="height: 150px;" class="d-flex flex-column justify-center mt-4">
         <span style="color: #377DFF; font-size: 18px;">Premium</span>
         <span style="font-size: 48px;">$9.99</span>
         <span style="font-size: 14px; color: rgba(199, 199, 199, 1);">per month</span>

      </div>

      <v-divider></v-divider>
   
      <div class="d-flex justify-center mt-4">
      <div style="width: 330px;" class="d-flex flex-column">
         <span style="text-align: left; font-size: 16px; color: rgba(121, 119, 119, 1)">Dividend <span style="font-weight: 700;">Screener</span></span>
         <span class="mt-2" style="text-align: left; font-size: 16px; font-weight: 700; color: rgba(121, 119, 119, 1)">No Advertisements</span>
         <span class="mt-2" style="text-align: left; font-weight: 700; font-size: 16px; color: rgba(121, 119, 119, 1)">Priority Support</span>
         <span class="mt-2" style="text-align: left; font-size: 16px; color: rgba(121, 119, 119, 1)">Personal Watchlist</span>
         <span class="mt-2" style="text-align: left; font-size: 16px; color: rgba(121, 119, 119, 1)">Dividend Idea List</span>
         <span class="mt-2" style="text-align: left; font-size: 16px; color: rgba(121, 119, 119, 1)"><span style="font-weight: 700;">Unlimited</span> Linked Accounts</span>

         <v-btn style="background-color: #377DFF; color: white" class="mt-5 py-7" block>
            <span style="text-transform: none; font-weight: 600; font-size: 16px;">Start Your Free Trial</span>
         </v-btn>

      </div>
   </div>

      </v-card>


      </div>



   </div>


      </div> 
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
      isYearly: false,
   }
  },
  methods: {
   changeState(type) {
      if (type === "yearly") {
         this.isYearly = true;
      }

      if (type === "monthly") {
         this.isYearly = false;
      }

   }
  },
  computed: {
   monthlyButton() {
      return this.isMonthly ? 'active-btn' : 'inactive-btn';
   },
   yearlyButton() {
      return this.isMonthly ? 'inactive-btn' : 'active-btn';
   }

  },
  created() {
    document.title = "Pricing | MyDividend";
  },
   }
</script>

<style lang="scss">

.active-btn {
   background-color: white !important;

   span {
      color: #377DFF !important;
   }
}

.inactive-btn {
   background-color: #377DFF !important;


   span {

      color: white !important;
   }
}


</style>