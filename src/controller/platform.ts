export type PlatformTypes = 'web' | 'dektop'

export interface IPlatform {
  os: string | null;
  type: PlatformTypes;
  env: Array<[string, string]>;
}

export class Platform implements IPlatform {
  os = null
  type: PlatformTypes = 'dektop'
  env = []
}

export default new Platform()
