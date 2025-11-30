// Service Worker pour PWA
const CACHE_NAME = 'conquete-monde-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Assets à mettre en cache au démarrage
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/assets/images/Logo-voyage.png',
  '/manifest.json'
];

// Installer le Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[Service Worker] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activer le Service Worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE;
          })
          .map((cacheName) => {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
  );
  return self.clients.claim();
});

// Intercepter les requêtes
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorer les requêtes non-GET
  if (request.method !== 'GET') {
    return;
  }

  // Ignorer les requêtes chrome-extension et autres schemes non-HTTP
  if (url.protocol === 'chrome-extension:' || url.protocol === 'chrome:' || !url.protocol.startsWith('http')) {
    return;
  }

  // Ignorer les requêtes API (toujours aller au réseau)
  if (url.pathname.startsWith('/api')) {
    return;
  }

  // Stratégie: Cache First pour les assets statiques, Network First pour les pages
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // Si c'est un asset statique (images, CSS, JS), utiliser le cache
      if (
        request.url.includes('/assets/') ||
        request.url.includes('.css') ||
        request.url.includes('.js') ||
        request.url.includes('.png') ||
        request.url.includes('.jpg') ||
        request.url.includes('.svg')
      ) {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((response) => {
          if (response.status === 200) {
            const responseToCache = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        });
      }

      // Pour les pages HTML: Network First, puis Cache
      return fetch(request)
        .then((response) => {
          // Mettre en cache si la réponse est valide
          if (response.status === 200) {
            const responseToCache = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // Si le réseau échoue, utiliser le cache
          if (cachedResponse) {
            return cachedResponse;
          }
          // Sinon, retourner une page offline
          if (request.headers.get('accept').includes('text/html')) {
            return caches.match('/index.html');
          }
        });
    })
  );
});

// Gérer les messages depuis l'application
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

