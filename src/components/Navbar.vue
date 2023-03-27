<template>
<v-app>
   <v-app-bar app dark flat class="px-12">
      <v-btn >
        <v-icon color="yellow" left class="mr-2">fas fa-signature</v-icon> MyDividend
      </v-btn>
      
  
      <v-spacer></v-spacer>
      <v-btn text @click="scroll('home')" class="text-yellow">Dashboard</v-btn>
      <v-btn text @click="scroll('about')"  >Upcoming Dividends</v-btn>
    </v-app-bar>
</v-app>
</template>

<script>
 export default {
    methods: {
      scroll(refName) {
        const element = document.getElementById(refName);
        element.scrollIntoView({ behavior: "smooth" });
      },
    },
  };
</script>
