import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import basicSsl from '@vitejs/plugin-basic-ssl'
import legacy from '@vitejs/plugin-legacy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl(),
  legacy({
    targets: ['defaults']
  })],
  server: {
    https: true
  },
  build: {
    rollupOptions: {
      input: {
        "main": resolve(__dirname, 'index.html'),
        "count-down": resolve(__dirname, 'tool/count-down.html'),
      }
    }
  }
})
