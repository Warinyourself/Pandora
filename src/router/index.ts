import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/box',
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
    name: 'BoxEdit',
    component: () => import('../views/box/Edit.vue')
  },
  {
    path: '/palette',
    name: 'Palette',
    component: () => import('../views/palette/Palette.vue')
  },
  {
    path: '/palette/create',
    name: 'PaletteCreate',
    component: () => import('../views/palette/PaletteCreate.vue')
  },
  {
    path: '/palette/:id',
    name: 'PaletteEdit',
    component: () => import('../views/palette/PaletteEdit.vue')
  },
  {
    path: '/commands',
    name: 'Commands',
    component: () => import('../views/Commands.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
