"use client";

import { MapPin, Navigation, Clock } from "lucide-react";

interface RouteShareCardProps {
  route: {
    id: string;
    tripName: string | null;

    originName: string | null;
    destinationName: string | null;

    originLat: number;
    originLng: number;

    destinationLat: number;
    destinationLng: number;

    distance: number;
    duration: number;

    encodedPolyline: string;
  };

  onView?: () => void;
}

export default function RouteShareCard({
  route,
  onView,
}: RouteShareCardProps) {
  const distanceKm = (route.distance / 1000).toFixed(1);

  const durationMinutes = Math.round(route.duration / 60);

  const hours = Math.floor(durationMinutes / 60);

  const mins = durationMinutes % 60;

  return (
    <div className="mt-2 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-slate-900 overflow-hidden">

      <div className="p-4">

        <div className="flex items-center gap-2 mb-3">

          <Navigation className="w-4 h-4 text-blue-600" />

          <h4 className="font-semibold text-sm">
            {route.tripName || "Shared Route"}
          </h4>

        </div>

        <div className="space-y-2 text-xs">

          <div className="flex items-center gap-2">

            <MapPin className="w-3 h-3 text-green-600" />

            <span>
              {route.originName ??
                `${route.originLat.toFixed(4)}, ${route.originLng.toFixed(4)}`}
            </span>

          </div>

          <div className="flex items-center gap-2">

            <MapPin className="w-3 h-3 text-red-600" />

            <span>
              {route.destinationName ??
                `${route.destinationLat.toFixed(4)}, ${route.destinationLng.toFixed(4)}`}
            </span>

          </div>

          <div className="flex items-center gap-4 pt-2">

            <span>{distanceKm} km</span>

            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />

              {hours > 0
                ? `${hours}h ${mins}m`
                : `${mins} min`}
            </span>

          </div>

        </div>

        <button
          onClick={onView}
          className="mt-4 w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white py-2 text-xs font-semibold transition"
        >
          View Route
        </button>

      </div>

    </div>
  );
}