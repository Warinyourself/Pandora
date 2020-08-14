import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators'
import store from '@/store'
import db from '@/controller/db'

import { Palette } from '@/models/palette'
import { ColorModule } from '@/store/color'

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

  @Action
  async setPalettes() {
    const palletes = await db.getAll<Palette>('palette')

    if (palletes) {
      this.SET({ key: 'palettes', value: palletes })
    }
  }

  @Action
  activatePalette({ palette, self }: {palette: Palette, self: any}) {
    const vuetifyColors = ['primary', 'secondary', 'tertiary']
    palette.colors.forEach(({ name, hex }) => {
      if (vuetifyColors.includes(name)) {
        self.$vuetify.theme.themes.dark[name] = hex
        self.$vuetify.theme.themes.light[name] = hex
      }

      const ignoreHue = ['fg']
      const hue = ['dark', '', 'light']

      const changeHue = (color: string, hue: number) => {
        return ColorModule.changeHsl(ColorModule.convertToHsl(color) as string, 0, -0, hue)
      }
  
      const hueStep = 5
      const hueStart = (hue.length - 2) * hueStep * -1
  
      if (ignoreHue.includes(name)) {
        const cssVarName = `--${name}`

        ColorModule.setGlobalCSSVariable({ name: cssVarName, value: hex })
        return
      }

      hue.forEach((hue, i) => {
        const cssVarName = `--${name}${hue ? '-' + hue : ''}`
        const value = changeHue(hex, hueStart + (i * hueStep))

        ColorModule.setGlobalCSSVariable({ name: cssVarName, value })
      })
    })
  }
}

export const PaletteModule = getModule(PaletteClass)
