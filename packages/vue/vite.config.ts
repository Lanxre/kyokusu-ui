import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    cssInjectedByJsPlugin(),
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