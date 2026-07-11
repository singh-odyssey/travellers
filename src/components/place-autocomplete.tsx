'use client';

import type { PlaceLocation } from '@/lib/types/places';

interface Props {
  id?: string;
  label?: string;
  value: string;
  placeholder?: string;
  required?: boolean;

  onChange: (value: string) => void;
  onPlaceSelect: (place: PlaceLocation) => void;
}

export function PlaceAutocomplete({
  id,
  label,
  value,
  placeholder,
  required,
  onChange,
  onPlaceSelect,
}: Props) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium">
          {label}
        </label>
      )}

      <input
        id={id}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => {
          const text = e.target.value;

          onChange(text);

          const parts = text.split(',');

          if (parts.length === 2) {
            const lat = Number(parts[0].trim());
            const lng = Number(parts[1].trim());

            if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
              onPlaceSelect({
                address: text,
                lat,
                lng,
                placeId: '',
              });
            }
          }
        }}
        className="w-full rounded-lg border border-gray-300 px-4 py-2"
      />

      <p className="text-xs text-gray-500">
        Enter coordinates like:
        <br />
        20.2961, 85.8245
      </p>
    </div>
  );
}