// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import('@/views/Home.vue')
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import('@/views/Dashboard.vue')
  },
  {
    path: "/stock/:symbol",
    name: "stockDetail",
    component: () => import('@/views/StockDetail.vue')
  },
  {
    path: "/login",
    name: "login",
    component: () => import('@/views/Login.vue')
  },
  {
    path: "/register",
    name: "register",
    component: () => import('@/views/Register.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})


export default router
