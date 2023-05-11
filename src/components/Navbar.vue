<template>
  <v-app style="height: 6rem;">
    <v-app-bar flat style="z-index: 0; position: relative; padding-left: 100px; padding-right: 100px;" class="py-2">
      <v-app-bar-nav-icon
        @click="drawer = true"
        class="d-flex d-sm-none"
      ></v-app-bar-nav-icon>
      <b-btn
        @click="this.$router.push('/')"
        v-ripple="false"
        variant="plain"
        style="cursor: pointer"
        class="d-inline-flex align-center d-none d-xs-flex ml-lg-0 ml-14"
      >
        <v-img src="../assets/brand-logo.svg" width="75" height="45"></v-img>
        <span class="font-weight-medium text-h5">MyDividend</span>
      </b-btn>
      <v-spacer></v-spacer>

      <div v-if="type === 'dashboard'" @click="home" class="d-none d-sm-flex align-center">
        <router-link class="mr-8" to="/dashboard" active-class="active"
          >Dashboard</router-link
        >
        <router-link class="mr-8" to="/upcoming-dividends" active-class="active"
          >Upcoming Dividends</router-link
        >
      </div>

      <div v-if="type === 'dashboard'">
        <v-menu transition="slide-y-transition">
          <template v-slot:activator="{ props }">
            <div class="d-none d-sm-flex align-center">
            <v-btn icon="mdi-account-outline" v-bind="props">
            </v-btn>
            <span>Arif Wibawa</span>
          </div>
          </template>
          <v-list>
            <v-list-item class="px-0">
              <v-btn variant="text" @click="">
                <v-icon>mdi-cog-outline</v-icon
                ><span class="ml-2">Settings</span>
              </v-btn>
            </v-list-item>
            <v-list-item class="px-0">
              <v-btn color="red" variant="text" @click="logout">
                <v-icon>mdi-logout</v-icon><span class="ml-2">Logout</span>
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <div v-if="type === 'homepage'" class="d-none d-sm-flex justify-center align-center">
        <router-link class="mr-8" to="/" active-class="active"
          >Home</router-link
        >
        <router-link class="mr-8" to="/pricing" active-class="active"
          >Pricing</router-link
        >
        <router-link class="mr-8" to="/dividend-calculator" active-class="active"
          >Dividend Calculator</router-link
        >

          <v-btn
            style="background-color: #377dff; color: white; text-decoration: none;"
            class="d-flex align-center py-5"
            to="/dashboard"
          >
            <span style="text-decoration: none; text-transform: none;">Dashboard</span>
          </v-btn>

      </div>

    </v-app-bar>
    <!-- Add a navigation bar -->
    <v-navigation-drawer
      style="top: 0; height: 100%"
      v-model="drawer"
      absolute
      temporary
      v-if="type === 'dashboard'"
    >
      <div class="d-flex align-center justify-center py-6">
        <v-btn icon>
          <v-icon>mdi-account-outline</v-icon>
        </v-btn>
        <span class="ml-4">Arif Wibawa</span>
      </div>
      <v-divider></v-divider>
      <div class="d-flex flex-column px-3 mt-6">
        <router-link class="mr-8 mb-2" to="/dashboard" active-class="active"
          ><v-icon>mdi-home</v-icon
          ><span class="ml-4">Dashboard</span></router-link
        >
        <router-link class="mr-8" to="/upcoming-dividends" active-class="active"
          ><v-icon>mdi-cash-multiple</v-icon
          ><span class="ml-4">Upcoming Dividends</span></router-link
        >
      </div>
    </v-navigation-drawer>
    <!-- Navigation bar ends -->
  </v-app>
</template>

<script>
import { useUserStore } from "../stores/users";
const userStore = useUserStore();
export default {
  props: {
    type: String,
  },
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    logout() {
      userStore.logout();
      localStorage.clear();
      this.$router.push({
        name: 'home'
      })
    }
  }
};
</script>

<style scoped>
.active {
  color: #377dff;
}

a {
  text-decoration: none;
  color: #68859c;
}

a:hover {
  text-decoration: underline;
}

.v-app-bar {
  border-bottom: 1px solid rgba(41, 61, 77, 0.3);
}
</style>
