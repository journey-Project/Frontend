import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
  proxy: {
    '/api': {
      target: 'https://journeysite.site',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '/api'), // /api 유지
      secure: false, // HTTPS이더라도 인증서 검사 생략
    }
  }
}
})

