import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'playground',
      filename: 'remoteEntry.js',
      exposes: {
        './PlaygroundApp': './src/App.vue'
      },
      // Shared libraries with Host shell
      shared: ['vue', 'pinia']
    })
  ],
  server: {
    port: 5002,
    strictPort: true,
    cors: true
  },
  preview: {
    port: 5002,
    strictPort: true,
    cors: true
  },
  optimizeDeps: {
    exclude: ['@kyokusu-ui/core', '@kyokusu-ui/vue']
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})
