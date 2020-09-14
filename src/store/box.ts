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
    const boxes = await db.getAll<IBox>('box')

    if (boxes) {
      this.SET({ key: 'boxes', value: boxes })
    }
  }
}

export const BoxModule = getModule(BoxClass)
