# PWA Setup for travellersmeet

This document explains the Progressive Web App (PWA) implementation for travellersmeet.

## What's Been Added

### 1. Web App Manifest (`/public/manifest.json`)
- Defines app metadata (name, description, colors)
- Specifies app icons for different sizes
- Configures display mode as "standalone" for app-like experience
- Sets theme colors matching the app's branding

### 2. Service Worker (`/public/sw.js`)
- Enables offline functionality
- Implements caching strategy for faster load times
- Supports push notifications (optional feature)
- Handles app updates gracefully

### 3. PWA Registration Component (`/src/components/pwa-register.tsx`)
- Client-side component that registers the service worker
- Runs automatically when the app loads
- Logs registration status to console

### 4. Updated Layout (`/src/app/layout.tsx`)
- Added PWA metadata (manifest link, theme colors, viewport settings)
- Included Apple-specific meta tags for iOS support
- Integrated PWA registration component

### 5. Next.js Configuration (`next.config.js`)
- Added proper headers for service worker
- Configured caching policies for PWA assets

### Generating App Icons

We have generated **SVG icons** which are supported by modern browsers and scale perfectly to any size.

The icons are located in `/public/icon-*.svg`.

If you need PNG icons for legacy browser support (e.g. older iOS versions):
1. Open `http://localhost:3000/generate-icons.html`
2. Generate and download PNG versions
3. Replace the SVG files in `/public`
4. Update `manifest.json` to point to `.png` files

## Testing PWA Installation

### Desktop (Chrome/Edge)
1. Run server: `npm run dev`
2. Open `http://localhost:3000`
3. Look for install icon in address bar
4. If not appearing: Open DevTools > Application > Manifest to debug

### Mobile (Android)
1. Deploy your app to a hosting service (Vercel, Netlify, etc.)
2. **Important:** PWA requires HTTPS in production
3. Open the site in Chrome on Android
4. Tap the menu (⋮) and select "Add to Home Screen"
5. The app will appear on your home screen like a native app

### Mobile (iOS)
1. Deploy your app with HTTPS
2. Open the site in Safari on iOS
3. Tap the Share button
4. Select "Add to Home Screen"
5. The app will appear on your home screen

## PWA Requirements Checklist

- [x] Web App Manifest file
- [x] Service Worker for offline support
- [x] HTTPS (required in production)
- [ ] App icons (need to be generated - see above)
- [x] Proper meta tags
- [x] Responsive design
- [x] Fast load times

## Deployment Considerations

### HTTPS Requirement
PWAs **must** be served over HTTPS in production. Most hosting platforms provide this automatically:
- ✅ Vercel
- ✅ Netlify
- ✅ GitHub Pages
- ✅ Firebase Hosting
- ✅ Cloudflare Pages

### Testing in Production
After deploying:
1. Open Chrome DevTools
2. Go to Application tab
3. Check "Manifest" section - should show all metadata
4. Check "Service Workers" section - should show registered worker
5. Run Lighthouse audit for PWA score

### Common Issues

**Issue:** Install prompt doesn't appear
- **Solution:** Ensure all icons are present and manifest is valid
- **Solution:** Check that service worker is registered successfully
- **Solution:** Verify HTTPS in production

**Issue:** Service worker not updating
- **Solution:** Clear browser cache and service worker
- **Solution:** Update CACHE_NAME in sw.js to force update

**Issue:** Icons not showing
- **Solution:** Verify icon files exist in /public directory
- **Solution:** Check manifest.json paths are correct
- **Solution:** Clear browser cache

## Next Steps

1. **Generate Icons:** Use the icon generator tool or create custom icons
2. **Test Locally:** Run `npm run dev` and test installation
3. **Deploy:** Push to your hosting platform
4. **Verify:** Test PWA installation on mobile and desktop
5. **Optimize:** Run Lighthouse audit and address any issues

## Resources

- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [PWA Builder](https://www.pwabuilder.com/)
