import is from 'electron-is'

import childProcess from 'child_process'
import { resolve } from 'dns'
import { reject } from 'lodash'

export interface IBackgroundProcessOptions {
  command: string;
  attrs?: string[];
}

function getCommandOutput(): HTMLElement { return document.getElementById('command-output') as HTMLElement }

function appendOutput(msg: string) {
  console.log({ msg })
  // getCommandOutput().value += (msg+'\n');
}

function setStatus(msg: string) {
  console.log({ msg })
  // getStatus().innerHTML = msg
}

function showOS() {
  if (is.windows()) appendOutput('Windows Detected.')
  if (is.macOS()) appendOutput('Apple OS Detected.')
  if (is.linux()) appendOutput('Linux Detected.')
}

export function backgroundProcess({ command, attrs }: IBackgroundProcessOptions) {
  return new Promise((resolve, reject) => {
    console.log(`Start command: ${command} ${attrs ? attrs.join(' ') : ''}`)
    const parseData = (data: string) => {
      return Buffer.from(data, 'utf8')
    }

    const child = attrs ? childProcess.spawn(command, attrs) : childProcess.exec(command)

    child.on('error', (error) => {
      console.log(`Get error ${error}`)

      reject(error)
    })

    if (child.stdout) {
      child.stdout.on('data', (data) => {
        const dataString = parseData(data).toString()

        resolve(dataString)
      })
    }

    if (child.stderr) {
      child.stderr.on('data', (error) => {
        const errorString = parseData(error).toString()

        reject(errorString)
      })
    }

    child.on('close', (code) => {
      if (code === 0) {
        setStatus('child process complete.')
      } else {
        setStatus(`child process exited with code ${code}`)
      }
    })
  })
}
