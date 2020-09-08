import { VueConstructor } from 'vue'

const userAgent = navigator.userAgent.toLowerCase()
const isElectron = userAgent.indexOf(' electron/') > -1
let electron: null | any

if (isElectron) {
  electron = window.require('electron')
}

export default {
  install: (Vue: VueConstructor) => {
    Object.defineProperties(Vue.prototype, {
      $electron: {
        get() {
          return electron
        }
      }
    })
  }
}
