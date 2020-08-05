import { Module, VuexModule, getModule, Action, Mutation } from 'vuex-module-decorators'
import store from '@/store'

export type TColor = 'active' | 'second' | 'third' | 'bg' | 'fg'

export interface ITheme {
  name: string
  primary: string
  secondary: string
  tertiary: string
  bg: string
  fg?: string
}

export interface IConvertOptions {
  view: string
}

export type TColorArray = [number, number, number]


export type ColorState = {
  [key in TColor]: string
}

@Module({ dynamic: true, store, name: 'color' })
class Color extends VuexModule implements ColorState {
  active: string = ''
  second: string = ''
  third: string = ''
  bg: string = ''
  fg: string = ''

  get getGlobalCSSVariable() {
    return (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name)
  }

  get bgColor() {
    return () => this.getGlobalCSSVariable('--color-bg')
  }

  get bgDark() {
    return this.changeHsl(this.convertToHsl(this.bg) as string, 0, -0, -5)
  }

  get colorDarker() {
    return this.changeHsl(this.convertToHsl(this.active) as string, 0, -0, -10)
  }

  get colorDarkest() {
    return this.changeHsl(this.convertToHsl(this.active) as string, 0, -0, -15)
  }

  get getColorName() {
    return (color: string) => {
      // Red | Green | Blue | Yellow | Magenta | Cyan
      const colors = [['red', 280], ['blue', 175], ['green', 80], ['red', 0]]
      const hsl = this.convertToHsl(color, { view: 'array' }) as TColorArray
      const hue = hsl[0] < 0 ? 360 + (hsl[0] % 360) : hsl[0] % 360

      let finalColor = colors.find(([color, value], index) => {
        let [max, min] = [colors[index - 1] ? colors[index - 1][1] : 360, value]

        return hue > min && hue < max
      }) || ['white']

      return `${finalColor[0] || ''} - ${hsl[0]}`
    }
  }

  get convertToHsl() {
    return (color: string, convertOptions?: IConvertOptions) => {
      let type = color.slice(0, 3)
      if (type === 'rgb') {
        return this.rgbToHsl(this.fromBracketsToNumber(color) as TColorArray, convertOptions)
      } else if (color[0] === '#') {
        const hexArray = this.hexToRgb(color)

        return hexArray ? this.rgbToHsl(hexArray as TColorArray, convertOptions) : 'notConverted'
      } else {
        return color
      }
    }
  }

  get changeHsl() {
    return (hsl: string, hAdd: number, sAdd: number, lAdd: number): string => {
      let hslMass = this.fromBracketsToNumber(hsl)
      return `hsl(${hslMass[0] + hAdd}, ${hslMass[1] + sAdd}%, ${hslMass[2] + lAdd}%)`
    }
  }

  get fromBracketsToNumber() {
    return (color: string): TColorArray => {
      let num = color.slice(color.indexOf('(') + 1).replace(')', '').split(',')
      return [parseInt(num[0]), parseInt(num[1]), parseInt(num[2])]
    }
  }

  get hexToRgb() {
    return (color: string): TColorArray => {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color)
      return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
      ] : [0, 0, 0]
    }
  }

  get rgbToHsl() {
    return (colorRGB: TColorArray, convertOptions?: IConvertOptions): string | TColorArray => {
      let [r, g, b] = colorRGB
      const { view } = convertOptions || {}
      const isArray = view === 'array'
      r /= 255
      g /= 255
      b /= 255
      let [max, min] = [Math.max(r, g, b), Math.min(r, g, b)]

      let h = 0
      let s = 0
      let l = (max + min) / 2

      const finalArray = (): TColorArray => [Math.round(h), Math.round(s * 100), Math.round(l * 100)]
      const formatString = (hsl: TColorArray) => `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`
      if (max === min) {
        h = s = 0
        return isArray ? finalArray() : formatString(finalArray())
      }

      let d = (max - min)
      s = l >= 0.5 ? d / (2 - (max + min)) : d / (max + min)
      switch (max) {
        case r: h = ((g - b) / d + 0) * 60; break
        case g: h = ((b - r) / d + 2) * 60; break
        case b: h = ((r - g) / d + 4) * 60; break
      }

      return isArray ? finalArray() : formatString(finalArray())
    }
  }

  @Mutation
  SET_THEME(theme: Omit<ITheme, 'name'>) {
    Object.entries(theme).forEach(([color, colorValue]) => {
      this[color as TColor] = colorValue
    })
  }

  @Action
  setTheme({ theme, self }: { theme: Omit<ITheme, 'name'>, self: any}) {
    this.SET_THEME(theme)

    if (theme.primary) {
      self.$vuetify.theme.themes.dark.primary = theme.primary
      self.$vuetify.theme.themes.light.primary = theme.primary
    }

    if (theme.secondary) {
      self.$vuetify.theme.themes.dark.secondary = theme.secondary
      self.$vuetify.theme.themes.light.secondary = theme.secondary
    }

    if (theme.tertiary) {
      self.$vuetify.theme.themes.dark.tertiary = theme.tertiary
      self.$vuetify.theme.themes.light.tertiary = theme.tertiary
    }

    const ignoreHue = ['fg']
    const hue = ['dark', '', 'light']
    const changeHue = (color: string, hue: number) => {
      return this.changeHsl(this.convertToHsl(color) as string, 0, -0, hue)
    }

    const hueStep = 5
    const hueStart = (hue.length - 2) * hueStep * -1

    if (theme.fg === undefined) {
      const name = `--fg`

      this.setGlobalCSSVariable({ name, value: theme.active })
    }

    console.log({ theme })
    Object.entries(theme).forEach(([color, colorValue]) => {
      if (!colorValue) {
        return
      }

      if (ignoreHue.includes(color)) {
        const name = `--${color}`

        this.setGlobalCSSVariable({ name, value: colorValue })
        return
      }

      hue.forEach((hue, i) => {
        const name = `--${color}${hue ? '-' + hue : ''}`
        const value = changeHue(colorValue, hueStart + (i * hueStep))

        this.setGlobalCSSVariable({ name, value })
      })
    })
  }

  @Action
  setColor({ name, color }: { name: string, color: string }) {
    const ignoreHue = ['fg']
    const hue = ['dark', '', 'light']
    const changeHue = (color: string, hue: number) => {
      return this.changeHsl(this.convertToHsl(color) as string, 0, -0, hue)
    }
    const hueStep = 5
    const hueStart = (hue.length - 2) * hueStep * -1

    hue.forEach((hue, i) => {
      const nameVar = `--${name}${hue ? '-' + hue : ''}`
      const value = changeHue(color, hueStart + (i * hueStep))

      this.setGlobalCSSVariable({ name: nameVar, value })
    })
  }

  @Action
  setGlobalCSSVariable({ name, value }: { name: string, value: string }) {
    document.documentElement.style.setProperty(name, value)
  }
}

export const ColorModule = getModule(Color)
