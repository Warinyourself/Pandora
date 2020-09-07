import Vue from 'vue'
import VueElectron from '@/plugins/electron'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

import prototype from './plugins/prototype'

import '@/plugins/components'
import '@/plugins/db'
import '@/assets/style/app/index.styl'

Vue.use(prototype)
Vue.use(VueElectron)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
