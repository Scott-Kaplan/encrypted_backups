import { contextBridge, ipcRenderer } from 'electron'
import type { UpdateStatus } from '../src/update-types'

contextBridge.exposeInMainWorld('encryptedBackups', {
  selectSourceFolders: (): Promise<string[]> => ipcRenderer.invoke('backup:select-source-folders'),
  getAppInfo: (): Promise<{ platform: string; version: string }> => ipcRenderer.invoke('app:get-info'),
  getUpdateStatus: (): Promise<UpdateStatus> => ipcRenderer.invoke('app:get-update-status'),
  onUpdateStatus: (callback: (status: UpdateStatus) => void): (() => void) => {
    const listener = (_event: unknown, status: UpdateStatus) => callback(status)
    ipcRenderer.on('update:status', listener)
    return () => ipcRenderer.removeListener('update:status', listener)
  },
  installUpdate: (): Promise<void> => ipcRenderer.invoke('app:install-update'),
})
