/**
 * Connectivity Monitor Hook
 * Detects online/offline status and provides network state
 */

'use client';

import { useState, useEffect } from 'react';

interface ConnectivityState {
  isOnline: boolean;
  wasOffline: boolean;
  effectiveType?: string;
  downlink?: number;
}

export function useConnectivity(): ConnectivityState {
  const [state, setState] = useState<ConnectivityState>({
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    wasOffline: false,
  });

  useEffect(() => {
    const handleOnline = () => {
      setState(prev => ({
        isOnline: true,
        wasOffline: !prev.isOnline,
        effectiveType: getEffectiveType(),
        downlink: getDownlink(),
      }));
    };

    const handleOffline = () => {
      setState(prev => ({
        ...prev,
        isOnline: false,
      }));
    };

    const handleConnectionChange = () => {
      setState(prev => ({
        ...prev,
        effectiveType: getEffectiveType(),
        downlink: getDownlink(),
      }));
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Network Information API (if available)
    const connection = getConnection();
    if (connection) {
      connection.addEventListener('change', handleConnectionChange);
    }

    // Initial state
    setState({
      isOnline: navigator.onLine,
      wasOffline: false,
      effectiveType: getEffectiveType(),
      downlink: getDownlink(),
    });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      
      if (connection) {
        connection.removeEventListener('change', handleConnectionChange);
      }
    };
  }, []);

  return state;
}

function getConnection(): any {
  if (typeof navigator !== 'undefined') {
    return (
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection
    );
  }
  return null;
}

function getEffectiveType(): string | undefined {
  const connection = getConnection();
  return connection?.effectiveType;
}

function getDownlink(): number | undefined {
  const connection = getConnection();
  return connection?.downlink;
}
