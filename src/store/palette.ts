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
  activePalette = ''

  @Mutation
  SET<S extends this, K extends keyof this>({ key, value }: { key: K, value: S[K] }) {
    this[key] = value
  }

  get isDark() {
    return true
  }

  @Action
  async updatePalettes() {
    const palletes = await db.getAll<Palette>('palette')

    if (palletes) {
      this.SET({ key: 'palettes', value: palletes })
    }
  }

  @Action
  async putPalette(palette: Palette) {
    await db.put('palette', palette)
    await this.updatePalettes()
  }

  @Action
  activatePalette({ palette, self }: {palette: Palette, self: any}) {
    const vuetifyColors = ['primary', 'secondary', 'tertiary', 'bg', 'fg']

    localStorage.setItem('currentPalette', JSON.stringify(palette))

    palette.colors.forEach(({ name, hex }) => {
      if (vuetifyColors.includes(name)) {
        self.$vuetify.theme.themes.dark[name] = hex
        self.$vuetify.theme.themes.light[name] = hex
      }
    })
  }
}

export const PaletteModule = getModule(PaletteClass)
