import { createRouter, createWebHistory } from 'vue-router'
import MapView from '@/views/MapView.vue'
import QRCodeScan from '../views/QRCodeScan.vue'
import AboutView from '../views/AboutView.vue'
import TotalPointsView from '../views/TotalPointsView.vue'
import HomeView from '../views/HomeView.vue'
import FirstMurder from '../views/FirstMurder.vue'
import SecondMurder from '../views/SecondMurder.vue'
import ThirdMurder from '../views/ThirdMurder.vue'
import MurdererFound from '../views/MurdererFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',

    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/map',
      name: 'map',
      component: MapView,
    },
    {
      path: '/firstmurder',
      name: 'firstmurder',
      component: FirstMurder,
    },
    {
      path: '/secondmurder',
      name: 'secondmurder',
      component: SecondMurder,
    },
    {
      path: '/thirdmurder',
      name: 'thirdmurder',
      component: ThirdMurder,
    },
    {
      path: '/murdererfound',
      name: 'murdererfound',
      component: MurdererFound,
    },
  ],
})

export default router
