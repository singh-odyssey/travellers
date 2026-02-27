'use client';

import React, { useState } from 'react';
import { GoogleMapsRoute } from '@/components/google-maps-route';
import { routeCacheManager } from '@/lib/utils/route-cache-manager';
import type { Location, RouteMetadata } from '@/lib/types/route';
import { PlaceAutocomplete } from '@/components/place-autocomplete';
import type { PlaceLocation } from '@/lib/types/places';
import { ArrowLeft, Save, MapPin } from "lucide-react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NewRouteClient({ userId }: { userId: string }) {
  const router = useRouter();
  
  // Form fields
  const [tripName, setTripName] = useState('');
  const [notes, setNotes] = useState('');
  
  // Location inputs
  const [originInput, setOriginInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [originAddress, setOriginAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  
  // Location objects
  const [origin, setOrigin] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  
  // Route data
  const [routeData, setRouteData] = useState<{
    distance: number;
    duration: number;
    encodedPolyline: string;
  } | null>(null);
  
  // UI state
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Parse location from input (lat, lng) - fallback for manual entry
  const parseLocation = (input: string): Location | null => {
    const parts = input.split(',').map((s) => s.trim());
    if (parts.length === 2) {
      const lat = parseFloat(parts[0]);
      const lng = parseFloat(parts[1]);
      if (!isNaN(lat) && !isNaN(lng)) {
        return { lat, lng };
      }
    }
    return null;
  };

  // Handle place selection from Google Places autocomplete
  const handleOriginPlaceSelect = (location: PlaceLocation) => {
    setOrigin({ lat: location.lat, lng: location.lng });
    setOriginInput(location.address);
    setOriginAddress(location.address);
  };

  const handleDestinationPlaceSelect = (location: PlaceLocation) => {
    setDestination({ lat: location.lat, lng: location.lng });
    setDestinationInput(location.address);
    setDestinationAddress(location.address);
  };

  // Handle manual input (for coordinate fallback)
  const handleOriginManualInput = (value: string) => {
    setOriginInput(value);
    const loc = parseLocation(value);
    if (loc) {
      setOrigin(loc);
      setOriginAddress(''); // Clear address when using coordinates
    }
  };

  const handleDestinationManualInput = (value: string) => {
    setDestinationInput(value);
    const loc = parseLocation(value);
    if (loc) {
      setDestination(loc);
      setDestinationAddress(''); // Clear address when using coordinates
    }
  };

  // Save route
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
        userId,
        origin,
        destination,
        originName: originAddress || originInput,
        destinationName: destinationAddress || destinationInput,
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

  // Demo route
  const useDemoRoute = () => {
    const demoOrigin = { lat: 40.7128, lng: -74.006 }; // New York
    const demoDestination = { lat: 38.9072, lng: -77.0369 }; // Washington DC

    setOrigin(demoOrigin);
    setDestination(demoDestination);
    setOriginInput('New York, NY, USA');
    setDestinationInput('Washington, DC, USA');
    setOriginAddress('New York, NY, USA');
    setDestinationAddress('Washington, DC, USA');
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
                  Search for any address or enter coordinates
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
                  <PlaceAutocomplete
                    id="origin-input"
                    label="Starting Location"
                    value={originInput}
                    onChange={handleOriginManualInput}
                    onPlaceSelect={handleOriginPlaceSelect}
                    placeholder="Search for starting location"
                    required
                  />
                </div>

                <div>
                  <PlaceAutocomplete
                    id="destination-input"
                    label="Destination"
                    value={destinationInput}
                    onChange={handleDestinationManualInput}
                    onPlaceSelect={handleDestinationPlaceSelect}
                    placeholder="Search for destination"
                    required
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
                      <span className="text-gray-600 dark:text-gray-400">
                        Distance:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {routeCacheManager.formatDistance(routeData.distance)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Duration:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {routeCacheManager.formatDuration(routeData.duration)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    {error}
                  </p>
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
                      Search for locations to see route on map
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      You can also enter coordinates: latitude, longitude
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