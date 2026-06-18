/* ============================================
   SmartSkidka.ru — Service Worker
   ============================================ */

const STATIC_CACHE = 'static-v10';
const DATA_CACHE = 'data-v10';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/deeplink.js?v=12',
  '/js/products.js?v=15',
  '/js/products-loader.js?v=18',
  '/js/app.js?v=29',
  '/js/mobile-fix.js',
  '/manifest.json?v=2',
  '/icons/icon-72x72.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/404.html',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== STATIC_CACHE && name !== DATA_CACHE)
            .map((name) => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip external requests (aliexpress, analytics, etc.)
  if (url.origin !== self.location.origin) return;

  if (url.pathname.endsWith('.json')) {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(cacheFirst(request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (e) {
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DATA_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (e) {
    const cached = await caches.match(request);
    if (cached) return cached;
    return new Response('[]', { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
}
