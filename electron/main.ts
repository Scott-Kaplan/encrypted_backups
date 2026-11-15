import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import type { UpdateStatus } from '../src/update-types'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

ipcMain.handle('backup:select-source-folders', async () => {
  const selection = await dialog.showOpenDialog({
    title: 'Choose folders to protect',
    properties: ['openDirectory', 'multiSelections'],
  })

  return selection.canceled ? [] : selection.filePaths
})

ipcMain.handle('app:get-info', () => ({
  platform: process.platform,
  version: app.getVersion(),
}))

let updateStatus: UpdateStatus = { state: 'disabled' }

function setUpdateStatus(status: UpdateStatus) {
  updateStatus = status
  if (win && !win.isDestroyed()) {
    win.webContents.send('update:status', status)
  }
}

ipcMain.handle('app:get-update-status', () => updateStatus)
ipcMain.handle('app:install-update', async () => {
  if (updateStatus.state !== 'available') return

  setUpdateStatus({ state: 'downloading', percent: 0 })
  try {
    await autoUpdater.downloadUpdate()
  } catch {
    setUpdateStatus({ state: 'error' })
  }
})

let win: BrowserWindow | null

function configureAutoUpdater() {
  if (!app.isPackaged) return
  if (process.platform === 'darwin' && !__MAC_AUTO_UPDATES_ENABLED__) {
    setUpdateStatus({ state: 'disabled' })
    return
  }

  autoUpdater.autoDownload = false
  autoUpdater.autoInstallOnAppQuit = false
  autoUpdater.allowPrerelease = false
  autoUpdater.on('checking-for-update', () => setUpdateStatus({ state: 'checking' }))
  autoUpdater.on('update-available', (info) => setUpdateStatus({ state: 'available', version: info.version }))
  autoUpdater.on('update-not-available', () => setUpdateStatus({ state: 'current' }))
  autoUpdater.on('download-progress', (progress) => {
    setUpdateStatus({ state: 'downloading', percent: Math.floor(progress.percent) })
  })
  autoUpdater.on('update-downloaded', () => {
    setUpdateStatus({ state: 'installing' })
    autoUpdater.quitAndInstall(false, true)
  })
  autoUpdater.on('error', () => setUpdateStatus({ state: 'error' }))
  void autoUpdater.checkForUpdates().catch(() => setUpdateStatus({ state: 'error' }))
}

function createWindow() {
  win = new BrowserWindow({
    title: 'Encrypted Backups',
    width: 1200,
    height: 840,
    minWidth: 720,
    minHeight: 600,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '#f3f5f2',
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  })

  win.once('ready-to-show', () => win?.show())
  win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }))
  win.webContents.on('will-navigate', (event, navigationUrl) => {
    if (VITE_DEV_SERVER_URL && new URL(navigationUrl).origin === new URL(VITE_DEV_SERVER_URL).origin) return
    event.preventDefault()
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(() => {
  createWindow()
  configureAutoUpdater()
})
