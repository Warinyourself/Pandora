import {
  Module, VuexModule, getModule, Mutation, Action
} from 'vuex-module-decorators'
import store from '@/store'
import db from '@/controller/db'

import { IBox } from '@/models/box'

export interface IBoxState {
  boxes: IBox[];
}

@Module({ dynamic: true, store, name: 'box' })
class BoxClass extends VuexModule implements IBoxState {
  boxes: IBox[] = []

  @Mutation
  SET<S extends this, K extends keyof this>({ key, value }: { key: K; value: S[K] }) {
    this[key] = value
  }

  @Action
  async loadAll() {
    let boxes = await db.getAll<IBox>('box')

    if (boxes) {
      boxes = boxes.map((box) => {
        box.files.map((fileObject) => {
          if (['image', 'video'].includes(fileObject.type)) {
            fileObject.src = URL.createObjectURL(fileObject.file)
            return fileObject
          }
          return fileObject
        })

        return box
      })

      this.SET({ key: 'boxes', value: boxes })
    }
  }
}

export const BoxModule = getModule(BoxClass)
