import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5171,
  },
  preview: {
    host: true,
    allowedHosts: ['tour-1-vjy4.onrender.com'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    deps: {
      inline: [/@testing-library/],
    },
  },
});
