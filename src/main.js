/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue';

// register pinia
import { createPinia } from 'pinia';

// register persited state
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// Composables
import { createApp } from 'vue';

import 'maz-ui/css/main.css';

import { Quasar } from 'quasar';

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';

// Import Quasar css
import 'quasar/src/css/index.sass';

// datepicker
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

// Plugins
import { registerPlugins } from '@/plugins';

// apex charts
import VueApexCharts from "vue3-apexcharts";

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.component('VueDatePicker', VueDatePicker);

app.use(Quasar);
app.use(pinia);
app.use(VueApexCharts);
registerPlugins(app)

app.mount('#app')
