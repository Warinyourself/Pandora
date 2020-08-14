import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators'
import store from '@/store'
import db from '@/controller/db'

import { Palette } from '@/models/palette'

export interface PaletteState {
  palettes: Palette[]
}

@Module({ dynamic: true, store, name: 'Palette' })
class PaletteClass extends VuexModule implements PaletteState {
  palettes: Palette[] = []

  @Mutation
  SET<S extends this, K extends keyof this>({ key, value }: { key: K, value: S[K] }) {
    this[key] = value
  }

  @Action
  async setPalettes() {
    const palletes = await db.getAll<Palette>('palette')

    if (palletes) {
      this.SET({ key: 'palettes', value: palletes })
    }
  }
}

export const PaletteModule = getModule(PaletteClass)
