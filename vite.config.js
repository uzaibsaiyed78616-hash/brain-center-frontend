import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Ye v4 ke liye zaroori hai

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Ye plugin Tailwind ko activate karega
  ],
})