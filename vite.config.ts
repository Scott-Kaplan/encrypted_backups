import { defineConfig } from 'vite'
import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  define: {
    __MAC_AUTO_UPDATES_ENABLED__: JSON.stringify(process.env['MAC_AUTO_UPDATES_ENABLED'] === 'true'),
  },
  plugins: [
    vue(),
    electron({
      main: {
        entry: 'electron/main.ts',
      },
      preload: {
        input: path.join(import.meta.dirname, 'electron/preload.ts'),
      },
    }),
  ],
})
