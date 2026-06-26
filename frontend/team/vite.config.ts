import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  root: __dirname,
  base: '/assets/team-app/',
  server: {
    port: 5176,
    fs: {
      allow: [resolve(__dirname, '..')],
    },
    proxy: {
      '/api': 'http://localhost:3000',
      '/auth': 'http://localhost:3000',
      '/users': 'http://localhost:3000',
      '/teams': 'http://localhost:3000',
      '/team': 'http://localhost:3000',
    },
  },
  build: {
    outDir: resolve(__dirname, '../../public/team-app'),
    emptyOutDir: true,
  },
});
