// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import('@/views/Home.vue')
  },
  {
    path: "/dividend-calculator",
    name: "dividendCalculator",
    component: () => import('@/views/DividendCalculator.vue')
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import('@/views/Dashboard.vue')
  },
  {
    path: "/stock/:symbol",
    name: "stockDetail",
    component: () => import('@/views/StockDetail.vue'),
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
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})


export default router
