import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}']
      },
      manifest: {
        name: 'Terminal Portfolio - Luv Gupta',
        short_name: 'Terminal Portfolio',
        description: 'Interactive terminal-style portfolio showcasing full-stack development expertise',
        theme_color: '#282a36',
        background_color: '#282a36',
        display: 'standalone',
        icons: [
          {
            src: 'src/assets/terminal-icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ],
        start_url: '/',
        scope: '/',
        id: '/?source=pwa'
      }
    })
  ],
})