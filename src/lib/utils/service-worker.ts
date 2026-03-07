/**
 * Service Worker Registration Utility
 * Lightweight PWA enhancement for offline-first experience
 */

'use client';

export interface ServiceWorkerMessage {
  type: string;
  data?: any;
  timestamp?: number;
}

class ServiceWorkerManager {
  private registration: ServiceWorkerRegistration | null = null;
  private listeners: Map<string, Set<(data: any) => void>> = new Map();

  /**
   * Register the service worker
   */
  async register(): Promise<boolean> {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      console.log('[PWA] Service Worker not supported');
      return false;
    }

    try {
      this.registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      console.log('[PWA] Service Worker registered:', this.registration.scope);

      // Handle updates
      this.registration.addEventListener('updatefound', () => {
        const newWorker = this.registration?.installing;
        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New service worker available
            this.notifyListeners('UPDATE_AVAILABLE', { newWorker });
          }
        });
      });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        this.handleMessage(event.data);
      });

      // Check for updates periodically
      setInterval(() => {
        this.registration?.update();
      }, 60 * 60 * 1000); // Check every hour

      return true;
    } catch (error) {
      console.error('[PWA] Service Worker registration failed:', error);
      return false;
    }
  }

  /**
   * Unregister the service worker
   */
  async unregister(): Promise<boolean> {
    if (!this.registration) return false;

    try {
      await this.registration.unregister();
      console.log('[PWA] Service Worker unregistered');
      return true;
    } catch (error) {
      console.error('[PWA] Service Worker unregister failed:', error);
      return false;
    }
  }

  /**
   * Update service worker immediately
   */
  async update(): Promise<void> {
    if (!this.registration) return;
    await this.registration.update();
  }

  /**
   * Skip waiting and activate new service worker
   */
  skipWaiting(): void {
    if (!this.registration?.waiting) return;

    this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
  }

  /**
   * Send message to service worker
   */
  postMessage(message: ServiceWorkerMessage): void {
    if (!navigator.serviceWorker.controller) {
      console.warn('[PWA] No active service worker');
      return;
    }

    navigator.serviceWorker.controller.postMessage(message);
  }

  /**
   * Cache routes data in service worker
   */
  cacheRoutes(routes: any[]): void {
    this.postMessage({
      type: 'CACHE_ROUTES',
      data: { routes },
      timestamp: Date.now(),
    });
  }

  /**
   * Trigger background sync
   */
  async syncRoutes(): Promise<void> {
    if (!this.registration || !('sync' in this.registration)) {
      console.warn('[PWA] Background Sync not supported');
      return;
    }

    try {
      await (this.registration as any).sync.register('sync-routes');
      console.log('[PWA] Background sync registered');
    } catch (error) {
      console.error('[PWA] Background sync failed:', error);
    }
  }

  /**
   * Add event listener
   */
  on(event: string, callback: (data: any) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)?.add(callback);
  }

  /**
   * Remove event listener
   */
  off(event: string, callback: (data: any) => void): void {
    this.listeners.get(event)?.delete(callback);
  }

  /**
   * Handle incoming messages from service worker
   */
  private handleMessage(message: ServiceWorkerMessage): void {
    console.log('[PWA] Message from SW:', message);
    this.notifyListeners(message.type, message.data);
  }

  /**
   * Notify all listeners for an event
   */
  private notifyListeners(event: string, data: any): void {
    const callbacks = this.listeners.get(event);
    if (!callbacks) return;

    callbacks.forEach((callback) => {
      try {
        callback(data);
      } catch (error) {
        console.error('[PWA] Listener error:', error);
      }
    });
  }

  /**
   * Check if service worker is active
   */
  isActive(): boolean {
    return !!navigator.serviceWorker?.controller;
  }

  /**
   * Get registration
   */
  getRegistration(): ServiceWorkerRegistration | null {
    return this.registration;
  }
}

export const serviceWorkerManager = new ServiceWorkerManager();

/**
 * Hook for using service worker in React components
 */
export function useServiceWorker() {
  if (typeof window === 'undefined') {
    return {
      isSupported: false,
      isActive: false,
      register: async () => false,
      unregister: async () => false,
    };
  }

  return {
    isSupported: 'serviceWorker' in navigator,
    isActive: serviceWorkerManager.isActive(),
    register: () => serviceWorkerManager.register(),
    unregister: () => serviceWorkerManager.unregister(),
    update: () => serviceWorkerManager.update(),
    skipWaiting: () => serviceWorkerManager.skipWaiting(),
    cacheRoutes: (routes: any[]) => serviceWorkerManager.cacheRoutes(routes),
    syncRoutes: () => serviceWorkerManager.syncRoutes(),
    on: (event: string, callback: (data: any) => void) => serviceWorkerManager.on(event, callback),
    off: (event: string, callback: (data: any) => void) => serviceWorkerManager.off(event, callback),
  };
}
