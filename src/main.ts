import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

import prototype from './plugins/prototype'
import electron from '@/plugins/electron'

import '@/plugins/db'
import '@/plugins/platform'
import '@/plugins/filter'
import '@/plugins/components'
import '@/assets/style/app/index.styl'

// @ts-ignore
import Transitions from 'vue2-transitions'

Vue.use(Transitions)

Vue.use(prototype)
Vue.use(electron)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
