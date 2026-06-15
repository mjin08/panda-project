import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

/**
 * Vite Configuration
 *
 * CS Note: The proxy forwards /api requests to the Express backend
 * during development, avoiding CORS issues in production builds.
 */
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
});