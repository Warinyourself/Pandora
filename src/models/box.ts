import { ILoaderFile } from '@/models/page'

export interface IBox {
  id: string;
  name: string;
  readme: string;
  images: string[];
  files: ILoaderFile[];
  commands: string[];
}

export interface IPalette {
  id: string;
  name: string;
  description: string;
  colors: any[];
}
