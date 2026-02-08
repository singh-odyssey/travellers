/**
 * Popular Destinations Dataset
 * Major cities and tourist destinations worldwide
 */

export interface Destination {
  id: string;
  name: string;
  city: string;
  country: string;
  region: string; // e.g., "North America", "Europe", "Asia"
  coordinates: {
    lat: number;
    lng: number;
  };
  airport?: string; // IATA code
  timezone?: string;
  aliases?: string[]; // Alternative names/spellings
}

export const destinations: Destination[] = [
  // North America
  {
    id: 'nyc',
    name: 'New York City, NY, USA',
    city: 'New York City',
    country: 'United States',
    region: 'North America',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    airport: 'JFK',
    timezone: 'America/New_York',
    aliases: ['NYC', 'New York', 'Manhattan'],
  },
  {
    id: 'lax',
    name: 'Los Angeles, CA, USA',
    city: 'Los Angeles',
    country: 'United States',
    region: 'North America',
    coordinates: { lat: 34.0522, lng: -118.2437 },
    airport: 'LAX',
    timezone: 'America/Los_Angeles',
    aliases: ['LA', 'Los Angeles'],
  },
  {
    id: 'sfo',
    name: 'San Francisco, CA, USA',
    city: 'San Francisco',
    country: 'United States',
    region: 'North America',
    coordinates: { lat: 37.7749, lng: -122.4194 },
    airport: 'SFO',
    timezone: 'America/Los_Angeles',
    aliases: ['SF', 'San Fran', 'Bay Area'],
  },
  {
    id: 'chi',
    name: 'Chicago, IL, USA',
    city: 'Chicago',
    country: 'United States',
    region: 'North America',
    coordinates: { lat: 41.8781, lng: -87.6298 },
    airport: 'ORD',
    timezone: 'America/Chicago',
    aliases: ['Chi-town', 'Chicago'],
  },
  {
    id: 'miami',
    name: 'Miami, FL, USA',
    city: 'Miami',
    country: 'United States',
    region: 'North America',
    coordinates: { lat: 25.7617, lng: -80.1918 },
    airport: 'MIA',
    timezone: 'America/New_York',
  },
  {
    id: 'orlando',
    name: 'Orlando, FL, USA',
    city: 'Orlando',
    country: 'United States',
    region: 'North America',
    coordinates: { lat: 28.5383, lng: -81.3792 },
    airport: 'MCO',
    timezone: 'America/New_York',
  },
  {
    id: 'dc',
    name: 'Washington, DC, USA',
    city: 'Washington',
    country: 'United States',
    region: 'North America',
    coordinates: { lat: 38.9072, lng: -77.0369 },
    airport: 'DCA',
    timezone: 'America/New_York',
    aliases: ['DC', 'Washington DC', 'Washington'],
  },
  {
    id: 'toronto',
    name: 'Toronto, ON, Canada',
    city: 'Toronto',
    country: 'Canada',
    region: 'North America',
    coordinates: { lat: 43.6532, lng: -79.3832 },
    airport: 'YYZ',
    timezone: 'America/Toronto',
  },
  {
    id: 'vancouver',
    name: 'Vancouver, BC, Canada',
    city: 'Vancouver',
    country: 'Canada',
    region: 'North America',
    coordinates: { lat: 49.2827, lng: -123.1207 },
    airport: 'YVR',
    timezone: 'America/Vancouver',
  },
  {
    id: 'mexico-city',
    name: 'Mexico City, Mexico',
    city: 'Mexico City',
    country: 'Mexico',
    region: 'North America',
    coordinates: { lat: 19.4326, lng: -99.1332 },
    airport: 'MEX',
    timezone: 'America/Mexico_City',
    aliases: ['CDMX', 'Ciudad de México'],
  },

  // Europe
  {
    id: 'london',
    name: 'London, United Kingdom',
    city: 'London',
    country: 'United Kingdom',
    region: 'Europe',
    coordinates: { lat: 51.5074, lng: -0.1278 },
    airport: 'LHR',
    timezone: 'Europe/London',
  },
  {
    id: 'paris',
    name: 'Paris, France',
    city: 'Paris',
    country: 'France',
    region: 'Europe',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    airport: 'CDG',
    timezone: 'Europe/Paris',
  },
  {
    id: 'rome',
    name: 'Rome, Italy',
    city: 'Rome',
    country: 'Italy',
    region: 'Europe',
    coordinates: { lat: 41.9028, lng: 12.4964 },
    airport: 'FCO',
    timezone: 'Europe/Rome',
    aliases: ['Roma'],
  },
  {
    id: 'barcelona',
    name: 'Barcelona, Spain',
    city: 'Barcelona',
    country: 'Spain',
    region: 'Europe',
    coordinates: { lat: 41.3851, lng: 2.1734 },
    airport: 'BCN',
    timezone: 'Europe/Madrid',
  },
  {
    id: 'madrid',
    name: 'Madrid, Spain',
    city: 'Madrid',
    country: 'Spain',
    region: 'Europe',
    coordinates: { lat: 40.4168, lng: -3.7038 },
    airport: 'MAD',
    timezone: 'Europe/Madrid',
  },
  {
    id: 'amsterdam',
    name: 'Amsterdam, Netherlands',
    city: 'Amsterdam',
    country: 'Netherlands',
    region: 'Europe',
    coordinates: { lat: 52.3676, lng: 4.9041 },
    airport: 'AMS',
    timezone: 'Europe/Amsterdam',
  },
  {
    id: 'berlin',
    name: 'Berlin, Germany',
    city: 'Berlin',
    country: 'Germany',
    region: 'Europe',
    coordinates: { lat: 52.5200, lng: 13.4050 },
    airport: 'BER',
    timezone: 'Europe/Berlin',
  },
  {
    id: 'prague',
    name: 'Prague, Czech Republic',
    city: 'Prague',
    country: 'Czech Republic',
    region: 'Europe',
    coordinates: { lat: 50.0755, lng: 14.4378 },
    airport: 'PRG',
    timezone: 'Europe/Prague',
    aliases: ['Praha'],
  },
  {
    id: 'vienna',
    name: 'Vienna, Austria',
    city: 'Vienna',
    country: 'Austria',
    region: 'Europe',
    coordinates: { lat: 48.2082, lng: 16.3738 },
    airport: 'VIE',
    timezone: 'Europe/Vienna',
    aliases: ['Wien'],
  },
  {
    id: 'lisbon',
    name: 'Lisbon, Portugal',
    city: 'Lisbon',
    country: 'Portugal',
    region: 'Europe',
    coordinates: { lat: 38.7223, lng: -9.1393 },
    airport: 'LIS',
    timezone: 'Europe/Lisbon',
    aliases: ['Lisboa'],
  },

  // Asia
  {
    id: 'tokyo',
    name: 'Tokyo, Japan',
    city: 'Tokyo',
    country: 'Japan',
    region: 'Asia',
    coordinates: { lat: 35.6762, lng: 139.6503 },
    airport: 'NRT',
    timezone: 'Asia/Tokyo',
  },
  {
    id: 'osaka',
    name: 'Osaka, Japan',
    city: 'Osaka',
    country: 'Japan',
    region: 'Asia',
    coordinates: { lat: 34.6937, lng: 135.5023 },
    airport: 'KIX',
    timezone: 'Asia/Tokyo',
  },
  {
    id: 'seoul',
    name: 'Seoul, South Korea',
    city: 'Seoul',
    country: 'South Korea',
    region: 'Asia',
    coordinates: { lat: 37.5665, lng: 126.9780 },
    airport: 'ICN',
    timezone: 'Asia/Seoul',
  },
  {
    id: 'bangkok',
    name: 'Bangkok, Thailand',
    city: 'Bangkok',
    country: 'Thailand',
    region: 'Asia',
    coordinates: { lat: 13.7563, lng: 100.5018 },
    airport: 'BKK',
    timezone: 'Asia/Bangkok',
    aliases: ['Krung Thep'],
  },
  {
    id: 'singapore',
    name: 'Singapore',
    city: 'Singapore',
    country: 'Singapore',
    region: 'Asia',
    coordinates: { lat: 1.3521, lng: 103.8198 },
    airport: 'SIN',
    timezone: 'Asia/Singapore',
  },
  {
    id: 'hong-kong',
    name: 'Hong Kong',
    city: 'Hong Kong',
    country: 'Hong Kong',
    region: 'Asia',
    coordinates: { lat: 22.3193, lng: 114.1694 },
    airport: 'HKG',
    timezone: 'Asia/Hong_Kong',
  },
  {
    id: 'dubai',
    name: 'Dubai, United Arab Emirates',
    city: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Asia',
    coordinates: { lat: 25.2048, lng: 55.2708 },
    airport: 'DXB',
    timezone: 'Asia/Dubai',
  },
  {
    id: 'mumbai',
    name: 'Mumbai, India',
    city: 'Mumbai',
    country: 'India',
    region: 'Asia',
    coordinates: { lat: 19.0760, lng: 72.8777 },
    airport: 'BOM',
    timezone: 'Asia/Kolkata',
    aliases: ['Bombay'],
  },
  {
    id: 'delhi',
    name: 'New Delhi, India',
    city: 'New Delhi',
    country: 'India',
    region: 'Asia',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    airport: 'DEL',
    timezone: 'Asia/Kolkata',
    aliases: ['Delhi'],
  },
  {
    id: 'beijing',
    name: 'Beijing, China',
    city: 'Beijing',
    country: 'China',
    region: 'Asia',
    coordinates: { lat: 39.9042, lng: 116.4074 },
    airport: 'PEK',
    timezone: 'Asia/Shanghai',
    aliases: ['Peking'],
  },

  // Oceania
  {
    id: 'sydney',
    name: 'Sydney, Australia',
    city: 'Sydney',
    country: 'Australia',
    region: 'Oceania',
    coordinates: { lat: -33.8688, lng: 151.2093 },
    airport: 'SYD',
    timezone: 'Australia/Sydney',
  },
  {
    id: 'melbourne',
    name: 'Melbourne, Australia',
    city: 'Melbourne',
    country: 'Australia',
    region: 'Oceania',
    coordinates: { lat: -37.8136, lng: 144.9631 },
    airport: 'MEL',
    timezone: 'Australia/Melbourne',
  },
  {
    id: 'auckland',
    name: 'Auckland, New Zealand',
    city: 'Auckland',
    country: 'New Zealand',
    region: 'Oceania',
    coordinates: { lat: -36.8485, lng: 174.7633 },
    airport: 'AKL',
    timezone: 'Pacific/Auckland',
  },

  // South America
  {
    id: 'rio',
    name: 'Rio de Janeiro, Brazil',
    city: 'Rio de Janeiro',
    country: 'Brazil',
    region: 'South America',
    coordinates: { lat: -22.9068, lng: -43.1729 },
    airport: 'GIG',
    timezone: 'America/Sao_Paulo',
    aliases: ['Rio'],
  },
  {
    id: 'sao-paulo',
    name: 'São Paulo, Brazil',
    city: 'São Paulo',
    country: 'Brazil',
    region: 'South America',
    coordinates: { lat: -23.5505, lng: -46.6333 },
    airport: 'GRU',
    timezone: 'America/Sao_Paulo',
    aliases: ['Sao Paulo'],
  },
  {
    id: 'buenos-aires',
    name: 'Buenos Aires, Argentina',
    city: 'Buenos Aires',
    country: 'Argentina',
    region: 'South America',
    coordinates: { lat: -34.6037, lng: -58.3816 },
    airport: 'EZE',
    timezone: 'America/Argentina/Buenos_Aires',
  },
  {
    id: 'lima',
    name: 'Lima, Peru',
    city: 'Lima',
    country: 'Peru',
    region: 'South America',
    coordinates: { lat: -12.0464, lng: -77.0428 },
    airport: 'LIM',
    timezone: 'America/Lima',
  },

  // Africa
  {
    id: 'cape-town',
    name: 'Cape Town, South Africa',
    city: 'Cape Town',
    country: 'South Africa',
    region: 'Africa',
    coordinates: { lat: -33.9249, lng: 18.4241 },
    airport: 'CPT',
    timezone: 'Africa/Johannesburg',
  },
  {
    id: 'cairo',
    name: 'Cairo, Egypt',
    city: 'Cairo',
    country: 'Egypt',
    region: 'Africa',
    coordinates: { lat: 30.0444, lng: 31.2357 },
    airport: 'CAI',
    timezone: 'Africa/Cairo',
    aliases: ['Al Qahirah'],
  },
  {
    id: 'marrakech',
    name: 'Marrakech, Morocco',
    city: 'Marrakech',
    country: 'Morocco',
    region: 'Africa',
    coordinates: { lat: 31.6295, lng: -7.9811 },
    airport: 'RAK',
    timezone: 'Africa/Casablanca',
    aliases: ['Marrakesh'],
  },
];

