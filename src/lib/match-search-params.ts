export interface MatchSearchValues {
  destination: string;
  date: string;
}

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function isValidMatchDate(value: string): boolean {
  if (!DATE_PATTERN.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export function normalizeDestination(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function parseMatchSearchParams(
  params: URLSearchParams,
): MatchSearchValues | null {
  const destination = normalizeDestination(
    params.get("destination") ?? "",
  );
  const date = params.get("date")?.trim() ?? "";

  if (!destination || !isValidMatchDate(date)) {
    return null;
  }

  return { destination, date };
}

export function buildMatchSearchParams(
  values: MatchSearchValues,
): URLSearchParams {
  const destination = normalizeDestination(values.destination);
  const date = values.date.trim();
  const params = new URLSearchParams();

  if (!destination || !isValidMatchDate(date)) {
    return params;
  }

  params.set("destination", destination);
  params.set("date", date);

  return params;
}

export function buildShareableMatchUrl(
  values: MatchSearchValues,
  baseUrl: string,
): string {
  const url = new URL(baseUrl);
  const params = buildMatchSearchParams(values);
  url.search = params.toString();
  return url.toString();
}
