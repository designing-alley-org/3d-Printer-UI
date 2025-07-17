import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['jwt-decode', 'lodash-es'],
  },
  resolve: {
    extensions: ['.ts', '.tsx'],
    alias: {
      'lodash-es': path.resolve(__dirname, 'node_modules/lodash-es'),
    },
  },
  build: {
    rollupOptions: {
      external: [],
    }
  }
});
