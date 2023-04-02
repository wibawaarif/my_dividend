/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue';

// register pinia
import { createPinia } from 'pinia';

// Composables
import { createApp } from 'vue';

// datepicker
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

// Plugins
import { registerPlugins } from '@/plugins';

// apex charts
import VueApexCharts from "vue3-apexcharts";

const pinia = createPinia()
const app = createApp(App)

app.component('VueDatePicker', VueDatePicker);
app.use(pinia);
app.use(VueApexCharts);
registerPlugins(app)

app.mount('#app')
