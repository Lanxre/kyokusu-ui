import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    dts({ insertTypesEntry: true })
  ],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'KyokusuUIVue',
      fileName: 'kyokusu-ui-vue',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['vue', '@kyokusu-ui/core'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
});