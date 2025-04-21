import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    svgLoader(),
    VitePWA({
      // <-- Añadir configuración PWA
      registerType: 'autoUpdate', // Estrategia de actualización automática
      // injectRegister: 'auto', // 'auto' es el valor por defecto, podemos omitirlo
      devOptions: {
        enabled: true, // Habilitar PWA también en modo desarrollo (útil para probar)
      },
      workbox: {
        // Archivos a cachear directamente (App Shell)
        // Incluye los assets generados por Vite (JS, CSS, etc.) y fuentes comunes
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        // Estrategias de caché en tiempo de ejecución (para APIs, imágenes externas)
        runtimeCaching: [
          {
            // Cachear imágenes de TheMealDB
            urlPattern: /^https:\/\/www\.themealdb\.com\/images\/.*/i,
            handler: 'CacheFirst', // Sirve de caché primero, si no, va a red
            options: {
              cacheName: 'themealdb-images-cache',
              expiration: {
                maxEntries: 80, // Guardar hasta 80 imágenes
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
              },
              cacheableResponse: { statuses: [0, 200] }, // Cachear respuestas opacas (0) o exitosas (200)
            },
          },
          {
            // Cachear API de categorías y filtro por categoría
            // (StaleWhileRevalidate: rápido desde caché, actualiza en fondo)
            urlPattern:
              /^https:\/\/www\.themealdb\.com\/api\/json\/v1\/1\/(categories\.php|filter\.php)/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'themealdb-api-cache',
              expiration: { maxAgeSeconds: 1 * 24 * 60 * 60 }, // Cachear por 1 día
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // API de búsqueda y detalle (NetworkFirst: prioriza red, usa caché como fallback offline)
            urlPattern:
              /^https:\/\/www\.themealdb\.com\/api\/json\/v1\/1\/(search\.php|lookup\.php)/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'themealdb-dynamic-cache',
              // Tiempo que espera la red antes de ir a caché (opcional)
              // networkTimeoutSeconds: 3,
              expiration: { maxAgeSeconds: 6 * 60 * 60 }, // Cachear por 6 horas como fallback
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      manifest: false,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
