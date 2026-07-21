"use client";

import MatchSearchPresets from "@/components/match-search-presets";
import {
  buildMatchSearchParams,
  buildShareableMatchUrl,
  isValidMatchDate,
  normalizeDestination,
  parseMatchSearchParams,
  type MatchSearchValues,
} from "@/lib/match-search-params";
import {
  loadRecentMatchSearches,
  markMatchSearchPresetUsed,
  recordRecentMatchSearch,
  type RecentMatchSearch,
} from "@/lib/match-search-presets";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";

interface MatchUser {
  id: string;
  name: string | null;
  image: string | null;
}

interface MatchResult {
  id: string;
  destination: string;
  departureDate: string;
  status: string;
  user: MatchUser;
}

interface MatchApiResponse {
  matches?: MatchResult[];
  error?: string;
}

const EMPTY_SEARCH: MatchSearchValues = {
  destination: "",
  date: "",
};

export default function MatchSearchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<MatchSearchValues>(EMPTY_SEARCH);
  const [results, setResults] = useState<MatchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<RecentMatchSearch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const isValidSearch =
    Boolean(normalizeDestination(search.destination)) &&
    isValidMatchDate(search.date);

  const executeSearch = useCallback(
    async (
      values: MatchSearchValues,
      options: { updateUrl?: boolean; presetId?: string } = {},
    ) => {
      const normalized: MatchSearchValues = {
        destination: normalizeDestination(values.destination),
        date: values.date.trim(),
      };

      if (
        !normalized.destination ||
        !isValidMatchDate(normalized.date)
      ) {
        setError("Enter a destination and a valid travel date.");
        return;
      }

      setSearch(normalized);
      setError("");
      setStatus("");
      setIsLoading(true);
      setHasSearched(true);

      if (options.updateUrl !== false) {
        const params = buildMatchSearchParams(normalized);
        router.replace(`/matches?${params.toString()}`, {
          scroll: false,
        });
      }

      try {
        const params = buildMatchSearchParams(normalized);
        const response = await fetch(`/api/matches?${params.toString()}`);
        const payload = (await response.json()) as MatchApiResponse;

        if (!response.ok) {
          throw new Error(payload.error || "Unable to find matches.");
        }

        setResults(payload.matches ?? []);
        setRecentSearches(
          recordRecentMatchSearch(window.localStorage, normalized),
        );

        if (options.presetId) {
          markMatchSearchPresetUsed(
            window.localStorage,
            options.presetId,
          );
        }

        setStatus(
          (payload.matches?.length ?? 0) > 0
            ? `Found ${payload.matches?.length ?? 0} matching travellers.`
            : "No matching travellers found for this search.",
        );
      } catch (caughtError) {
        setResults([]);
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Unable to find matches.",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

  useEffect(() => {
    setRecentSearches(loadRecentMatchSearches(window.localStorage));

    const restored = parseMatchSearchParams(
      new URLSearchParams(searchParams.toString()),
    );

    if (restored) {
      void executeSearch(restored, { updateUrl: false });
    }
  }, [executeSearch, searchParams]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void executeSearch(search);
  };

  const handleApply = (
    values: MatchSearchValues,
    presetId?: string,
  ) => {
    void executeSearch(values, { presetId });
  };

  const handleCopyLink = async (): Promise<boolean> => {
    if (!isValidSearch) {
      return false;
    }

    const url = buildShareableMatchUrl(search, window.location.href);

    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-300">
          Traveller matching
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Find verified travellers for your trip
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Search by destination and departure date. Results include verified
          tickets within three days of your selected date.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-[1fr_auto_auto] sm:items-end"
      >
        <label>
          <span className="text-sm font-medium">Destination</span>
          <input
            value={search.destination}
            onChange={(event) =>
              setSearch((current) => ({
                ...current,
                destination: event.target.value,
              }))
            }
            placeholder="Goa"
            autoComplete="off"
            className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
          />
        </label>

        <label>
          <span className="text-sm font-medium">Travel date</span>
          <input
            type="date"
            value={search.date}
            onChange={(event) =>
              setSearch((current) => ({
                ...current,
                date: event.target.value,
              }))
            }
            className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
          />
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-sky-700 px-5 py-2.5 font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Searching…" : "Find matches"}
        </button>
      </form>

      <div className="mt-6" aria-live="polite" aria-atomic="true">
        {error ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
            {error}
          </p>
        ) : status ? (
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {status}
          </p>
        ) : null}
      </div>

      <div className="mt-8">
        <MatchSearchPresets
          currentSearch={search}
          canSave={isValidSearch}
          onApply={handleApply}
          onCopyLink={handleCopyLink}
          onStatus={setStatus}
        />
      </div>

      <section className="mt-8" aria-labelledby="recent-searches-title">
        <h2 id="recent-searches-title" className="text-lg font-semibold">
          Recent searches
        </h2>
        {recentSearches.length === 0 ? (
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Your recent searches will appear here.
          </p>
        ) : (
          <div className="mt-3 flex flex-wrap gap-2">
            {recentSearches.map((item) => (
              <button
                key={`${item.destination}-${item.date}`}
                type="button"
                onClick={() => handleApply(item)}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm transition hover:border-sky-500 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900 dark:hover:text-sky-300"
              >
                {item.destination} · {item.date}
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="mt-10" aria-labelledby="match-results-title">
        <div className="flex items-center justify-between gap-4">
          <h2 id="match-results-title" className="text-xl font-semibold">
            Match results
          </h2>
          {hasSearched && !isLoading ? (
            <span className="text-sm text-slate-500">
              {results.length} result{results.length === 1 ? "" : "s"}
            </span>
          ) : null}
        </div>

        {isLoading ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[0, 1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-32 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800"
              />
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {results.map((match) => (
              <article
                key={match.id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <p className="font-semibold">
                  {match.user.name || "Verified traveller"}
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {match.destination}
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Departure: {new Date(match.departureDate).toLocaleDateString()}
                </p>
                <span className="mt-4 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                  {match.status}
                </span>
              </article>
            ))}
          </div>
        ) : hasSearched && !error ? (
          <p className="mt-4 rounded-xl border border-dashed border-slate-300 px-5 py-8 text-center text-slate-600 dark:border-slate-700 dark:text-slate-400">
            No verified travellers matched this destination and date yet.
          </p>
        ) : (
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            Run a search to see verified travellers.
          </p>
        )}
      </section>
    </main>
  );
}
