import Vue, { VNode } from 'vue'
import { Framework } from 'vuetify'
import { IDB } from '@/controller/db'
import {
  WebFrame, Clipboard, ContextBridge, CrashReporter, DesktopCapturer, IpcRenderer, NativeImage, Remote, Shell
} from 'electron'

declare module 'vue/types/vue' {
  export interface Vue {
    $vuetify: Framework;
    $electron: {
      clipboard: Clipboard;
      contextBridge: ContextBridge;
      crashReporter: CrashReporter;
      desktopCapturer: DesktopCapturer;
      ipcRenderer: IpcRenderer;
      nativeImage: typeof NativeImage;
      remote: Remote;
      shell: Shell;
      webFrame: WebFrame;
    };
    $db: IDB;
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
