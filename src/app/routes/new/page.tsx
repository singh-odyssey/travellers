/**
 * New Route Page - Create and plan a new route
 */

'use client';

import React, { useState } from 'react';
import { GoogleMapsRoute } from '@/components/google-maps-route';
import { routeCacheManager } from '@/lib/utils/route-cache-manager';
import type { Location, RouteMetadata } from '@/lib/types/route';
import { ArrowLeft, Save, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NewRoutePage() {
  const router = useRouter();
  const [tripName, setTripName] = useState('');
  const [originInput, setOriginInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [notes, setNotes] = useState('');
  
  const [origin, setOrigin] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [routeData, setRouteData] = useState<{
    distance: number;
    duration: number;
    encodedPolyline: string;
  } | null>(null);
  
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Parse location from input (lat, lng)
  const parseLocation = (input: string): Location | null => {
    const parts = input.split(',').map(s => s.trim());
    if (parts.length === 2) {
      const lat = parseFloat(parts[0]);
      const lng = parseFloat(parts[1]);
      if (!isNaN(lat) && !isNaN(lng)) {
        return { lat, lng };
      }
    }
    return null;
  };

  const handleOriginChange = (value: string) => {
    setOriginInput(value);
    const loc = parseLocation(value);
    if (loc) {
      setOrigin(loc);
    }
  };

  const handleDestinationChange = (value: string) => {
    setDestinationInput(value);
    const loc = parseLocation(value);
    if (loc) {
      setDestination(loc);
    }
  };

  const handleSaveRoute = async () => {
    if (!origin || !destination || !routeData) {
      setError('Please set origin and destination');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const route: RouteMetadata = {
        id: crypto.randomUUID(),
        userId: 'current-user', // This should come from session
        origin,
        destination,
        originName: originInput,
        destinationName: destinationInput,
        distance: routeData.distance,
        duration: routeData.duration,
        encodedPolyline: routeData.encodedPolyline,
        tripName: tripName || 'Unnamed Route',
        notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Save to server and cache
      await routeCacheManager.syncRoute(route);
      
      alert('Route saved successfully!');
      router.push('/routes');
    } catch (err) {
      console.error('Failed to save route:', err);
      setError('Failed to save route. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Demo locations
  const useDemoRoute = () => {
    const demoOrigin = { lat: 40.7128, lng: -74.0060 }; // New York
    const demoDestination = { lat: 38.9072, lng: -77.0369 }; // Washington DC
    
    setOriginInput(`${demoOrigin.lat}, ${demoOrigin.lng}`);
    setDestinationInput(`${demoDestination.lat}, ${demoDestination.lng}`);
    setOrigin(demoOrigin);
    setDestination(demoDestination);
    setTripName('New York to Washington DC');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/routes"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Create New Route
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Plan your journey and save for offline access
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Form */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Route Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Trip Name
                  </label>
                  <input
                    type="text"
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)}
                    placeholder="e.g., Weekend Road Trip"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Origin (lat, lng)
                  </label>
                  <input
                    type="text"
                    value={originInput}
                    onChange={(e) => handleOriginChange(e.target.value)}
                    placeholder="40.7128, -74.0060"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Destination (lat, lng)
                  </label>
                  <input
                    type="text"
                    value={destinationInput}
                    onChange={(e) => handleDestinationChange(e.target.value)}
                    placeholder="38.9072, -77.0369"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any notes about this route..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={useDemoRoute}
                  className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-lg transition-colors text-sm font-medium"
                >
                  Use Demo Route (NYC → DC)
                </button>
              </div>

              {routeData && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Route Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Distance:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {routeCacheManager.formatDistance(routeData.distance)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {routeCacheManager.formatDuration(routeData.duration)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                </div>
              )}

              <button
                onClick={handleSaveRoute}
                disabled={!origin || !destination || !routeData || isSaving}
                className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
              >
                <Save className="w-5 h-5" />
                <span>{isSaving ? 'Saving...' : 'Save Route'}</span>
              </button>
            </div>
          </div>

          {/* Map Preview */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-[calc(100vh-200px)]">
              {origin && destination ? (
                <GoogleMapsRoute
                  origin={origin}
                  destination={destination}
                  onRouteCalculated={setRouteData}
                  className="w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-900">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      Enter origin and destination coordinates
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Format: latitude, longitude (e.g., 40.7128, -74.0060)
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
