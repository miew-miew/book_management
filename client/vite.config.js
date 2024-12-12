import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            devOptions: {
                enabled: true
            },
            strategies: "injectManifest",
            srcDir: "src", // Dossier contenant votre service worker
            filename: "sw.js", // Nom du fichier service worker
            registerType: 'autoUpdate',
            injectManifest: {
                swDest: "dist/sw.js"
            },

            manifest: {
                name: "Book Management App",
                short_name: "Book App",
                theme_color: "#ffffff",
                background_color: "#ffffff",
                display: "standalone",
                start_url: "/",
                icons: [
                    {
                        src: "/icons/book.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "/icons/book.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            }
        }),
    ],
});
