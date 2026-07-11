export type TravelRegionId =
  | "asia"
  | "europe"
  | "africa"
  | "americas"
  | "oceania";

export interface TravelRegion {
  id: TravelRegionId;
  name: string;
  latitude: number;
  longitude: number;
  communityCount: number;
  featuredRoute: string;
  travelWindow: string;
  description: string;
}

export const TRAVEL_REGIONS: TravelRegion[] = [
  {
    id: "asia",
    name: "Asia",
    latitude: 28,
    longitude: 92,
    communityCount: 28,
    featuredRoute: "Jaipur → Tokyo",
    travelWindow: "12–18 Aug",
    description: "City explorers, food trails, and culture-first journeys.",
  },
  {
    id: "europe",
    name: "Europe",
    latitude: 50,
    longitude: 12,
    communityCount: 24,
    featuredRoute: "Delhi → Paris",
    travelWindow: "03–10 Sep",
    description: "Rail trips, historic cities, and shared weekend plans.",
  },
  {
    id: "africa",
    name: "Africa",
    latitude: 5,
    longitude: 22,
    communityCount: 14,
    featuredRoute: "Mumbai → Nairobi",
    travelWindow: "20–27 Sep",
    description: "Wildlife routes, coastal stays, and local experiences.",
  },
  {
    id: "americas",
    name: "Americas",
    latitude: 22,
    longitude: -82,
    communityCount: 21,
    featuredRoute: "Bengaluru → New York",
    travelWindow: "08–16 Oct",
    description: "Road trips, city meetups, and nature-led itineraries.",
  },
  {
    id: "oceania",
    name: "Oceania",
    latitude: -25,
    longitude: 135,
    communityCount: 11,
    featuredRoute: "Chennai → Sydney",
    travelWindow: "04–12 Nov",
    description: "Beach routes, outdoor adventures, and relaxed group plans.",
  },
];

export const DEFAULT_REGION_ID: TravelRegionId = "asia";

export function getTravelRegion(id: TravelRegionId): TravelRegion {
  return (
    TRAVEL_REGIONS.find((region) => region.id === id) ??
    TRAVEL_REGIONS[0]
  );
}
