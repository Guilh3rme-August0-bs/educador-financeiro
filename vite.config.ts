//importação do framework tailwindcss
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
// configurar framework tailwind
  plugins: [react(), tailwindcss()],
  resolve: { 
    alias: { '@': path.resolve(__dirname, './src') } }
})
