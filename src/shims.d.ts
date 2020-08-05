import Vue, { VNode } from 'vue'
import { Framework } from 'vuetify'
import { _DB } from '@/controller/db'
// import { AninateOptions, IIsNeedRequestOptions } from '@/plugins/handler'

// declare module '*.vue' {
//   export default Vue
// }

declare module 'vue/types/vue' {
  export interface Vue {
    $vuetify: Framework
    $db: _DB
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VUE_APP_BASE_URL: string
      VUE_APP_IO_URL: string
      VUE_APP_I18N_LOCALE: 'en' | 'ru'
      VUE_APP_I18N_FALLBACK_LOCALE: 'en' | 'ru'
    }
  }
}
