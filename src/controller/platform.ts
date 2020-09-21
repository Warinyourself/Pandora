import { ElectronPlugin, ILoaderFile } from '@/models/page'
// import fs from 'fs'

const userAgent = navigator.userAgent.toLowerCase()
const isElectron = userAgent.indexOf(' electron/') > -1
let electron: null | ElectronPlugin = null

if (isElectron) {
  electron = window.require('electron') as ElectronPlugin
}

export type PlatformTypes = 'web' | 'desktop'

export interface IPlatform {
  os: string | null;
  type: PlatformTypes;
  env: Record<string, string>;
  isWeb: boolean;
  isElectron: boolean;
  setEnv(): void;
  saveFile(file: ILoaderFile): void;
  setBackground(path: string): void;
}

export class Platform implements IPlatform {
  os = null
  type: PlatformTypes = 'desktop'
  env: Record<string, string> = {}

  get isWeb() {
    return this.type === 'web'
  }

  get isElectron() {
    return this.type === 'desktop'
  }

  constructor() {
    console.log({ isElectron })
    if (!isElectron) {
      this.type = 'web'
    }
  }

  setEnv() {
    if (this.isWeb) {
      this.env = process.env as Record<string, string>
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

  saveFile(file: ILoaderFile) {
    if (this.isWeb) {
      const blob = new Blob([file.text || ''], { type: file.type })
      const newFile = new File([blob], file.name)
      const url = URL.createObjectURL(newFile)

      const link = document.createElement('a')

      link.setAttribute('href', url)
      link.setAttribute('download', file.name)

      link.click()
    } else {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const fs = require('fs')
      const dialog = electron?.remote.dialog
      const homedir = this.env.HOME || this.env.HOMEPATH || this.env.USERPROFILE || '.'

      console.log({ homedir, env: process.env })
      if (!dialog) return

      dialog.showSaveDialog({
        title: 'Select the File Path to save',
        defaultPath: file.path || homedir,
        buttonLabel: 'Save',
        filters: [
          {
            name: 'Text Files',
            extensions: ['txt', 'docx']
          }],
        properties: []
      }).then((fileInfo) => {
        if (!fileInfo.canceled) {
          const filePath = fileInfo.filePath

          if (!filePath) return

          fs.writeFile(filePath.toString(), file.text, (error: Error) => {
            if (error) throw error
            console.log('Saved!')
          })
        }
      })
    }
  }

  setBackground(path: string) {
    electron?.ipcRenderer.send('sendCommand', { command: 'nitrogen', attrs: ['--set-zoom-fill', path] })
  }
}

export default new Platform()
