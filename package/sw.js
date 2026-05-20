// Raptor X Safety Briefing — service worker for offline + instant load.

const CACHE = 'raptor-x-briefing-v1';

// App-shell + assets to cache on install.
// Paths are RELATIVE so this works under any GitHub Pages subpath.
const PRECACHE = [
  './',
  './Raptor%20X%2030T%20-%20Safety%20Briefing%20Video.html',
  './animations.jsx',
  './scenes.jsx',
  './manifest.json',
  './assets/raptor-x-30t.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png',
];

// External CDN URLs to cache. These are big (especially Babel) so first load
// pays the cost; every load after is instant.
const CDN = [
  'https://unpkg.com/react@18.3.1/umd/react.development.js',
  'https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js',
  'https://unpkg.com/@babel/standalone@7.29.0/babel.min.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // Local: must succeed
    await cache.addAll(PRECACHE);
    // CDN: best-effort (don't fail install if a CDN hiccups)
    await Promise.allSettled(
      CDN.map((url) =>
        fetch(url, { mode: 'cors' })
          .then((r) => r.ok && cache.put(url, r))
          .catch(() => {})
      )
    );
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Drop old caches.
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Cache-first, network-fallback. On successful network response, populate
  // cache so future loads are offline-capable.
  event.respondWith((async () => {
    const cached = await caches.match(req, { ignoreSearch: false });
    if (cached) return cached;

    try {
      const resp = await fetch(req);
      if (resp && resp.ok && (resp.type === 'basic' || resp.type === 'cors')) {
        const clone = resp.clone();
        caches.open(CACHE).then((c) => c.put(req, clone)).catch(() => {});
      }
      return resp;
    } catch (err) {
      // Last-ditch: try ignoring search params for the cache lookup
      const fuzzy = await caches.match(req, { ignoreSearch: true });
      if (fuzzy) return fuzzy;
      throw err;
    }
  })());
});
