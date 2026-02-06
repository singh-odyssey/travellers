# Quick Setup Guide - Offline Route Visualization

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Add to your `.env.local` file:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

**Get your Google Maps API Key:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable these APIs:
   - Maps JavaScript API
   - Directions API
4. Go to Credentials → Create Credentials → API Key
5. Copy the API key
6. **Important**: Restrict the API key:
   - Application restrictions: HTTP referrers
   - Add your domains: `localhost:3000`, `yourdomain.com`

### 3. Update Database

```bash
npm run prisma db push
```

This adds the `Route` model to your database.

### 4. Run Development Server

```bash
npm run dev
```

### 5. Test the Feature

1. Navigate to `http://localhost:3000/routes`
2. Click "New Route"
3. Use the demo route or enter coordinates:
   - Origin: `40.7128, -74.0060` (New York)
   - Destination: `38.9072, -77.0369` (Washington DC)
4. View the route on Google Maps
5. Save the route
6. **Test Offline**:
   - Open Chrome DevTools (F12)
   - Go to Network tab
   - Select "Offline" from the throttling dropdown
   - Refresh the page
   - Your saved route should still be visible!

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── routes/
│   │       ├── route.ts              # API endpoints
│   │       └── [id]/route.ts         # Get route by ID
│   └── routes/
│       ├── page.tsx                  # Routes list page
│       └── new/
│           └── page.tsx              # Create route page
├── components/
│   ├── google-maps-route.tsx         # Google Maps component
│   ├── offline-route-renderer.tsx    # SVG offline renderer
│   ├── route-viewer.tsx              # Smart viewer switcher
│   └── offline-mode-indicator.tsx    # Connectivity indicator
└── lib/
    ├── hooks/
    │   └── useConnectivity.ts        # Network status hook
    ├── storage/
    │   └── offline-storage.ts        # IndexedDB manager
    ├── types/
    │   └── route.ts                  # TypeScript types
    └── utils/
        └── route-cache-manager.ts    # Cache management
```

## Common Issues

### "Google Maps API key not configured"

- Check `.env.local` has `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- Restart dev server after adding env variable
- Verify the key starts with `NEXT_PUBLIC_`

### "Failed to load Google Maps"

- Check API key is valid
- Ensure Maps JavaScript API is enabled
- Check for API key restrictions
- Look for errors in browser console

### Route not saving

- Check database connection
- Ensure Prisma schema is updated
- Check browser console for errors
- Verify user authentication

### Offline mode not working

- Clear browser data and retry
- Check IndexedDB in DevTools → Application tab
- Ensure route was saved while online
- Check storage quota

## Testing Offline Mode

### Method 1: Chrome DevTools

1. Open DevTools (F12)
2. Network tab → Throttling → Offline
3. Navigate to saved routes

### Method 2: Airplane Mode

1. Save some routes while online
2. Enable airplane mode on your device
3. Routes should still be viewable

### Method 3: Disconnect Network

1. Disconnect WiFi/Ethernet
2. Test route viewing

## Next Steps

- Read [full documentation](./OFFLINE_ROUTE_VISUALIZATION.md)
- Add navigation links to your app
- Customize the UI/styling
- Add more route features (waypoints, etc.)
- Implement user authentication checks
- Add route sharing functionality

## Need Help?

- Check browser console for errors
- Review the full documentation
- Check Google Maps API quotas
- Verify database connection
