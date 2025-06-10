import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(async () => {
  const tailwindcss = (await import('@tailwindcss/vite')).default
  
  return {
    plugins: [
      vue(),
      tailwindcss()
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 5173,
      host: true,
    },
    preview: {
      port: 4173,
      host: true,
    },
  }
})