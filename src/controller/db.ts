/* eslint-disable no-async-promise-executor */
export interface _DB {
  name: string
  version: number
  isConnected: boolean
  db: null | IDBDatabase
  get: <T>(objectStoreName: KeysDB, key: string) => Promise<T | undefined>
  getAll: <T>(objectStoreName: KeysDB) => Promise<T[] | undefined>
  put: <T>(objectStoreName: KeysDB, info: T, key?: string, rule?: IDBTransactionMode) => Promise<any>
}

type KeysDB = 'box' | 'palette' | 'command'

import { defaultPalette, ActiveRedDarkPalette } from '@/models/palette'

const wait = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

export class DB implements _DB {
  name = 'pandora'
  version = 1
  isConnected = false
  db: null | IDBDatabase = null

  constructor() {
    this.connect()
  }

  async createDefaultDB() {
    if (!this.db) {
      return () => {}
    }

    const box = await this.db.createObjectStore('box', { keyPath: 'name' })
    const palette = await this.db.createObjectStore('palette', { keyPath: 'name' })
    const command = await this.db.createObjectStore('command', { keyPath: 'name' })

    return () => {
      this.put('palette', defaultPalette)
      this.put('palette', ActiveRedDarkPalette)
    }
  }

  connect() {
    const request = indexedDB.open(this.name, this.version)

    request.onsuccess = (event) => {
      console.log('Success creating/accessing IndexedDB database', event)
      this.db = request.result

      this.db.onversionchange = () => {
        this.db?.close()
        alert('Need to reload page')
      }

      this.db.onerror = (event) => {
        console.log({ event }, 'Error creating/accessing IndexedDB database')
      }
    }

    request.onupgradeneeded = async() => {
      this.db = request.result

      switch (this.db.version) {
        case 0: {
          const initDataFunction = await this.createDefaultDB()
          setTimeout(initDataFunction, 100)
          break
        }
        default: {
          const initDataFunction = await this.createDefaultDB()
          setTimeout(initDataFunction, 100)
        }
      }
    }

    request.onerror = (error: any) => {
      const dbError = error.srcElement.error
      if (dbError.name === 'VersionError') {
        const [oldVersion, newVersion] = dbError.message.match(/\d{1,}/g)

        this.version = newVersion
        this.connect()        
      } else {
        console.log({ error }, 'Error connection to db')
      }
    }

    request.onblocked = () => {
      alert('Block db')
    }
  }

  get<T>(objectStoreName: KeysDB, key: string) {
    return new Promise<T>( async (resolve, reject) => {
      !this.db && await wait(3000)

      if (!this.db) {
        reject('Failed to connect to indexDB')
        return
      }
  
      const transaction = this.db.transaction([objectStoreName]);
      const objectStore = transaction.objectStore(objectStoreName);

      const request = objectStore.get(key);

      request.onsuccess = (response) => {
        resolve(request.result)
      }
    })
  }

  getAll<T>(objectStoreName: KeysDB) {
    return new Promise<T[] | undefined>( async (resolve, reject) => {
      !this.db && await wait(3000)

      if (!this.db) {
        reject('Failed to connect to indexDB')
        return
      }
  
      const transaction = this.db.transaction([objectStoreName]);
      const objectStore = transaction.objectStore(objectStoreName);

      const request = objectStore.getAll();

      request.onsuccess = (response) => {
        resolve(request.result)
      }
    })
  }

  put<T>(objectStoreName: KeysDB, info: T, key?: string, rule: IDBTransactionMode = 'readwrite') {
    return new Promise( async (resolve, reject) => {
      !this.db && await wait(3000)

      if (!this.db) {
        reject('Failed to connect to indexDB')
        return
      }

      const transaction = this.db.transaction([objectStoreName], rule)
      const put = transaction.objectStore(objectStoreName).put(info, key)

      put.onsuccess = (response) => {
        resolve(response)
      }
    })
  }
}

export default new DB()