export interface Palette {
  id: string;
  name: string;
  description?: string;
  colors: PaletteColor[];
}

export type ColorsType = 'primary' | 'secondary' | 'tertiary' | 'fg' | 'bg' | 'undefined'

export interface PaletteColor {
  name: ColorsType;
  hex: string;
}

export const defaultColor = '#DA0463'

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
  }
]

export const ActiveRedDarkColors: PaletteColor[] = [
  {
    name: 'primary',
    hex: '#da0463'
  },
  {
    name: 'secondary',
    hex: '#dbedf3'
  },
  {
    name: 'tertiary',
    hex: '#404b69'
  },
  {
    name: 'fg',
    hex: '#dae1e7'
  },
  {
    name: 'bg',
    hex: '#283149'
  }
]

export const defaultPalette: Palette = {
  id: `${Math.random()}`,
  name: 'dark-sea-blue',
  colors: defaultColors
}

export const ActiveRedDarkPalette: Palette = {
  id: `${Math.random()}`,
  name: 'Active red dark',
  colors: ActiveRedDarkColors
}
