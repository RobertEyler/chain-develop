import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  ssr: {
    noExternal: ['react-helmet-async']
  },
  optimizeDeps: {
    include: ['react-helmet-async'],
    esbuildOptions: {
      mainFields: ['module', 'main']
    }
  },
  // 确保所有路由都指向 index.html（用于静态部署）
  base: './',
  server: {
    port: 80, // 使用端口 80，访问时不需要输入端口号
    host: '127.0.0.1', // 使用 127.0.0.1
    // Vite 默认支持 SPA 路由，所有未匹配的路径都会返回 index.html
  }
})
