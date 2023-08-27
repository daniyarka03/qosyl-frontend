import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://109.248.170.181:8000'
    },
  },
  plugins: [react()],
})
