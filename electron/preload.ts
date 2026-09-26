import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('encryptedBackups', {
  selectSourceFolders: (): Promise<string[]> => ipcRenderer.invoke('backup:select-source-folders'),
})
