import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const apiUrl = "http://localhost:5000" 
  ? import.meta.env.VITE_API_URL 
  : '';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: {apiUrl}
      }
    }
  },
  build: {
    outDir: "dist",
  }
})
