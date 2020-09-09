import Vue from 'vue'
import { Framework } from 'vuetify'
import { IDB } from '@/controller/db'

import { INotification, ElectronPlugin } from '@/models/page'

declare module 'vue/types/vue' {
  export interface Vue {
    $vuetify: Framework;
    $electron?: ElectronPlugin;
    $db: IDB;
    $alert: (notification: Partial<INotification>) => void;
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VUE_APP_BASE_URL: string;
      VUE_APP_IO_URL: string;
      VUE_APP_I18N_LOCALE: 'en' | 'ru';
      VUE_APP_I18N_FALLBACK_LOCALE: 'en' | 'ru';
    }
  }
}
