import {
  Shell,
  Remote,
  WebFrame,
  Clipboard,
  IpcRenderer,
  NativeImage,
  ContextBridge,
  CrashReporter,
  DesktopCapturer
} from 'electron'

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

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface INotification {
  type: AlertType
  text: string
  title: string
  id: string
  show: boolean
  emoji?: string
}

export interface ElectronPlugin {
  clipboard: Clipboard
  contextBridge: ContextBridge
  crashReporter: CrashReporter
  desktopCapturer: DesktopCapturer
  ipcRenderer: IpcRenderer
  nativeImage: typeof NativeImage
  remote: Remote
  shell: Shell
  webFrame: WebFrame
}
