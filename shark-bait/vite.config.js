import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/@cesium/engine/Source/Assets',
          dest: 'cesium'
        },
        {
          src: 'node_modules/@cesium/engine/Source/ThirdParty',
          dest: 'cesium'
        },
        {
          src: 'node_modules/@cesium/engine/Source/Workers',
          dest: 'cesium'
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    CESIUM_BASE_URL: JSON.stringify('/cesium')
  }
})
