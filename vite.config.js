import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/Online-store.github.io/',
  server: { host: '0.0.0.0' },
})
