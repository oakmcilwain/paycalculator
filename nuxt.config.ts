// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify'
import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
    experimental: {
        watcher: "chokidar"
    },
    devtools: { enabled: false },
    css: [
        'vuetify/lib/styles/main.sass',
        '@mdi/font/css/materialdesignicons.min.css',
    ],
    build: {
        transpile: ['vuetify'],
    },
    vite: {
        define: {
            'process.env.DEBUG': false,
        },
    },
    hooks: {
        'vite:extendConfig': (config) => {
            config.plugins?.push(
                vuetify({
                    styles: { configFile: resolve('./settings.scss') },
                })
            )
        }
    },
    sourcemap: false,
})
