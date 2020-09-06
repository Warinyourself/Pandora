import { VueConstructor } from 'vue'
// const electron = require('electron')
const electron = window.require('electron')

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
