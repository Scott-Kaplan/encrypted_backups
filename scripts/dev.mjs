import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const environment = { ...process.env }
const snapCodePrefix = '/snap/code/'
const inheritedGtkPath = environment.GTK_PATH ?? ''
const inheritedGtkPrefix = environment.GTK_EXE_PREFIX ?? ''
const launchedFromSnapCode = process.platform === 'linux'
  && (inheritedGtkPath.includes(snapCodePrefix) || inheritedGtkPrefix.includes(snapCodePrefix))

if (launchedFromSnapCode) {
  const compatibleModules = (environment.GTK_MODULES ?? '')
    .split(':')
    .filter((moduleName) => moduleName && moduleName !== 'appmenu-gtk-module' && moduleName !== 'canberra-gtk-module')

  if (compatibleModules.length) {
    environment.GTK_MODULES = compatibleModules.join(':')
  } else {
    delete environment.GTK_MODULES
  }
}

const viteCli = fileURLToPath(new URL('../node_modules/vite/bin/vite.js', import.meta.url))
const vite = spawn(process.execPath, [viteCli], { env: environment, stdio: 'inherit' })

vite.on('error', (error) => {
  console.error('Could not start Vite:', error.message)
  process.exitCode = 1
})

vite.on('exit', (code, signal) => {
  process.exitCode = code ?? (signal ? 1 : 0)
})
