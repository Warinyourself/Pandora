import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/box/create',
    name: 'BoxCreate',
    component: () => import('../views/box/Create.vue')
  },
  {
    path: '/box/:id',
    name: 'Edit',
    component: () => import('../views/box/Edit.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue')
  },
  {
    path: '/palette',
    name: 'Palette',
    component: () => import('../views/Palette.vue')
  },
  {
    path: '/commands',
    name: 'Commands',
    component: () => import('../views/Commands.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
