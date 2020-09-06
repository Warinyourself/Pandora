import {
  Module, VuexModule, getModule, Mutation, Action
} from 'vuex-module-decorators'
import store from '@/store'
import db from '@/controller/db'

import { Box } from '@/models/box'

export interface BoxState {
  boxes: Box[];
}

@Module({ dynamic: true, store, name: 'box' })
class BoxClass extends VuexModule implements BoxState {
  boxes: Box[] = []

  @Mutation
  SET<S extends this, K extends keyof this>({ key, value }: { key: K; value: S[K] }) {
    this[key] = value
  }

  @Action
  async loadAll() {
    const boxes = await db.getAll<Box>('box')

    if (boxes) {
      this.SET({ key: 'boxes', value: boxes })
    }
  }
}

export const BoxModule = getModule(BoxClass)
