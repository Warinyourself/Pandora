import { VueConstructor } from 'vue'
import { PageModule } from '@/store/page'

export default {
  install(Vue: VueConstructor) {
    Vue.prototype.$alert = PageModule.SHOW_NOTIFICATION
  }
}
