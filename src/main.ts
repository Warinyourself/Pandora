import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'

import VueElectron from '@/plugins/electron'

Vue.use(VueElectron)

import '@/plugins/components'
import '@/plugins/db'
import '@/assets/style/app/index.styl'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
