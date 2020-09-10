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

export interface IRightMenu {
  view: boolean;
  icon?: string;
  style: Record<string, string>;
  items: IRightMenuItem[];
}

export interface DragItem {
  type: string;
  info: any;
}

export interface IRightMenuItem {
  icon?: string;
  title: string;
  disabled?: boolean;
  callback?: Function;
  items?: IRightMenuItem[];
}

export type ILoaderFileType = 'image' | 'text'

export interface ILoaderFile {
  id: string;
  name: string;
  size: number;
  type: ILoaderFileType;
  loading?: boolean;
  palette?: string[];
  path?: string;
  src?: string;
  text?: string;
  hash?: string;
  file: File;
}

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface INotification {
  type: AlertType;
  text: string;
  title: string;
  id: string;
  show: boolean;
  emoji?: string;
}

export interface ElectronPlugin {
  clipboard: Clipboard;
  contextBridge: ContextBridge;
  crashReporter: CrashReporter;
  desktopCapturer: DesktopCapturer;
  ipcRenderer: IpcRenderer;
  nativeImage: typeof NativeImage;
  remote: Remote;
  shell: Shell;
  webFrame: WebFrame;
}
