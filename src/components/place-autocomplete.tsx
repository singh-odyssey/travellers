/**
 * Google Places Autocomplete Component
 * Provides real-time address search using Google Places API
 */

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin, X, Loader2 } from "lucide-react";

export interface PlaceLocation {
  address: string;
  lat: number;
  lng: number;
  placeId: string;
  city?: string;
  country?: string;
}

export interface PlaceAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect: (location: PlaceLocation) => void;
  placeholder?: string;
  label?: string;
  id?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  types?: string[]; // e.g., ['geocode', 'establishment']
}

export function PlaceAutocomplete({
  value,
  onChange,
  onPlaceSelect,
  placeholder = 'Search for a location...',
  label,
  id = 'place-autocomplete',
  className = '',
  required = false,
  disabled = false,
  types = ['geocode', 'establishment'],
}: PlaceAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isApiLoaded, setIsApiLoaded] = useState(false);
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
      libraries: ['places'],
    });

    loader
      .load()
      .then(() => {
        setIsApiLoaded(true);
        setIsLoading(false);
        
        if (inputRef.current) {
          const autocomplete = new google.maps.places.Autocomplete(
            inputRef.current,
            {
              types,
              fields: [
                'formatted_address',
                'geometry',
                'place_id',
                'name',
                'address_components',
              ],
            }
          );

          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();

            if (!place.geometry?.location) {
              setError('No location data available for this place');
              return;
            }

            // Extract city and country from address components
            let city: string | undefined;
            let country: string | undefined;

            place.address_components?.forEach((component) => {
              if (component.types.includes('locality')) {
                city = component.long_name;
              }
              if (component.types.includes('country')) {
                country = component.long_name;
              }
            });

            const location: PlaceLocation = {
              address: place.formatted_address || place.name || '',
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
              placeId: place.place_id || '',
              city,
              country,
            };

            onChange(location.address);
            onPlaceSelect(location);
            setError(null);
          });

          autocompleteRef.current = autocomplete;
        }
      })
      .catch((err) => {
        console.error('Failed to load Google Maps API:', err);
        setError('Failed to load Google Maps. Please check your API key.');
        setIsLoading(false);
      });

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [onChange, onPlaceSelect, types]);

  const handleClear = () => {
    onChange('');
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setError(null);
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPin className="h-5 w-5 text-gray-400" />
        </div>

        <input
          ref={inputRef}
          type="text"
          id={id}
          value={value}
          onChange={handleManualInput}
          placeholder={
            isLoading
              ? 'Loading Google Maps...'
              : error
              ? 'Enter address manually'
              : placeholder
          }
          required={required}
          disabled={disabled || isLoading}
          className={`
            w-full pl-10 pr-10 py-2.5
            border rounded-lg
            ${
              error
                ? 'border-red-300 dark:border-red-600'
                : 'border-gray-300 dark:border-gray-600'
            }
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-gray-100
            placeholder-gray-500 dark:placeholder-gray-400
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all
          `}
          autoComplete="off"
        />

        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
          </div>
        )}

        {!isLoading && value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            tabIndex={-1}
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Helper Text */}
      {!error && !isLoading && isApiLoaded && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Start typing to see address suggestions from Google Places
        </p>
      )}

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
      )}

      {/* Fallback instruction */}
      {error && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          You can still enter coordinates manually (latitude, longitude)
        </p>
      )}
    </div>
  );
}