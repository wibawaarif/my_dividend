// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import('@/views/Home.vue')
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import('@/views/Dashboard.vue')
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('@/views/Login.vue')
  },
  {
    path: "/register",
    name: "Register",
    component: () => import('@/views/Register.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
