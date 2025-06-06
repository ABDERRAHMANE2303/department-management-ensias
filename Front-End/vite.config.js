import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    proxy: {
      // forward any /api/admin/* request to http://localhost:9091
      '/api/admin': {
        target: 'http://admin:9091',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {         // Add this proxy rule for images
        target: 'http://admin:9091',
        changeOrigin: true,
        secure: false,
      },
      '/api/auth': {
        target: 'http://auth:9092',
        changeOrigin: true,
        secure: false,
      },
      '/api/cd': {
        target: 'http://chef-dep:9093', // Adjust port as needed
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
