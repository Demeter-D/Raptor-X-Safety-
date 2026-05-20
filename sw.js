// Raptor X Safety Briefing — service worker for offline + instant load.
// v2: network-first for HTML/JSX/JS so updates propagate, cache-first for assets.

const CACHE = 'raptor-x-briefing-v4';

// App-shell + assets to precache on install. Paths are RELATIVE so this works
// under any GitHub Pages subpath.
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

const CDN = [
  'https://unpkg.com/react@18.3.1/umd/react.development.js',
  'https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js',
  'https://unpkg.com/@babel/standalone@7.29.0/babel.min.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(PRECACHE);
    await Promise.allSettled(
      CDN.map((url) =>
        fetch(url, { mode: 'cors' })
          .then((r) => r.ok && cache.put(url, r))
          .catch(() => {})
      )
    );
    // Activate the new SW immediately, even with open tabs.
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Drop old caches so v1 contents are evicted.
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

// Allow the page to ask the SW to skip waiting (used after we detect an update).
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

function isShellRequest(req) {
  if (req.mode === 'navigate') return true;
  const url = new URL(req.url);
  return /\.(html|jsx|js|json)$/i.test(url.pathname);
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Network-first for shell files (HTML, JSX, JS, JSON) so updates land fast.
  if (isShellRequest(req)) {
    event.respondWith((async () => {
      try {
        const resp = await fetch(req);
        if (resp && resp.ok) {
          const clone = resp.clone();
          caches.open(CACHE).then((c) => c.put(req, clone)).catch(() => {});
        }
        return resp;
      } catch (err) {
        const cached = await caches.match(req, { ignoreSearch: true });
        if (cached) return cached;
        throw err;
      }
    })());
    return;
  }

  // Cache-first for everything else (images, icons, fonts, CDN scripts).
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
      const fuzzy = await caches.match(req, { ignoreSearch: true });
      if (fuzzy) return fuzzy;
      throw err;
    }
  })());
});
