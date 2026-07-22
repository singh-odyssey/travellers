'use client';

import React, { useState } from 'react';
import { MapLibreRoute } from '@/components/maplibre-route';
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

  return <div>Hello</div>;
}