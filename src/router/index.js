// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: About,
  // },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import('@/views/Dashboard.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
