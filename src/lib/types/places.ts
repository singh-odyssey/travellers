/**
 * Type definitions for Google Places integration
 */

export interface PlaceLocation {
  address: string;
  lat: number;
  lng: number;
  placeId: string;
  city?: string;
  country?: string;
}

export interface PlaceAutocompleteResult {
  description: string;
  place_id: string;
  structured_formatting?: {
    main_text: string;
    secondary_text: string;
  };
}

export interface GeocodeResult {
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  place_id: string;
  address_components: Array<{
    long_name: string;
    short_name: string;
    types: string[];
  }>;
}