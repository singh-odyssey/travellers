/**
 * Offline Route Renderer
 * SVG-based route visualization for offline mode
 * No map tiles cached - respects ToS
 */

'use client';

import React, { useMemo } from 'react';
import type { Location, BoundingBox, RouteGeometry } from '@/lib/types/route';

interface OfflineRouteRendererProps {
  geometry: RouteGeometry;
  origin: Location;
  destination: Location;
  className?: string;
  showGrid?: boolean;
}

export function OfflineRouteRenderer({
  geometry,
  origin,
  destination,
  className = '',
  showGrid = false,
}: OfflineRouteRendererProps) {
  const { bbox, svgPath, viewBox, originSVG, destinationSVG } = useMemo(() => {
    const coords = geometry.coordinates;
    
    // Calculate bounding box
    const lats = coords.map(c => c[1]);
    const lngs = coords.map(c => c[0]);
    
    const bbox: BoundingBox = {
      north: Math.max(...lats),
      south: Math.min(...lats),
      east: Math.max(...lngs),
      west: Math.min(...lngs),
    };

    // Add padding (10%)
    const latPadding = (bbox.north - bbox.south) * 0.1;
    const lngPadding = (bbox.east - bbox.west) * 0.1;
    
    bbox.north += latPadding;
    bbox.south -= latPadding;
    bbox.east += lngPadding;
    bbox.west -= lngPadding;

    // Map coordinates to SVG space (0-1000)
    const WIDTH = 1000;
    const HEIGHT = 1000;
    
    const mapToSVG = (coord: [number, number]): [number, number] => {
      const [lng, lat] = coord;
      const x = ((lng - bbox.west) / (bbox.east - bbox.west)) * WIDTH;
      const y = ((bbox.north - lat) / (bbox.north - bbox.south)) * HEIGHT;
      return [x, y];
    };

    // Create SVG path
    const svgCoords = coords.map(mapToSVG);
    const svgPath = svgCoords
      .map((coord, i) => `${i === 0 ? 'M' : 'L'} ${coord[0]},${coord[1]}`)
      .join(' ');

    // Calculate origin and destination positions
    const originSVG = mapToSVG([origin.lng, origin.lat]);
    const destinationSVG = mapToSVG([destination.lng, destination.lat]);

    return {
      bbox,
      svgPath,
      viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
      originSVG,
      destinationSVG,
    };
  }, [geometry, origin, destination]);

  return (
    <div className={`relative w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 ${className}`}>
      <svg
        viewBox={viewBox}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Gradient for route line */}
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
          </linearGradient>

          {/* Drop shadow for markers */}
          <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="0" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid background (optional) */}
        {showGrid && (
          <g className="opacity-20">
            {Array.from({ length: 10 }).map((_, i) => (
              <React.Fragment key={i}>
                <line
                  x1={0}
                  y1={(i * 1000) / 10}
                  x2={1000}
                  y2={(i * 1000) / 10}
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-gray-400"
                />
                <line
                  x1={(i * 1000) / 10}
                  y1={0}
                  x2={(i * 1000) / 10}
                  y2={1000}
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-gray-400"
                />
              </React.Fragment>
            ))}
          </g>
        )}

        {/* Route path */}
        <path
          d={svgPath}
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Origin marker (green) */}
        <g transform={`translate(${originSVG[0]},${originSVG[1]})`} filter="url(#dropShadow)">
          <circle cx="0" cy="0" r="18" fill="#22c55e" />
          <circle cx="0" cy="0" r="12" fill="white" />
        </g>

        {/* Destination marker (red) */}
        <g transform={`translate(${destinationSVG[0]},${destinationSVG[1]})`} filter="url(#dropShadow)">
          <circle cx="0" cy="0" r="18" fill="#ef4444" />
          <circle cx="0" cy="0" r="12" fill="white" />
          <circle cx="0" cy="0" r="6" fill="#ef4444" />
        </g>
      </svg>

      {/* Offline mode indicator overlay */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
          Offline Mode
        </span>
      </div>
    </div>
  );
}
