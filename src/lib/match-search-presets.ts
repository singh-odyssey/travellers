import {
  isValidMatchDate,
  normalizeDestination,
  type MatchSearchValues,
} from "./match-search-params";

export const MATCH_PRESETS_STORAGE_KEY =
  "travellersmeet.match-search-presets.v1";
export const MATCH_RECENT_STORAGE_KEY =
  "travellersmeet.match-search-recent.v1";

const MAX_PRESETS = 10;
const MAX_RECENT_SEARCHES = 5;

export interface MatchSearchPreset extends MatchSearchValues {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  lastUsedAt: string;
}

export interface RecentMatchSearch extends MatchSearchValues {
  usedAt: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizeName(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

function isValidIsoDate(value: unknown): value is string {
  return (
    typeof value === "string" &&
    !Number.isNaN(Date.parse(value))
  );
}

function parsePreset(value: unknown): MatchSearchPreset | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = typeof value.id === "string" ? value.id.trim() : "";
  const name =
    typeof value.name === "string" ? normalizeName(value.name) : "";
  const destination =
    typeof value.destination === "string"
      ? normalizeDestination(value.destination)
      : "";
  const date = typeof value.date === "string" ? value.date.trim() : "";

  if (
    !id ||
    !name ||
    !destination ||
    !isValidMatchDate(date) ||
    !isValidIsoDate(value.createdAt) ||
    !isValidIsoDate(value.updatedAt) ||
    !isValidIsoDate(value.lastUsedAt)
  ) {
    return null;
  }

  return {
    id,
    name,
    destination,
    date,
    createdAt: value.createdAt,
    updatedAt: value.updatedAt,
    lastUsedAt: value.lastUsedAt,
  };
}

function parseRecentSearch(value: unknown): RecentMatchSearch | null {
  if (!isRecord(value)) {
    return null;
  }

  const destination =
    typeof value.destination === "string"
      ? normalizeDestination(value.destination)
      : "";
  const date = typeof value.date === "string" ? value.date.trim() : "";

  if (
    !destination ||
    !isValidMatchDate(date) ||
    !isValidIsoDate(value.usedAt)
  ) {
    return null;
  }

  return { destination, date, usedAt: value.usedAt };
}

function safeRead(storage: Storage, key: string): unknown[] {
  try {
    const raw = storage.getItem(key);
    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function safeWrite<T>(storage: Storage, key: string, value: T): void {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage can be unavailable or full. The page should remain usable.
  }
}

export function loadMatchSearchPresets(
  storage: Storage,
): MatchSearchPreset[] {
  const unique = new Map<string, MatchSearchPreset>();

  for (const item of safeRead(storage, MATCH_PRESETS_STORAGE_KEY)) {
    const preset = parsePreset(item);
    if (preset) {
      unique.set(preset.id, preset);
    }
  }

  return Array.from(unique.values())
    .sort(
      (a, b) =>
        Date.parse(b.lastUsedAt) - Date.parse(a.lastUsedAt),
    )
    .slice(0, MAX_PRESETS);
}

export function saveMatchSearchPreset(
  storage: Storage,
  input: {
    id?: string;
    name: string;
    destination: string;
    date: string;
    now?: Date;
  },
): MatchSearchPreset[] {
  const name = normalizeName(input.name);
  const destination = normalizeDestination(input.destination);
  const date = input.date.trim();

  if (!name || !destination || !isValidMatchDate(date)) {
    return loadMatchSearchPresets(storage);
  }

  const now = (input.now ?? new Date()).toISOString();
  const id = input.id?.trim() || createPresetId();
  const existing = loadMatchSearchPresets(storage);
  const previous = existing.find((preset) => preset.id === id);

  const preset: MatchSearchPreset = {
    id,
    name,
    destination,
    date,
    createdAt: previous?.createdAt ?? now,
    updatedAt: now,
    lastUsedAt: now,
  };

  const next = [
    preset,
    ...existing.filter((item) => item.id !== id),
  ].slice(0, MAX_PRESETS);

  safeWrite(storage, MATCH_PRESETS_STORAGE_KEY, next);
  return next;
}

export function renameMatchSearchPreset(
  storage: Storage,
  id: string,
  name: string,
  now = new Date(),
): MatchSearchPreset[] {
  const normalizedName = normalizeName(name);
  const existing = loadMatchSearchPresets(storage);

  if (!normalizedName) {
    return existing;
  }

  const next = existing.map((preset) =>
    preset.id === id
      ? {
          ...preset,
          name: normalizedName,
          updatedAt: now.toISOString(),
        }
      : preset,
  );

  safeWrite(storage, MATCH_PRESETS_STORAGE_KEY, next);
  return next;
}

export function deleteMatchSearchPreset(
  storage: Storage,
  id: string,
): MatchSearchPreset[] {
  const next = loadMatchSearchPresets(storage).filter(
    (preset) => preset.id !== id,
  );
  safeWrite(storage, MATCH_PRESETS_STORAGE_KEY, next);
  return next;
}

export function markMatchSearchPresetUsed(
  storage: Storage,
  id: string,
  now = new Date(),
): MatchSearchPreset[] {
  const timestamp = now.toISOString();
  const next = loadMatchSearchPresets(storage)
    .map((preset) =>
      preset.id === id
        ? { ...preset, lastUsedAt: timestamp }
        : preset,
    )
    .sort(
      (a, b) =>
        Date.parse(b.lastUsedAt) - Date.parse(a.lastUsedAt),
    );

  safeWrite(storage, MATCH_PRESETS_STORAGE_KEY, next);
  return next;
}

export function loadRecentMatchSearches(
  storage: Storage,
): RecentMatchSearch[] {
  return safeRead(storage, MATCH_RECENT_STORAGE_KEY)
    .map(parseRecentSearch)
    .filter((item): item is RecentMatchSearch => item !== null)
    .sort((a, b) => Date.parse(b.usedAt) - Date.parse(a.usedAt))
    .slice(0, MAX_RECENT_SEARCHES);
}

export function recordRecentMatchSearch(
  storage: Storage,
  values: MatchSearchValues,
  now = new Date(),
): RecentMatchSearch[] {
  const destination = normalizeDestination(values.destination);
  const date = values.date.trim();

  if (!destination || !isValidMatchDate(date)) {
    return loadRecentMatchSearches(storage);
  }

  const key = `${destination.toLowerCase()}::${date}`;
  const next = [
    { destination, date, usedAt: now.toISOString() },
    ...loadRecentMatchSearches(storage).filter(
      (item) =>
        `${item.destination.toLowerCase()}::${item.date}` !== key,
    ),
  ].slice(0, MAX_RECENT_SEARCHES);

  safeWrite(storage, MATCH_RECENT_STORAGE_KEY, next);
  return next;
}

function createPresetId(): string {
  if (
    typeof globalThis.crypto !== "undefined" &&
    "randomUUID" in globalThis.crypto
  ) {
    return globalThis.crypto.randomUUID();
  }

  return `preset-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}
