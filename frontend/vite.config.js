import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  preview: {
    allowedHosts: [
      'sublime-flexibility-production-1a65.up.railway.app'
    ]
  }
})