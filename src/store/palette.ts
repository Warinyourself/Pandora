import {
  Module, VuexModule, getModule, Mutation, Action,
} from 'vuex-module-decorators';
import store from '@/store';
import db from '@/controller/db';

import { Palette } from '@/models/palette';

// @ts-ignore
import convert from 'color-convert';

export interface PaletteState {
  palettes: Palette[];
}

@Module({ dynamic: true, store, name: 'Palette' })
class PaletteClass extends VuexModule implements PaletteState {
  palettes: Palette[] = []

  nameActivePalette = ''

  @Mutation
  SET<S extends this, K extends keyof this>({ key, value }: { key: K; value: S[K] }) {
    this[key] = value;
  }

  get isDark() {
    return true;
  }

  get activePalette() {
    return this.palettes.find(({ name }) => name === this.nameActivePalette);
  }

  get hexToHsl() {
    return (hex: string): [number, number, number] => convert.hex.hsl(hex);
  }

  get hslToHex() {
    return ([h, s, l]: [number, number, number]) => {
      const [r, g, b] = convert.hsl.rgb(h, s, l);
      const hex = convert.rgb.hex(r, g, b);

      return `#${hex}`;
    };
  }

  get changeLight() {
    return (color: string, light: number) => {
      const hsl = convert.hex.hsl(color);

      const [r, g, b] = convert.hsl.rgb(hsl[0], hsl[1], hsl[2] + light);
      const hex = convert.rgb.hex(r, g, b);

      color = `#${hex}`;

      return color;
    };
  }

  @Action
  async updatePalettes() {
    const palletes = await db.getAll<Palette>('palette');

    if (palletes) {
      this.SET({ key: 'palettes', value: palletes });
    }
  }

  @Action
  async putPalette(palette: Palette) {
    await db.put('palette', palette);
    await this.updatePalettes();
  }

  @Action
  activatePalette({ palette, self }: {palette: Palette; self: any}) {
    const vuetifyColors = ['primary', 'secondary', 'tertiary', 'bg', 'fg'];

    const updateColors = palette.colors.map((color) => {
      const step = 5;
      return {
        name: color.name,
        base: color.hex,
        lighten1: this.changeLight(color.hex, step * 1),
        lighten2: this.changeLight(color.hex, step * 2),
        lighten3: this.changeLight(color.hex, step * 3),
        lighten4: this.changeLight(color.hex, step * 4),
        lighten5: this.changeLight(color.hex, step * 5),
        darken1: this.changeLight(color.hex, step * -1),
        darken2: this.changeLight(color.hex, step * -2),
        darken3: this.changeLight(color.hex, step * -3),
        darken4: this.changeLight(color.hex, step * -4),
        darken5: this.changeLight(color.hex, step * -5),
      };
    });

    localStorage.setItem('currentPalette', JSON.stringify(palette));
    this.SET({ key: 'nameActivePalette', value: palette.name });

    updateColors.forEach((color) => {
      if (vuetifyColors.includes(color.name)) {
        const { name, ...colors } = color;

        self.$vuetify.theme.themes.dark[name] = colors;
        self.$vuetify.theme.themes.light[name] = colors;
      }
    });
  }
}

export const PaletteModule = getModule(PaletteClass);
