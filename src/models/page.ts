export interface RightMenu {
  view: boolean
  style: Record<string, string>
  items: RightMenuItem[]
}

export interface DragItem {
  type: string
  info: any
}

export interface RightMenuItem {
  icon: string
  title: string
  callback: Function
}

export type LoaderFileType = 'image' | 'text'

export interface LoaderFile {
  id: string
  path: string
  name: string
  size: number
  type: LoaderFileType
  src?: string
  text?: string
  hash?: string
  file: File
}