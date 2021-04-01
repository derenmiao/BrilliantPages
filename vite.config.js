import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
      host: '127.0.0.1',
      port: 3000,
      open: true,
      https: false,
      proxy: {
        '/thorapi': {
          target: 'http://127.0.0.1:5000',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/thorapi/, '')
        },
        '/youdao': {
          target: 'http://fanyi.youdao.com',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/youdao/, '')
        }
      }
  },
  base: './',
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
  },
})
