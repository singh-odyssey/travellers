/**
 * Offline Mode Indicator Component
 * Shows connectivity status and provides feedback
 */

'use client';

import React from 'react';
import { useConnectivity } from '@/lib/hooks/useConnectivity';
import { WifiOff, Wifi, Cloud, CloudOff } from "lucide-react";

interface OfflineModeIndicatorProps {
  showWhenOnline?: boolean;
  position?: 'top' | 'bottom';
  variant?: 'compact' | 'full';
}

export function OfflineModeIndicator({
  showWhenOnline = false,
  position = 'top',
  variant = 'compact',
}: OfflineModeIndicatorProps) {
  const { isOnline, wasOffline, effectiveType } = useConnectivity();

  // Show reconnection message briefly
  const [showReconnected, setShowReconnected] = React.useState(false);

  React.useEffect(() => {
    if (isOnline && wasOffline) {
      setShowReconnected(true);
      const timer = setTimeout(() => setShowReconnected(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  // Don't show when online unless explicitly requested
  if (isOnline && !showWhenOnline && !showReconnected) {
    return null;
  }

  const positionClasses = position === 'top' ? 'top-4' : 'bottom-4';
  
  return (
    <div className={`fixed ${positionClasses} left-1/2 -translate-x-1/2 z-50 transition-all duration-300`}>
      <div
        className={`
          flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border backdrop-blur-sm
          ${isOnline
            ? 'bg-green-50/95 dark:bg-green-900/95 border-green-200 dark:border-green-700'
            : 'bg-amber-50/95 dark:bg-amber-900/95 border-amber-200 dark:border-amber-700'
          }
          ${variant === 'compact' ? 'text-sm' : 'text-base'}
        `}
      >
        {/* Icon */}
        <div className={`
          ${isOnline ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}
        `}>
          {isOnline ? (
            showReconnected ? (
              <Cloud className="w-5 h-5 animate-pulse" />
            ) : (
              <Wifi className="w-5 h-5" />
            )
          ) : (
            <WifiOff className="w-5 h-5 animate-pulse" />
          )}
        </div>

        {/* Message */}
        <div className="flex flex-col">
          {isOnline ? (
            showReconnected ? (
              <>
                <span className="font-semibold text-green-900 dark:text-green-100">
                  Back Online
                </span>
                {variant === 'full' && (
                  <span className="text-xs text-green-700 dark:text-green-300">
                    Syncing your data...
                  </span>
                )}
              </>
            ) : (
              <>
                <span className="font-semibold text-green-900 dark:text-green-100">
                  Online
                </span>
                {variant === 'full' && effectiveType && (
                  <span className="text-xs text-green-700 dark:text-green-300">
                    Connection: {effectiveType}
                  </span>
                )}
              </>
            )
          ) : (
            <>
              <span className="font-semibold text-amber-900 dark:text-amber-100">
                Offline Mode
              </span>
              {variant === 'full' && (
                <span className="text-xs text-amber-700 dark:text-amber-300">
                  Viewing cached data
                </span>
              )}
            </>
          )}
        </div>

        {/* Pulse indicator */}
        {!isOnline && (
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Compact Badge Variant for tight spaces
 */
export function OfflineModeBadge() {
  const { isOnline } = useConnectivity();

  return (
    <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md text-xs font-medium border">
      <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`} />
      <span>{isOnline ? 'Online' : 'Offline'}</span>
    </div>
  );
}
