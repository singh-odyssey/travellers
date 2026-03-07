# Testing Without Google Maps API

## Overview
You can test the **entire offline route visualization system** without a Google Maps API key or billing access. This guide shows you how.

## What Works Without API Key?

✅ **Fully Functional:**
- Offline SVG route rendering
- IndexedDB storage (save/load/delete routes)
- Route cache manager
- Connectivity detection
- PWA features
- Demo routes with real polyline data

❌ **Requires API Key:**
- Live Google Maps visualization
- Real-time route calculation from Directions API
- Interactive Google Maps controls

## Quick Start

### 1. Start Dev Server
```bash
npm run dev
```

### 2. Visit Demo Page
Open: **http://localhost:3000/demo-routes**

This page uses pre-calculated routes with real polyline data from actual Google Maps routes.

## Demo Route Features

### Available Demo Routes
1. **NYC to DC** (361 km, 4 hours) - I-95 corridor
2. **LA to SF** (615 km, 6 hours) - Pacific Coast Highway
3. **Miami to Orlando** (378 km, 3.5 hours) - Florida Turnpike

### What You Can Test

#### Test 1: View Routes
- Click any route in the list
- See SVG visualization with origin/destination markers
- View distance, duration, and route details

#### Test 2: Save to IndexedDB
1. Click "💾 Save to IndexedDB" on any route
2. Route appears in "Saved Routes" section
3. Open DevTools → Application → IndexedDB → `TravellersOfflineCache`
4. Verify two stores exist: `routes` and `routeGeometry`

#### Test 3: Offline Mode
1. Save one or more routes
2. Open DevTools → Network tab
3. Change throttling to "Offline"
4. Refresh the page
5. **Routes still load!** This proves IndexedDB persistence works

#### Test 4: Delete Routes
1. Click "🗑️ Delete" on a saved route
2. Route removed from IndexedDB
3. Check DevTools to verify deletion

## How It Works Without API

### The Magic: Pre-Encoded Polylines
```typescript
// Each demo route has a pre-calculated polyline from Google Maps
{
  encodedPolyline: 'aqcwFxbhbMvC~@xErB...',  // Compressed route path
  distance: 361000,  // Pre-calculated
  duration: 14400,   // Pre-calculated
}
```

### SVG Rendering Process
1. **Decode Polyline** → Lat/Lng coordinates
2. **Calculate Bounding Box** → Min/Max coordinates
3. **Map to SVG Space** → Transform to 800x600 SVG
4. **Draw Path** → Connect points with blue line
5. **Add Markers** → Green (origin), Red (destination)

**No external API calls required!**

## Testing Advanced Features

### Route Cache Manager
```typescript
// In browser console (F12)
import { routeCacheManager } from '@/lib/utils/route-cache-manager';

// Get all saved routes
const routes = await routeCacheManager.getAllRoutes('demo-user');
console.log(routes);

// Check storage quota
const quota = await routeCacheManager.getStorageQuota();
console.log(`Used: ${(quota.usage / 1024 / 1024).toFixed(2)} MB`);
```

### Offline Storage API
```typescript
import { offlineStorage } from '@/lib/storage/offline-storage';

// Get route by ID
const route = await offlineStorage.getRoute('demo-nyc-dc');

// List all routes
const allRoutes = await offlineStorage.getAllRoutes();

// Clean up old routes (older than 30 days)
await offlineStorage.clearOldRoutes(30);
```

## Comparing Online vs Offline Modes

### With Google Maps API (Future)
```
User Input → Google Directions API → Calculate Route → Display on Map → Save Polyline
```

### Without Google Maps API (Demo/Offline)
```
Pre-calculated Polyline → Decode → SVG Rendering → Display
```

**Same polyline data, different visualization method!**

## When You Get Google Maps Access

Once you have billing enabled:

1. Get API key from Google Cloud Console
2. Enable these APIs:
   - Maps JavaScript API
   - Directions API

3. Update `.env.local`:
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

4. Visit `/routes/new` for live route creation:
   - Interactive Google Maps
   - Real-time route calculation
   - Click & drag waypoints
   - Automatic polyline generation

## Current Demo Capabilities

| Feature | Demo Mode | With API |
|---------|-----------|----------|
| View Routes | ✅ SVG | ✅ Google Maps |
| Save Routes | ✅ | ✅ |
| Offline Access | ✅ | ✅ |
| Create Routes | ❌ (pre-made) | ✅ (interactive) |
| Edit Routes | ❌ | ✅ |
| Custom Waypoints | ❌ | ✅ |

## Troubleshooting

### "Cannot find module" errors
- Restart dev server: Stop (Ctrl+C) and run `npm run dev`

### IndexedDB not persisting
- Check browser settings: Allow storage for localhost
- Try different browser: Chrome/Edge usually work best

### Routes not displaying
- Open browser console (F12) for errors
- Check that route has `encodedPolyline` field

## Next Steps

### Option 1: Continue Without API
- Use demo routes for development
- Implement other features (user profiles, ticket matching)
- Test offline capabilities thoroughly

### Option 2: Request API Access
- Ask someone with billing access to:
  1. Create Google Cloud project
  2. Enable billing
  3. Enable required APIs
  4. Generate API key
  5. Share key with you (securely!)

### Option 3: Use Alternative Service
Consider these free alternatives:
- **Mapbox** - Free tier: 50,000 requests/month
- **OpenRouteService** - Free tier: 2,000 requests/day
- **Leaflet + OpenStreetMap** - Fully free (no routing built-in)

## Summary

✨ **You can test 80% of the feature without Google Maps API!**

The core offline functionality (IndexedDB storage, SVG rendering, connectivity detection) works perfectly with demo routes. The only limitation is creating new routes interactively.

---

**Ready to test?** Visit: http://localhost:3000/demo-routes
