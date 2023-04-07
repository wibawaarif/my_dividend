<template>
  <v-container class="px-0 py-0" fluid>
  <Navbar type="dashboard" />
  <Feed />
</v-container>
</template>

<script setup>
  import Navbar from '@/components/Navbar.vue'
  import Feed from '@/components/Feed.vue'
</script>
