# Destination Search Autocomplete

Real-time destination suggestions with keyboard and mouse navigation for improved user experience when searching for travel destinations.

## Features

### ✨ Core Functionality

- **Real-time suggestions** — Results appear as user types (minimum 2 characters)
- **Keyboard navigation** — Full support for Arrow keys, Enter, Escape, and Tab
- **Mouse interaction** — Click to select, hover to highlight
- **Smart matching** — Searches across city names, countries, airport codes, and aliases
- **Relevance sorting** — Exact matches first, then "starts with", then "contains"
- **Accessibility** — ARIA attributes for screen readers

### 🌍 Destination Database

Pre-loaded with **50+ major destinations** across:

- **North America** — NYC, LA, San Francisco, Toronto, Mexico City, etc.
- **Europe** — London, Paris, Rome, Barcelona, Amsterdam, Berlin, etc.
- **Asia** — Tokyo, Seoul, Bangkok, Singapore, Hong Kong, Dubai, etc.
- **Oceania** — Sydney, Melbourne, Auckland
- **South America** — Rio de Janeiro, São Paulo, Buenos Aires, Lima
- **Africa** — Cape Town, Cairo, Marrakech

Each destination includes:

- Full name and location
- Coordinates (lat/lng)
- Airport code (IATA)
- Timezone
- Alternative names/aliases

## Components

### DestinationAutocomplete

Located: `src/components/destination-autocomplete.tsx`

#### Props

```typescript
interface DestinationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (destination: Destination) => void;
  placeholder?: string;
  label?: string;
  id?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  showCoordinatesOnSelect?: boolean;
}
```

#### Usage Example

```tsx
import { DestinationAutocomplete } from "@/components/destination-autocomplete";
import type { Destination } from "@/lib/data/destinations";

function Component() {
  const [input, setInput] = useState("");
  const [location, setLocation] = useState<Location | null>(null);

  const handleSelect = (destination: Destination) => {
    setLocation(destination.coordinates);
    // Optional: Do something with selected destination
  };

  return (
    <DestinationAutocomplete
      id="destination"
      label="Destination"
      value={input}
      onChange={setInput}
      onSelect={handleSelect}
      placeholder="Search for a city..."
      required
    />
  );
}
```

### Destinations Data

Located: `src/lib/data/destinations.ts`

#### Search Function

```typescript
import { searchDestinations } from "@/lib/data/destinations";

// Search with limit
const results = searchDestinations("new", 10);
// Returns destinations matching "new" (e.g., New York, New Delhi)

// Helper functions
getDestinationById("nyc"); // Get specific destination
getDestinationsByRegion("Europe"); // Filter by region
getRegions(); // List all regions
```

## Keyboard Controls

| Key               | Action                                |
| ----------------- | ------------------------------------- |
| **Arrow Down**    | Move to next suggestion               |
| **Arrow Up**      | Move to previous suggestion           |
| **Enter**         | Select highlighted suggestion         |
| **Escape**        | Close dropdown                        |
| **Tab**           | Close dropdown and move to next field |
| **Type 2+ chars** | Show suggestions                      |

## Integration

### Routes Creation Page

**File:** `src/app/routes/new/page.tsx`

The autocomplete is integrated into both origin and destination fields:

- Users can type city names or coordinates
- Selecting a suggestion auto-fills location data
- Manual coordinate entry still supported (lat, lng format)

### Adding to Other Pages

```tsx
// 1. Import component and types
import { DestinationAutocomplete } from "@/components/destination-autocomplete";
import type { Destination } from "@/lib/data/destinations";

// 2. Add state
const [searchInput, setSearchInput] = useState("");

// 3. Handle selection
const handleDestinationSelect = (destination: Destination) => {
  console.log("Selected:", destination.name);
  console.log("Coordinates:", destination.coordinates);
};

// 4. Render component
<DestinationAutocomplete
  value={searchInput}
  onChange={setSearchInput}
  onSelect={handleDestinationSelect}
  placeholder="Where are you going?"
/>;
```

## Styling

The component uses Tailwind CSS classes that match the existing design system:

- Light/dark mode support
- Blue accent color for focus/selection
- Gray palette for neutral elements
- Smooth transitions and hover effects

### Customization

Pass custom classes via `className` prop:

```tsx
<DestinationAutocomplete
  className="max-w-md"
  // ... other props
/>
```

## Accessibility

### ARIA Attributes

- `role="combobox"` on input
- `aria-autocomplete="list"`
- `aria-expanded` to indicate dropdown state
- `aria-controls` linking to suggestions list
- `aria-activedescendant` tracking selection
- `role="listbox"` on dropdown
- `role="option"` on each suggestion
- `aria-selected` on highlighted item

### Screen Reader Support

- Label associations via `htmlFor` and `id`
- Clear helper text for minimum character requirement
- "No results" message when search returns empty

### Keyboard-Only Navigation

Fully operable without mouse:

- Tab to focus input
- Arrow keys to navigate
- Enter to select
- Escape to close

## Performance

### Optimizations

- **Debounced search** — Only searches after user stops typing (useEffect)
- **Limited results** — Default 8 suggestions (configurable)
- **Ref management** — Direct DOM access for scroll behavior
- **Event delegation** — Single click handler per dropdown
- **Conditional rendering** — Dropdown only renders when needed

### Memory Management

- Cleanup of event listeners on unmount
- Refs cleared when dropdown closes
- No memory leaks from closures

## Future Enhancements

### Phase 2 (API Integration)

- Replace static dataset with Google Places Autocomplete API
- Real-time data with user location bias
- Extended place details (photos, reviews, etc.)

### Phase 3 (Advanced Features)

- Recent searches persistence (localStorage)
- Popular destinations shortcuts
- Multi-language support
- Custom destination categories (tourist, business, etc.)

## Testing

### Manual Testing

1. **Type "new"** — Should show New York City, New Delhi
2. **Type "lon"** — Should show London first
3. **Arrow Down** — Should highlight next item
4. **Enter** — Should select highlighted item and close dropdown
5. **Escape** — Should close dropdown
6. **Click outside** — Should close dropdown
7. **Type 1 char** — Should show "Type at least 2 characters" message
8. **Type "xyz123"** — Should show "No destinations found" message

### Browser Testing

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (touch support)

## Troubleshooting

### Dropdown not appearing

- Check that value length >= 2
- Verify `searchDestinations()` returns results
- Inspect console for errors

### Keyboard navigation not working

- Ensure `onKeyDown` handler is attached
- Check that `isOpen` state is true
- Verify `selectedIndex` updates correctly

### Styling issues

- Check Tailwind CSS is configured
- Verify dark mode classes work in your theme
- Inspect z-index for dropdown visibility

## Files Changed

### New Files

- `src/components/destination-autocomplete.tsx` — Autocomplete component
- `src/lib/data/destinations.ts` — Destinations database and search utilities
- `docs/DESTINATION_AUTOCOMPLETE.md` — This documentation

### Modified Files

- `src/app/routes/new/page.tsx` — Integrated autocomplete for origin/destination inputs

## Credits

Destination data sourced from public domain geographic information and major city datasets.
