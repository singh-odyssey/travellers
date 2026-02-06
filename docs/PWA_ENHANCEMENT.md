# Lightweight PWA Enhancement

This document describes the lightweight Progressive Web App (PWA) implementation for the Travellers application, focusing on offline-first capabilities without requiring a full PWA conversion.

## Overview

The PWA enhancement provides:

- **Offline Detection**: Automatic detection and handling of connectivity changes
- **Selective Caching**: Caches non-map data (routes, itineraries, metadata)
- **Graceful Fallbacks**: Provides meaningful experiences when offline
- **Install Prompts**: Optional app installation for enhanced experience

## Architecture

### Service Worker Strategy

The implementation uses a **hybrid caching strategy**:

1. **Network-First for API Routes**
   - Tries network first
   - Falls back to cache if offline
   - Caches successful responses

2. **Cache-First for Static Assets**
   - Serves from cache immediately
   - Updates cache in background
   - Falls back to network if not cached

3. **Never Cache Map Tiles**
   - Respects Google Maps ToS
   - Skips all maps API requests
   - Only caches route metadata and geometry

## Files Created

### Service Worker

- `public/sw.js` - Main service worker file with caching logic

### Utilities

- `src/lib/utils/service-worker.ts` - Service worker manager and React hook

### Components

- `src/components/pwa-provider.tsx` - PWA initialization component
- `src/components/pwa-installer.tsx` - Install prompt UI

### Configuration

- `public/manifest.json` - PWA manifest
- Updated `src/app/layout.tsx` - PWA meta tags
- Updated `next.config.js` - Webpack configuration

## Usage

### Automatic Registration

The service worker is automatically registered on app load:

```tsx
// Already included in layout.tsx
import { PWAProvider } from "@/components/pwa-provider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <PWAProvider />
      </body>
    </html>
  );
}
```

### Using the Hook

```tsx
import { useServiceWorker } from "@/lib/utils/service-worker";

export function MyComponent() {
  const sw = useServiceWorker();

  useEffect(() => {
    if (sw.isSupported) {
      sw.register();
    }
  }, []);

  const handleCacheRoutes = async () => {
    const routes = await fetchRoutes();
    sw.cacheRoutes(routes);
  };

  return <div>{sw.isActive ? "Service Worker Active" : "Not Active"}</div>;
}
```

### Manual Operations

```typescript
import { serviceWorkerManager } from "@/lib/utils/service-worker";

// Cache routes manually
serviceWorkerManager.cacheRoutes(routesData);

// Trigger background sync
await serviceWorkerManager.syncRoutes();

// Listen for updates
serviceWorkerManager.on("UPDATE_AVAILABLE", () => {
  console.log("New version available");
});

// Send custom messages
serviceWorkerManager.postMessage({
  type: "CUSTOM_ACTION",
  data: { foo: "bar" },
});
```

## What Gets Cached

### ✅ Cached by Service Worker

- **API Responses**
  - `/api/routes`
  - `/api/tickets`
  - User profile data
- **Static Pages**
  - `/` (home)
  - `/routes`
  - `/dashboard`
- **Static Assets**
  - CSS files
  - JavaScript bundles
  - Images (except map tiles)

### ❌ Never Cached

- **Google Maps**
  - Map tiles
  - Geocoding API
  - Directions API live requests
  - Any `googleapis.com` or `google.com` requests

- **Authentication**
  - Login/logout requests
  - Session validation

- **POST/PUT/DELETE Requests**
  - Write operations always require network

## Installation

### Browser Support

| Feature         | Chrome | Firefox | Safari   | Edge   |
| --------------- | ------ | ------- | -------- | ------ |
| Service Workers | ✅ 45+ | ✅ 44+  | ✅ 11.1+ | ✅ 17+ |
| Background Sync | ✅ 49+ | ❌ No   | ❌ No    | ✅ 79+ |
| Install Prompt  | ✅ 68+ | ❌ No   | ✅ 16.4+ | ✅ 79+ |

### Installing the PWA

#### Desktop (Chrome/Edge)

1. Visit the app
2. Look for install icon in address bar
3. Click "Install"
4. Or use "Install app" from banner

#### Mobile (iOS Safari)

1. Visit the app
2. Tap share button
3. Select "Add to Home Screen"
4. Confirm installation

#### Mobile (Android Chrome)

1. Visit the app
2. Tap "Add to Home Screen" banner
3. Or use "Install App" from menu
4. Confirm installation

## Testing

### Test Offline Mode

1. **Chrome DevTools Method**

   ```
   1. Open DevTools (F12)
   2. Go to Application tab
   3. Check "Offline" under Service Workers
   4. Test app functionality
   ```

2. **Network Throttling**

   ```
   1. Open DevTools (F12)
   2. Go to Network tab
   3. Select "Offline" from throttling dropdown
   4. Verify cached content loads
   ```

3. **Airplane Mode**
   ```
   1. Enable airplane mode
   2. Navigate the app
   3. Verify routes load from cache
   ```

### Verify Service Worker

```javascript
// In browser console
navigator.serviceWorker.getRegistration("/").then((reg) => {
  console.log("SW registered:", !!reg);
  console.log("SW active:", !!reg?.active);
});

// Check cache
caches.keys().then((names) => {
  console.log("Caches:", names);
});
```

