import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  root: __dirname,
  base: '/assets/timer-app/',
  server: {
    port: 5173,
    fs: {
      allow: [resolve(__dirname, '..')],
    },
    proxy: {
      '/api': 'http://localhost:3000',
      '/auth': 'http://localhost:3000',
      '/timer': 'http://localhost:3000',
    },
  },
  build: {
    outDir: resolve(__dirname, '../../public/timer-app'),
    emptyOutDir: true,
  },
});
