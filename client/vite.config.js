import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'Book Management',
                short_name: 'Book App',
                start_url: '/',
                display: 'standalone',
                background_color: '#ffffff',
                theme_color: '#000000',
                icons: [
                    {
                        src: '/icons/book.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
            devOptions: {
                enabled: true, // Active le PWA en mode développement
            },
        }),
    ],
});
