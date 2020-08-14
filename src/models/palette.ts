export interface Palette {
  id: string
  name: string
  description?: string
  colors: PaletteColor[]
}

export interface PaletteColor {
  name: string
  hex: string
}

export const defaultColors: PaletteColor[] = [
  {
    name: 'primary',
    hex: '#00909e'
  },
  {
    name: 'secondary',
    hex: '#27496d'
  },
  {
    name: 'fg',
    hex: '#dae1e7'
  },
  {
    name: 'bg',
    hex: '#142850'
  },
]

export const defaultPalette: Palette = {
  id: Math.random() + '',
  name: 'dark-sea-blue',
  colors: defaultColors
}