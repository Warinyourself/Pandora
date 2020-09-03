export interface RightMenu {
  view: boolean;
  style: Record<string, string>;
  items: RightMenuItem[];
}

export interface DragItem {
  type: string;
  info: any;
}

export interface RightMenuItem {
  icon?: string;
  title: string;
  disabled?: boolean;
  callback?: Function;
  items?: RightMenuItem[];
}

export type LoaderFileType = 'image' | 'text'

export interface LoaderFile {
  id: string;
  path: string;
  name: string;
  size: number;
  type: LoaderFileType;
  palette: string[];
  src?: string;
  text?: string;
  hash?: string;
  file: File;
}
