import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/box'
  },
  {
    path: '/box',
    name: 'Box',
    component: () => import('../views/box/Box.vue')
  },
  {
    path: '/box/create',
    name: 'BoxCreate',
    component: () => import('../views/box/BoxCreate.vue')
  },
  {
    path: '/box/:id',
    name: 'BoxEdit',
    component: () => import('../views/box/BoxEdit.vue')
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
    path: '/command',
    name: 'Command',
    component: () => import('../views/command/Command.vue')
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
