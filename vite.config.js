import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/components/**', 'src/core/**', 'src/utils/**'],
      exclude: ['src/docs/**', 'src/pages/**', 'src/showroom/**', '**/*.test.{ts,tsx}'],
    },
  },
})
