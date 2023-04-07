<template>
  <v-container class="px-0 py-0 h-screen" fluid>
  <Navbar type="homepage" />

  <v-app style="padding-left: 100px; padding-right: 100px;">

    <v-row class="mt-16">
      <v-col style="height: 550px;" class="d-flex flex-column justify-between">

        <span style="color: rgba(13, 37, 53, 0.7); font-weight: 600; font-size: 24px;">Lorem ipsum dolor sit amet,</span>

        <span style="color: #377DFF; font-size: 60px; font-weight: 800;">Aliquam mollis odio Sed varius tempor.</span>

        <span style="color: #7E8E99; font-weight: 400; font-size: 20px;">Interdum et malesuada fames ac ante ipsum
primis in faucibus. Phasellus et ex rutrum</span>

        <div style="width: 350px;" class="d-flex justify-between">

          <v-btn
            style="background-color: #377dff; color: white"
            @click="addStock()"
            class="py-6 d-flex align-center mr-6 mb-2"
          >
            <span>Get Started ></span>
          </v-btn>

          <v-btn
            @click="addStock()"
            color="blue"
            variant="outlined"
            class="py-6 d-flex align-center mr-6 mb-2"
          >
            <span>Stock Screener</span>
          </v-btn>

        </div>

      </v-col>

      <v-col class="d-flex justify-end">
        <div>
          <v-img :width="620" src="../assets/hero.png" ></v-img>
        </div>

      </v-col>

    </v-row>

  </v-app>

</v-container>
 </template>
 
 <script setup>
   import Navbar from '@/components/Navbar.vue'

 </script>
 