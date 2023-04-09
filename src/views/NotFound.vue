<template>
   <v-container class="px-0 py-0 h-screen d-flex justify-center align-center" fluid>
   <div style="width: 500px; height: 500px;" class="d-flex flex-column justify-center align-center mb-16">
         <b-btn
        @click="this.$router.push('/')"
        v-ripple="false"
        variant="plain"
        style="cursor: pointer"
        class="d-inline-flex align-center mb-16 d-none d-xs-flex ml-lg-0 ml-14"
      >
        <v-img src="../assets/brand-logo.svg" width="75" height="45"></v-img>
        <span class="font-weight-medium text-h5">MyDividend</span>
      </b-btn>
         <span style="font-size: 64px;">404 Not Found</span>
         <div style="width: 300px;">

         <v-btn to="/" style="background-color: #377DFF; color: white" class="mt-5 py-7" block>
            <span style="text-transform: none; font-weight: 600; font-size: 16px;">Go Back</span>
         </v-btn>
         </div>
</div>
</v-container>
</template>

<script>
   export default {
      
   }
</script>

<style>

</style>