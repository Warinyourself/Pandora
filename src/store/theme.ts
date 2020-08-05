import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators'
import { Route } from 'vue-router'
import store from '@/store'

// @ts-ignore
import convert from 'color-convert'

export interface ThemeState {
  selectedTheme: string
  isDark: boolean
  primaryColor: string
}

@Module({ dynamic: true, store, name: 'theme' })
class Theme extends VuexModule implements ThemeState {
  selectedTheme = 'dark'
  themes = [
    {
      name: 'dark',
      id: '1',
      active: '#ffd700',
      second: '#ff1c76',
      third: '#91e60a',
      bg: '#19102e'
    },
    {
      name: 'light',
      id: '2',
      active: '#fc5185',
      second: '#ffcf7c',
      third: '#6886c5',
      bg: '#f4eeff'
    }
  ]

  @Mutation
  SET_THEME<S extends this, K extends keyof this>({ key, value }: { key: K, value: S[K] }) {
    this[key] = value
  }

  // get primaryColor() {
  //   let color = this.selectedPlace?.companyThemeColorHex || this.colors[0]
  //   const hsl = convert.hex.hsl(color)
  //   const light = hsl[2]

  //   if (light < 40 && this.isDark) {
  //     const [r, g, b] = convert.hsl.rgb(hsl[0], hsl[1], 40)
  //     const hex = convert.rgb.hex(r, g, b)

  //     color = `#${hex}`
  //   }

  //   return color
  // }

  get getLightColor() {
    return (color: string) => {
      const hsl = convert.hex.hsl(color)
      const light = hsl[2]
  
      return light
    }
  }

  get isDark() {
    return this.getLightColor(this.theme.bg) < 30 ? true : false
  }

  get theme() {
    return this.themes.find(({ name}) => name === this.selectedTheme) || this.themes[0]
  }

  get primaryColor() {
    return this.theme.active
  }

  @Action
  changeColor({ color, self, colorName }: { color: string, colorName: string, self: any }) {
    const changeVar = (name: string, value: string) => {
      document.documentElement.style.setProperty(name, value)
    }

    self.$vuetify.theme.themes.dark[colorName] = color
    self.$vuetify.theme.themes.light[colorName] = color

    changeVar(`--${colorName}`, color)
  }

  @Action
  async changeTheme({ theme, self }: { theme: string, self: any}) {
    this.SET_THEME({ key: 'selectedTheme', value: theme })

    self.$vuetify.theme.dark = this.isDark

    Object.entries(this.theme).forEach(([colorName, color]) => {
      this.changeColor({ self, colorName, color })
    })

    document.documentElement.setAttribute('class', `theme--${theme}`)

    localStorage.setItem('theme', theme)
  }
}

export const ThemeModule = getModule(Theme)
