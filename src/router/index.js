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
    path: "/pricing",
    name: "pricing",
    component: () => import('@/views/Pricing.vue')
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import('@/views/Dashboard.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next();
        return
      }

      router.push({
        name: 'register',
      })
    }
  },
  {
    path: "/upcoming-dividends",
    name: "upcomingDividends",
    component: () => import('@/views/UpcomingDividend.vue')
  },
  {
    path: "/stock/:symbol",
    name: "stockDetail",
    component: () => import('@/views/StockDetail.vue'),
  },
  {
    path: "/register",
    name: "register",
    component: () => import('@/views/Register.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        router.push({
          name: 'home'
        })
        return
      }
      next();
    }
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
