// Importation des modules nécessaires de Workbox
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute, NavigationRoute, Route } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

// Nettoyer les anciens caches
cleanupOutdatedCaches();

// Précharger les ressources générées par Vite
precacheAndRoute(self.__WB_MANIFEST);

// Nom des caches
const apiCacheName = 'api-cache';
const imageCacheName = 'image-cache';
const navigationCacheName = 'navigation-cache';

// Activer le mode "skipWaiting" pour que le SW prenne effet immédiatement
self.skipWaiting();

// URL de l'API définie dans les variables d'environnement Vite
const apiURL = import.meta.env.VITE_API_BASE_URL;

// Mise en cache des images
const imageRoute = new Route(
  ({ request, sameOrigin }) => sameOrigin && request.destination === 'image',
  new CacheFirst({
    cacheName: imageCacheName,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
registerRoute(imageRoute);

// Mise en cache des appels API GET
self.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith(apiURL) && event.request.method === 'GET') {
    event.respondWith(
      caches.open(apiCacheName).then((cache) =>
        cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(event.request).then((networkResponse) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
      )
    );
  }
});

// Mise en cache de la navigation
const navigationRoute = new NavigationRoute(
  new NetworkFirst({
    cacheName: navigationCacheName,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
    networkTimeoutSeconds: 3,
  })
);
registerRoute(navigationRoute);

// Gestion des requêtes restantes
self.addEventListener('fetch', (event) => {
  console.log('Intercepted request:', event.request.url);
});
