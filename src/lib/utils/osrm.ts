import polyline from "@mapbox/polyline";
import type { Location } from "@/lib/types/route";

export interface OSRMRoute {
  distance: number;
  duration: number;
  encodedPolyline: string;
  coordinates: [number, number][];
}

export async function getRoute(
  origin: Location,
  destination: Location
): Promise<OSRMRoute> {
  const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=polyline`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch route");
  }

  const data = await response.json();
  console.log(data);

  if (!data.routes?.length) {
    throw new Error("No route found");
  }

  const route = data.routes[0];
  console.log(route);

  return {
    distance: route.distance,
    duration: route.duration,
    encodedPolyline: route.geometry,
    coordinates: polyline.decode(route.geometry).map(
      ([lat, lng]: [number, number]) => [lng, lat] as [number, number]
    ),
  };
}