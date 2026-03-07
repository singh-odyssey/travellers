/**
 * PWA Initialization Component
 * Registers service worker and handles PWA features
 */

'use client';

import { useEffect } from 'react';
import { serviceWorkerManager } from '@/lib/utils/service-worker';
import { PWAInstaller } from './pwa-installer';

export function PWAProvider() {
  useEffect(() => {
    // Register service worker
    if (typeof window !== 'undefined') {
      serviceWorkerManager.register().then((registered) => {
        if (registered) {
          console.log('[PWA] Service worker registered successfully');
        }
      });

      // Listen for update available
      serviceWorkerManager.on('UPDATE_AVAILABLE', () => {
        console.log('[PWA] New version available');
        // You can show a notification here
        if (confirm('A new version is available. Reload to update?')) {
          serviceWorkerManager.skipWaiting();
          window.location.reload();
        }
      });

      // Listen for sync requests from service worker
      serviceWorkerManager.on('SYNC_ROUTES', () => {
        console.log('[PWA] Sync requested by service worker');
        // Trigger route sync in your app
        window.dispatchEvent(new CustomEvent('pwa-sync-routes'));
      });
    }

    return () => {
      // Cleanup listeners if needed
    };
  }, []);

  return <PWAInstaller />;
}