/**
 * Search destinations by query string
 * Matches against name, city, country, airport code, and aliases
 */
export function searchDestinations(query: string, limit: number = 10): Destination[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  
  const matches = destinations.filter(dest => {
    // Match against main name
    if (dest.name.toLowerCase().includes(searchTerm)) return true;
    
    // Match against city
    if (dest.city.toLowerCase().includes(searchTerm)) return true;
    
    // Match against country
    if (dest.country.toLowerCase().includes(searchTerm)) return true;
    
    // Match against airport code
    if (dest.airport?.toLowerCase().includes(searchTerm)) return true;
    
    // Match against aliases
    if (dest.aliases?.some(alias => alias.toLowerCase().includes(searchTerm))) return true;
    
    return false;
  });

  // Sort by relevance (exact matches first, then starts-with, then contains)
  matches.sort((a, b) => {
    const aNameLower = a.name.toLowerCase();
    const bNameLower = b.name.toLowerCase();
    
    // Exact match
    if (aNameLower === searchTerm) return -1;
    if (bNameLower === searchTerm) return 1;
    
    // Starts with
    if (aNameLower.startsWith(searchTerm) && !bNameLower.startsWith(searchTerm)) return -1;
    if (bNameLower.startsWith(searchTerm) && !aNameLower.startsWith(searchTerm)) return 1;
    
    // City starts with
    if (a.city.toLowerCase().startsWith(searchTerm) && !b.city.toLowerCase().startsWith(searchTerm)) return -1;
    if (b.city.toLowerCase().startsWith(searchTerm) && !a.city.toLowerCase().startsWith(searchTerm)) return 1;
    
    // Alphabetical
    return aNameLower.localeCompare(bNameLower);
  });

  return matches.slice(0, limit);
}

/**
 * Get destination by ID
 */
export function getDestinationById(id: string): Destination | undefined {
  return destinations.find(dest => dest.id === id);
}

/**
 * Get destinations by region
 */
export function getDestinationsByRegion(region: string): Destination[] {
  return destinations.filter(dest => dest.region === region);
}

/**
 * Get all unique regions
 */
export function getRegions(): string[] {
  return Array.from(new Set(destinations.map(dest => dest.region)));
}
