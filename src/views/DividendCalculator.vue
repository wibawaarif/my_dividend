<template>
<v-container class="px-0 py-0 h-screen" fluid>
  <Navbar type="homepage" />
  <v-app style="padding-left: 100px; padding-right: 100px;">

   <div class="mt-10">

         <span style="font-size: 40px;">Calculate Your Dividend Income</span>

         <div class="d-flex justify-between w-auto mb-6 mt-6" style="width: 400px">
            <div style="width: 420px;">
            <span>Starting Principal ($)</span>
            <q-input
              class="mt-2 mb-2"
              filled
            >
            </q-input>
         </div>

         <div style="width: 420px;">
            <span>Monthly Contribution ($)</span>
            <q-input
              class="mt-2 mb-2"
              filled
            >
            </q-input>
         </div>

         <div style="width: 420px;">
            <span>Dividend Growth Rate (%)</span>
            <q-input
              class="mt-2 mb-2"
              filled
            >
            </q-input>
         </div>

         </div>        

         <div class="d-flex justify-between w-auto mb-6 mt-6" style="width: 400px">
            <div style="width: 420px;">
               <span>Annual Dividend Yield (%)</span>
            <q-input
              class="mt-2 mb-2"
              filled
            >
            </q-input>
         </div>

         <div style="width: 420px;">
            <span>Maximum Dividend Yield (%)</span>
            <q-input
              class="mt-2 mb-2"
              filled
            >
            </q-input>
         </div>

         <div style="width: 420px;">
            <span>Annual Share Price Growth (%)</span>
            <q-input
              class="mt-2 mb-2"
              filled
            >
            </q-input>
         </div>
         
         </div>        
         
         <div class="d-flex w-auto mb-6 mt-6" style="width: 400px">
            <div style="width: 420px;">
               <span>Number of Years</span>
            <q-input
              class="mt-2 mb-2"
              filled
            >
            </q-input>
         </div>
         
         </div>        

         <div class="d-flex w-100 justify-center mt-12">
            <div class="w-25" style="max-width: 400px;">
         <v-btn
            block
            style="background-color: #377dff; color: white"
            elevation="8"
            size="x-large"
            class="py-8 d-flex align-center"
          >
            <span>Calculate</span>
          </v-btn>
         </div>
         </div>



   </div>


</v-app>
</v-container>
</template>

<script>
   import Navbar from '@/components/Navbar.vue'
   export default {
      components: {
         Navbar
      },
      
   }
</script>

<style>

</style>