import { createRouter, createWebHistory } from 'vue-router'
import MapView from '@/views/MapView.vue'
import HomeView from '../views/HomeView.vue'
import AccountView from '..//views/AccountView.vue'
import FirstMurder from '../views/FirstMurder.vue'
import SecondMurder from '../views/SecondMurder.vue'
import ThirdMurder from '../views/ThirdMurder.vue'
import MurdererFound from '../views/MurdererFound.vue'
import IonicVueView from '@/views/IonicVueView.vue'

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
      meta: {
        hideNav: true,
      }
    },
    {
      path: '/map',
      name: 'map',
      component: MapView,
      meta: {
        hideButton: true,
      }
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
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
    {
      path: '/ionicvue',
      name: 'ionicvue',
      component: IonicVueView,
      meta: {
        hideNav: true,
        hideButton: true,
      }
    },
  ],
})

export default router
