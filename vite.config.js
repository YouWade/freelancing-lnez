import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url';

// https://vite.dev/config/
export default defineConfig({
  base: '/freelancing-lnez/',
  plugins: [react()],
  resolve: {
    alias: {
      // 用 new URL 搭配 import.meta.url 來解析路徑
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@data': fileURLToPath(new URL('./src/data', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@context': fileURLToPath(new URL('./src/context', import.meta.url)),
      '@constants': fileURLToPath(new URL('./src/constants', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自動在所有 SCSS 檔案中引入全域變數和 mixins（使用 @use 語法）
        additionalData: `
          @use "@assets/styles/_variables.scss" as *;
          @use "@assets/styles/_mixins.scss" as *;
        `
      }
    }
  }
})
