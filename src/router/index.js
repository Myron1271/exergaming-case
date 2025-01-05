import { createRouter, createWebHistory } from 'vue-router'
import MapView from '@/views/MapView.vue'
import QRCodeScan from '../views/QRCodeScan.vue'
import AboutView from '../views/AboutView.vue'
import TotalPointsView from '../views/TotalPointsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/map',

    },
    {
      path: '/map',
      name: 'map',
      component: MapView,
    },
    {
      path: '/qrcodescan',
      name: 'qrcodescan',
      component: QRCodeScan,
    },
    /* {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView,
    }, */
    {
      path: '/totalpoints',
      name: 'totalpoints',
      component: TotalPointsView,
    },
  ],
})

export default router
