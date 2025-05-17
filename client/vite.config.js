import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    build: {
      outDir: "dist",
    }
  };
  
  // Only apply proxy settings during development
  if (command === 'serve') {
    config.server = {
      proxy: {
        "/api": {
          target: "http://localhost:5000",
          changeOrigin: true,
          secure: false
        }
      }
    };
  }
  
  return config;
});
