import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    https: {
      key: fs.readFileSync(`./localhost.key`),
      cert: fs.readFileSync(`./localhost.crt`),
  }
  },
})
