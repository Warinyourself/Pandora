export interface Box {
  id: string;
  name: string;
  readme: string;
  images: string[];
  files: any[];
  commands: string[];
}

export interface Palette {
  id: string;
  name: string;
  description: string;
  colors: any[];
}
