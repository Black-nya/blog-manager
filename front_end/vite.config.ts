import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
// https://vitejs.dev/config/
const target = null;
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/test':{
        target,
        changeOrigin: true,
      }
    }
  },
  resolve:{
    alias:{
      "@":path.resolve(__dirname,'./src')
    }
  }
})

