import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'frontend/dist', // Specify the output directory for the frontend build
    // Add any other build options here as needed
  }
})
