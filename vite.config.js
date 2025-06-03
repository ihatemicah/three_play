import { defineConfig } from 'vite'

export default defineConfig({
  base: '/three_play/',
  build: {
    outDir: 'docs',
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          gsap: ['gsap']
        }
      }
    }
  },
  resolve: {
    alias: {
      'three': 'three'
    }
  }
}) 