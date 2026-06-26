import { defineConfig } from 'vite';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: __dirname,
  base: '/assets/reports-app/',
  server: {
    port: 5175,
    fs: {
      allow: [resolve(__dirname, '..')],
    },
    proxy: {
      '/api': 'http://localhost:3000',
      '/auth': 'http://localhost:3000',
      '/users': 'http://localhost:3000',
      '/timer': 'http://localhost:3000',
      '/reports': 'http://localhost:3000',
    },
  },
  build: {
    outDir: resolve(__dirname, '../../public/reports-app'),
    emptyOutDir: true,
  },
});
