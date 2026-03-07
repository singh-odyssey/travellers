/**
 * Google Maps Route Visualization Component
 * Interactive map with route rendering for online mode
 */

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import type { Location, RouteWaypoint } from '@/lib/types/route';

interface GoogleMapsRouteProps {
  origin: Location;
  destination: Location;
  waypoints?: RouteWaypoint[];
  onRouteCalculated?: (route: {
    distance: number;
    duration: number;
    encodedPolyline: string;
  }) => void;
  className?: string;
}

export function GoogleMapsRoute({
  origin,
  destination,
  waypoints = [],
  onRouteCalculated,
  className = '',
}: GoogleMapsRouteProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      setError('Google Maps API key not configured');
      setIsLoading(false);
      return;
    }

    const loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places', 'geometry'],
    });

    loader
      .load()
      .then((google) => {
        if (!mapRef.current) return;

        // Initialize map
        const map = new google.maps.Map(mapRef.current, {
          zoom: 10,
          center: origin,
          mapTypeControl: true,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
        });

        mapInstanceRef.current = map;

        // Initialize directions service and renderer
        directionsServiceRef.current = new google.maps.DirectionsService();
        directionsRendererRef.current = new google.maps.DirectionsRenderer({
          map,
          suppressMarkers: false,
          polylineOptions: {
            strokeColor: '#3b82f6',
            strokeWeight: 5,
            strokeOpacity: 0.8,
          },
        });

        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load Google Maps:', error);
        setError('Failed to load Google Maps');
        setIsLoading(false);
      });
  }, [origin]);

  useEffect(() => {
    if (!directionsServiceRef.current || !directionsRendererRef.current) {
      return;
    }

    // Calculate and display route
    const request: google.maps.DirectionsRequest = {
      origin: new google.maps.LatLng(origin.lat, origin.lng),
      destination: new google.maps.LatLng(destination.lat, destination.lng),
      waypoints: waypoints.map(wp => ({
        location: new google.maps.LatLng(wp.location.lat, wp.location.lng),
        stopover: wp.stopover,
      })),
      travelMode: google.maps.TravelMode.DRIVING,
      optimizeWaypoints: true,
    };

    directionsServiceRef.current.route(request, (result, status) => {
      if (status === 'OK' && result) {
        directionsRendererRef.current?.setDirections(result);

        // Extract route information
        const route = result.routes[0];
        if (route) {
          let totalDistance = 0;
          let totalDuration = 0;

          route.legs.forEach(leg => {
            if (leg.distance) totalDistance += leg.distance.value;
            if (leg.duration) totalDuration += leg.duration.value;
          });

          const encodedPolyline = route.overview_polyline;

          if (onRouteCalculated && encodedPolyline) {
            onRouteCalculated({
              distance: totalDistance,
              duration: totalDuration,
              encodedPolyline,
            });
          }
        }
      } else {
        console.error('Directions request failed:', status);
        setError(`Failed to calculate route: ${status}`);
      }
    });
  }, [origin, destination, waypoints, onRouteCalculated]);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 ${className}`}>
        <div className="text-center p-8">
          <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Please check your configuration and try again
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-10">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading map...</p>
          </div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
