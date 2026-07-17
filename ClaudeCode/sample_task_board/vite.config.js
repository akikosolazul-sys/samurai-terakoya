import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/samurai-terakoya/sample_task_board/',
  plugins: [react()],
})
