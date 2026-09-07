import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      '@components': resolve(import.meta.dirname, './src/components'),
      '@utils': resolve(import.meta.dirname, './src/utils'),
    },
  },
});
