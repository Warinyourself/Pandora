import { ElectronPlugin, ILoaderFile } from '@/models/page'
// import fs from 'fs'

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
  saveFile(file: ILoaderFile): void;
}

export class Platform implements IPlatform {
  os = null
  type: PlatformTypes = 'dektop'
  env: Record<string, string> = {}

  constructor() {
    console.log({ isElectron })
    if (!isElectron) {
      this.type = 'web'
    }
  }

  setEnv() {
    if (this.type === 'web') {
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
    if (this.type === 'web') {
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
}

export default new Platform()
