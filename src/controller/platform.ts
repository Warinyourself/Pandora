import { ElectronPlugin } from '@/models/page'

const userAgent = navigator.userAgent.toLowerCase()
const isElectron = userAgent.indexOf(' electron/') > -1
let electron: null | ElectronPlugin = null

if (isElectron) {
  electron = window.require('electron') as ElectronPlugin
}

export type PlatformTypes = 'web' | 'dektop'

export interface IPlatform {
  os: string | null;
  type: PlatformTypes;
  env: Record<string, string>;
  setEnv(): void;
}

export class Platform implements IPlatform {
  os = null
  type: PlatformTypes = 'dektop'
  env = {}

  constructor() {
    if (!isElectron) {
      this.type = 'web'
    }
  }

  setEnv() {
    if (this.type === 'web') {
      this.env = process.env
    } else {
      const ipc = electron?.ipcRenderer

      if (!ipc) return

      ipc.send('sendCommand', { command: 'printenv', eventName: 'getEnv' })

      ipc.on('getEnv', (event, { answer }: { answer: string}) => {
        const env = answer.split(/\n/).reduce((acc: Record<string, string>, envString) => {
          const [name, value] = envString.split('=')

          if (/^[A-Z_-]*$/.test(name)) {
            acc[name] = value
          }

          return acc
        }, {})

        this.env = env
      })
    }
  }
}

export default new Platform()
