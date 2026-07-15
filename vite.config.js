import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Standard Vite + Vue 3 setup. No special config needed —
// Tailwind is wired in via postcss.config.js below.
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    open: true
  }
})
