# Offline-First Route Visualization

This feature provides an **Offline-First Travel Mode** that enables users to save trips, routes, and locations for offline use with interactive Google Maps integration.

## Features

### ✨ Key Capabilities

- **Google Maps Integration**: Full interactive mapping with route visualization
- **Offline Mode**: View cached routes without internet connection
- **Smart Caching**: IndexedDB storage for route metadata and geometry
- **Automatic Sync**: Seamless data synchronization when connectivity returns
- **Route Management**: Create, view, and manage saved routes
- **ToS Compliant**: No map tiles cached, respecting map provider terms

### 🎯 What's Cached Offline

- Route metadata (origin, destination, waypoints, distance, duration)
- Static route geometry (encoded polylines, GeoJSON coordinates)
- Trip information (names, notes, timestamps)

### 🗺️ Rendering Modes

#### Online Mode

- Full Google Maps interactive interface
- Real-time route calculation
- Complete map features (zoom, pan, satellite view)

#### Offline Mode

- Simplified SVG-based route visualization
- Vector graphics from cached coordinates
- Clear offline mode indicators

## Installation

### 1. Install Dependencies

```bash
npm install
```

The following packages are included:

- `@googlemaps/js-api-loader` - Google Maps JavaScript API loader
- `idb` - IndexedDB wrapper for offline storage

### 2. Configure Google Maps API

1. Get your API key from [Google Cloud Console](https://console.cloud.google.com/google/maps-apis)
2. Enable the following APIs:
   - Maps JavaScript API
   - Directions API
   - Places API (optional)
   - Geocoding API (optional)

3. Add to your `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

### 3. Update Database Schema

Run Prisma migrations to add the Route model:

```bash
npm run prisma db push
```

## Usage

### Accessing Routes

Navigate to `/routes` to view all saved routes.

### Creating a New Route

1. Go to `/routes/new`
2. Enter trip details:
   - Trip name
   - Origin coordinates (lat, lng)
   - Destination coordinates (lat, lng)
   - Optional notes
3. Or click "Use Demo Route" for a NYC → DC example
4. View the route on the interactive map
5. Click "Save Route" to cache for offline access

### Viewing Offline

1. Save routes while online
2. Disconnect from the internet
3. Routes remain accessible with simplified visualization
4. Reconnect to sync any changes

## Architecture

### Components

#### `GoogleMapsRoute` ([google-maps-route.tsx](src/components/google-maps-route.tsx))

- Interactive Google Maps component
- Route calculation and rendering
- Handles online map display

#### `OfflineRouteRenderer` ([offline-route-renderer.tsx](src/components/offline-route-renderer.tsx))

- SVG-based route visualization
- Works without internet connection
- Renders from cached coordinate data

#### `RouteViewer` ([route-viewer.tsx](src/components/route-viewer.tsx))

- Smart switcher between online/offline modes
- Manages route caching and loading
- Provides route information UI

#### `OfflineModeIndicator` ([offline-mode-indicator.tsx](src/components/offline-mode-indicator.tsx))

- Displays connectivity status
- Shows online/offline transitions
- Provides user feedback

### Utilities

#### `offlineStorage` ([offline-storage.ts](src/lib/storage/offline-storage.ts))

- IndexedDB management
- Route data persistence
- Storage quota monitoring

#### `routeCacheManager` ([route-cache-manager.ts](src/lib/utils/route-cache-manager.ts))

- Route caching logic
- Polyline encoding/decoding
- Server synchronization
- Data formatting utilities

### Hooks

#### `useConnectivity` ([useConnectivity.ts](src/lib/hooks/useConnectivity.ts))

- Network status detection
- Connection quality monitoring
- Online/offline event handling

### API Routes

#### `POST /api/routes`

Create or update a route

#### `GET /api/routes`

Get all routes for authenticated user

#### `GET /api/routes/[id]`

Get specific route by ID

#### `DELETE /api/routes`

Delete a route

## Browser Support

### Required Features

- IndexedDB (for offline storage)
- Service Worker API (recommended)
- Online/Offline events
- Geolocation API (optional)

### Tested Browsers

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Storage Limits

- Chrome: ~60% of disk space
- Firefox: ~50% of disk space
- Safari: ~1GB

## Performance Considerations

### Storage Management

The system automatically manages storage:

```typescript
// Clean up routes older than 30 days
await routeCacheManager.cleanupOldRoutes(30);

// Check storage usage
const storage = await routeCacheManager.getStorageInfo();
console.log(`Using ${storage.percentage}% of available storage`);
```

### Best Practices

1. **Cache Selectively**: Only cache routes users will need offline
2. **Regular Cleanup**: Remove old routes automatically
3. **Monitor Storage**: Check quota usage periodically
4. **Optimize Geometry**: Use encoded polylines to reduce size

## Security & Privacy

### Data Protection

- Routes stored locally in IndexedDB
- Server-side authentication for API access
- User-specific route isolation
- No sensitive data in URLs

### Map Provider Compliance

- **No tile caching**: Respects Google Maps ToS
- **API key security**: Use environment variables
- **Rate limiting**: Implement on API routes
- **Usage monitoring**: Track API calls

## Troubleshooting

### Route Not Loading Offline

**Problem**: Route shows "not available offline" message

**Solutions**:

1. Ensure route was saved while online
2. Check IndexedDB in browser DevTools
3. Verify storage quota not exceeded
4. Try clearing browser cache and re-caching

### Map Not Displaying

**Problem**: Google Maps fails to load

**Solutions**:

1. Verify `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set
2. Check API key has required APIs enabled
3. Ensure API key restrictions allow your domain
4. Check browser console for specific errors

### Sync Issues

**Problem**: Changes not syncing when back online

**Solutions**:

1. Check network connectivity
2. Verify API endpoints are accessible
3. Review browser console for 401/403 errors
4. Ensure user session is valid

## Future Enhancements

### Planned Features

- [ ] Geocoding integration for address input
- [ ] Multi-stop route optimization
- [ ] Traffic data caching
- [ ] PWA with service worker
- [ ] Route sharing capabilities
- [ ] Export routes as GPX/KML
- [ ] Elevation profiles
- [ ] Points of interest along route

### Progressive Web App

Add service worker for true offline experience:

```typescript
// public/sw.js
self.addEventListener("fetch", (event) => {
  // Cache API responses for offline access
});
```

Register in your app:

```typescript
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}
```

## Contributing

When contributing to route visualization:

1. Follow existing patterns for online/offline switching
2. Test thoroughly in offline mode
3. Respect map provider ToS (no tile caching)
4. Keep storage usage minimal
5. Add tests for new features

## License

This feature is part of the Travellers project. See main LICENSE file.

## Resources

- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript)
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API)
- [Online/Offline Events](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine)
