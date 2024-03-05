import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/address',
      name: 'address',
      component: () => import('@/views/AddressView.vue')
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('@/views/PaymentView.vue')
    }
  ]
})

export default router
