// Service Worker for Offline-First Travel Mode
// Lightweight PWA enhancement for caching non-map data

const CACHE_NAME = 'travellers-offline-v1';
const RUNTIME_CACHE = 'travellers-runtime-v1';

// Assets to cache on install (app shell)
const STATIC_ASSETS = [
  '/',
  '/routes',
  '/dashboard',
  '/offline',
];

// API routes to cache
const API_ROUTES = [
  '/api/routes',
  '/api/tickets',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching app shell');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - network-first strategy for API, cache-first for assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip Google Maps API requests (never cache map tiles/API calls)
  if (
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('google.com') ||
    url.hostname.includes('gstatic.com') ||
    url.pathname.includes('maps')
  ) {
    return;
  }

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // API routes - Network first, fallback to cache
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      networkFirstStrategy(request, RUNTIME_CACHE)
    );
    return;
  }

  // Static assets and pages - Cache first, fallback to network
  event.respondWith(
    cacheFirstStrategy(request, CACHE_NAME)
  );
});

// Network-first strategy (for API calls)
async function networkFirstStrategy(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page or error response
    return new Response(
      JSON.stringify({ 
        error: 'Offline', 
        message: 'You are currently offline. Some features may not be available.' 
      }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      }
    );
  }
}

// Cache-first strategy (for static assets)
async function cacheFirstStrategy(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Failed to fetch:', request.url);
    
    // For navigation requests, try to return a cached page
    if (request.mode === 'navigate') {
      const cachedPage = await caches.match('/');
      if (cachedPage) {
        return cachedPage;
      }
    }
    
    return new Response('Offline', {
      status: 503,
      statusText: 'Service Unavailable',
    });
  }
}

// Background sync for route updates (when back online)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-routes') {
    event.waitUntil(syncRoutes());
  }
});

async function syncRoutes() {
  try {
    console.log('[SW] Syncing routes with server');
    // This would trigger a sync mechanism in your app
    const clients = await self.clients.matchAll();
    clients.forEach((client) => {
      client.postMessage({
        type: 'SYNC_ROUTES',
        timestamp: Date.now(),
      });
    });
  } catch (error) {
    console.error('[SW] Sync failed:', error);
  }
}

// Listen for messages from the app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_ROUTES') {
    event.waitUntil(
      caches.open(RUNTIME_CACHE).then((cache) => {
        return cache.put('/api/routes', new Response(JSON.stringify(event.data.routes)));
      })
    );
  }
});
