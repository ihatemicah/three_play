import { defineConfig } from 'vite'

export default defineConfig({
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