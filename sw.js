// Offline support for Uncle PD's Fishing Partner.
// App files: network first so updates show up, cache when there's no signal.
// Libraries and map tiles: cache first, so places he has looked at still draw offline.
const APP_CACHE = 'pd-app-v2';
const TILE_CACHE = 'pd-tiles-v1';
const MAX_TILES = 600;

const APP_FILES = [
    './',
    'index.html',
    'suncalc.js',
    'manifest.webmanifest',
    'icons/avatar-160.jpg',
    'icons/icon-192.png',
    'icons/icon-512.png'
];

const LIBRARIES = [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/js/all.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css',
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'
];

const TILE_HOSTS = ['tile.openstreetmap.org', 'server.arcgisonline.com'];

self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(APP_CACHE);
        await cache.addAll(APP_FILES);
        // Libraries are best effort; the app still works online without them cached
        await Promise.all(LIBRARIES.map(url => cache.add(url).catch(() => {})));
        await self.skipWaiting();
    })());
});

self.addEventListener('activate', event => {
    event.waitUntil((async () => {
        const keep = [APP_CACHE, TILE_CACHE];
        for (const name of await caches.keys()) {
            if (!keep.includes(name)) await caches.delete(name);
        }
        await self.clients.claim();
    })());
});

async function trimTiles() {
    const cache = await caches.open(TILE_CACHE);
    const keys = await cache.keys();
    for (let i = 0; i < keys.length - MAX_TILES; i++) {
        await cache.delete(keys[i]);
    }
}

async function cacheFirst(request, cacheName) {
    const cached = await caches.match(request);
    if (cached) return cached;
    const response = await fetch(request);
    if (response.ok || response.type === 'opaque') {
        const cache = await caches.open(cacheName);
        await cache.put(request, response.clone());
        if (cacheName === TILE_CACHE) trimTiles();
    }
    return response;
}

async function networkFirst(request) {
    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(APP_CACHE);
            await cache.put(request, response.clone());
        }
        return response;
    } catch (err) {
        const cached = await caches.match(request, { ignoreSearch: true });
        if (cached) return cached;
        if (request.mode === 'navigate') return caches.match('index.html');
        throw err;
    }
}

self.addEventListener('fetch', event => {
    const request = event.request;
    if (request.method !== 'GET') return;
    const url = new URL(request.url);

    if (TILE_HOSTS.some(host => url.hostname.endsWith(host))) {
        event.respondWith(cacheFirst(request, TILE_CACHE));
    } else if (url.hostname === 'cdnjs.cloudflare.com') {
        event.respondWith(cacheFirst(request, APP_CACHE));
    } else if (url.origin === self.location.origin) {
        event.respondWith(networkFirst(request));
    }
    // Everything else (weather, AI) goes straight to the network; the app keeps its own copy
});