### Debug Service Worker

1. Open Chrome DevTools
2. Go to Application → Service Workers
3. See status, update, and unregister options
4. Click "Unregister" to reset for testing

## Features

### Offline Detection

The app automatically detects when you go offline:

```tsx
// Component updates automatically
<OfflineModeIndicator />;

// Hook provides status
const { isOnline } = useConnectivity();
```

### Background Sync

When back online, the service worker can sync data:

```typescript
// Triggered automatically when online
// Or manually:
await serviceWorkerManager.syncRoutes();
```

### Update Notifications

When a new version is available:

```typescript
serviceWorkerManager.on("UPDATE_AVAILABLE", () => {
  if (confirm("New version available. Update now?")) {
    serviceWorkerManager.skipWaiting();
    window.location.reload();
  }
});
```

### Install Prompt

Users see an install banner automatically:

- After 3 seconds on first visit
- Can be dismissed
- Reappears after 7 days if dismissed
- Remembers dismissal in localStorage

## Configuration

### Cache Duration

Edit `public/sw.js` to adjust cache behavior:

```javascript
const CACHE_NAME = "travellers-offline-v1"; // Increment to force update
const RUNTIME_CACHE = "travellers-runtime-v1";
```

### Cached Routes

Add/remove routes in `STATIC_ASSETS`:

```javascript
const STATIC_ASSETS = [
  "/",
  "/routes",
  "/dashboard",
  "/offline", // Add custom offline page
];
```

### Update Check Interval

In `src/lib/utils/service-worker.ts`:

```typescript
// Check for updates every hour (default)
setInterval(
  () => {
    this.registration?.update();
  },
  60 * 60 * 1000,
);
```

## Troubleshooting

### Service Worker Not Registering

**Problem**: Service worker fails to register

**Solutions**:

1. Check HTTPS (required except on localhost)
2. Verify `public/sw.js` exists
3. Check browser console for errors
4. Ensure no Content Security Policy blocking

### Cache Not Updating

**Problem**: Old content showing after updates

**Solutions**:

1. Increment `CACHE_NAME` in `sw.js`
2. Clear browser cache manually
3. Unregister and re-register service worker
4. Use "Update on reload" in DevTools

### Install Prompt Not Showing

**Problem**: No install banner appears

**Solutions**:

1. Ensure HTTPS connection
2. Check PWA criteria met (manifest, service worker, icons)
3. Clear dismissal: `localStorage.removeItem('pwa-install-dismissed')`
4. Some browsers don't show prompts (Firefox, Safari iOS)

### Background Sync Not Working

**Problem**: Data not syncing when back online

**Solutions**:

1. Background Sync only in Chrome/Edge
2. Check service worker is active
3. Verify sync event registered
4. Implement fallback for unsupported browsers

## Performance

### Cache Size

Monitor cache size in browser:

```javascript
if ("storage" in navigator && "estimate" in navigator.storage) {
  navigator.storage.estimate().then(({ usage, quota }) => {
    console.log(`Using ${usage} of ${quota} bytes`);
  });
}
```

### Cache Limits

- **Chrome**: ~60% of available disk space
- **Firefox**: ~50% of available disk space
- **Safari**: ~1GB per domain

### Cleanup Strategy

Old caches are automatically removed on service worker activation.

## Security

### HTTPS Required

Service workers require HTTPS except on:

- `localhost`
- `127.0.0.1`
- `file://` protocol

### Content Security Policy

Ensure CSP allows service workers:

```html
<meta http-equiv="Content-Security-Policy" content="worker-src 'self'" />
```

### Data Privacy

- All data cached locally in browser
- No sensitive data cached
- Cache cleared when user clears browser data
- User controls what gets cached

## Best Practices

### DO ✅

- Cache static assets and API responses
- Implement network-first for dynamic data
- Show offline indicators clearly
- Provide graceful degradation
- Version your service worker
- Test offline scenarios thoroughly

### DON'T ❌

- Don't cache authentication tokens
- Don't cache map tiles (ToS violation)
- Don't cache personal/sensitive data
- Don't make app unusable offline
- Don't forget to handle errors
- Don't ignore update notifications

## Future Enhancements

### Planned Features

- [ ] Push notifications for route updates
- [ ] Periodic background sync
- [ ] Share target API for route sharing
- [ ] Media cache for user photos
- [ ] Offline analytics queuing

### Advanced Features

- [ ] Workbox integration
- [ ] Advanced caching strategies
- [ ] Cache versioning per user
- [ ] Predictive prefetching
- [ ] Differential updates

## Resources

- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [PWA Best Practices](https://web.dev/pwa-checklist/)
- [Workbox](https://developers.google.com/web/tools/workbox)
- [Background Sync](https://web.dev/background-sync/)

## Support

For issues with PWA features:

1. Check browser compatibility
2. Verify HTTPS connection
3. Review browser console errors
4. Test in incognito/private mode
5. Clear service worker and retry

---

**Status**: ✅ Lightweight PWA Enhancement Complete  
**Type**: Selective offline support (not full PWA)  
**Focus**: Route caching and offline detection
