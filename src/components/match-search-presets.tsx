"use client";

import { useEffect, useState } from "react";
import {
  deleteMatchSearchPreset,
  loadMatchSearchPresets,
  renameMatchSearchPreset,
  saveMatchSearchPreset,
  type MatchSearchPreset,
} from "@/lib/match-search-presets";
import type { MatchSearchValues } from "@/lib/match-search-params";

interface MatchSearchPresetsProps {
  currentSearch: MatchSearchValues;
  canSave: boolean;
  onApply: (values: MatchSearchValues, presetId?: string) => void;
  onCopyLink: () => Promise<boolean>;
  onStatus: (message: string) => void;
}

export default function MatchSearchPresets({
  currentSearch,
  canSave,
  onApply,
  onCopyLink,
  onStatus,
}: MatchSearchPresetsProps) {
  const [presets, setPresets] = useState<MatchSearchPreset[]>([]);
  const [presetName, setPresetName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    setPresets(loadMatchSearchPresets(window.localStorage));
  }, []);

  const handleSave = () => {
    const name = presetName.trim();
    if (!name) {
      onStatus("Enter a name before saving this search.");
      return;
    }

    const next = saveMatchSearchPreset(window.localStorage, {
      name,
      destination: currentSearch.destination,
      date: currentSearch.date,
    });
    setPresets(next);
    setPresetName("");
    onStatus(`Saved search preset “${name}”.`);
  };

  const handleRename = (preset: MatchSearchPreset) => {
    const name = editingName.trim();
    if (!name) {
      onStatus("Preset names cannot be empty.");
      return;
    }

    setPresets(
      renameMatchSearchPreset(
        window.localStorage,
        preset.id,
        name,
      ),
    );
    setEditingId(null);
    setEditingName("");
    onStatus(`Renamed preset to “${name}”.`);
  };

  const handleDelete = (preset: MatchSearchPreset) => {
    const confirmed = window.confirm(
      `Delete the saved search “${preset.name}”?`,
    );

    if (!confirmed) {
      return;
    }

    setPresets(
      deleteMatchSearchPreset(window.localStorage, preset.id),
    );
    onStatus(`Deleted search preset “${preset.name}”.`);
  };

  const handleCopy = async () => {
    const copied = await onCopyLink();
    onStatus(
      copied
        ? "Copied the shareable search link."
        : "Unable to copy automatically. Copy the URL from your browser.",
    );
  };

  return (
    <section
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      aria-labelledby="saved-searches-title"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="saved-searches-title" className="text-lg font-semibold">
            Saved searches
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Reuse frequent destination and date combinations.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          disabled={!canSave}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          Copy current search link
        </button>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label className="flex-1">
          <span className="sr-only">Preset name</span>
          <input
            value={presetName}
            onChange={(event) => setPresetName(event.target.value)}
            placeholder="Example: Goa in August"
            maxLength={50}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          />
        </label>
        <button
          type="button"
          onClick={handleSave}
          disabled={!canSave}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          Save current search
        </button>
      </div>

      {presets.length === 0 ? (
        <p className="mt-5 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:bg-slate-950 dark:text-slate-400">
          No saved searches yet. Run a valid search and save it here.
        </p>
      ) : (
        <ul className="mt-5 grid gap-3">
          {presets.map((preset) => (
            <li
              key={preset.id}
              className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
            >
              {editingId === preset.id ? (
                <div className="flex flex-col gap-2 sm:flex-row">
                  <label className="flex-1">
                    <span className="sr-only">
                      New name for {preset.name}
                    </span>
                    <input
                      autoFocus
                      value={editingName}
                      onChange={(event) =>
                        setEditingName(event.target.value)
                      }
                      maxLength={50}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRename(preset)}
                    className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white dark:bg-white dark:text-slate-900"
                  >
                    Save name
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setEditingName("");
                    }}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold">{preset.name}</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      {preset.destination} · {preset.date}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onApply(preset, preset.id)}
                      className="rounded-lg bg-sky-700 px-3 py-2 text-sm font-medium text-white hover:bg-sky-800"
                    >
                      Apply
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(preset.id);
                        setEditingName(preset.name);
                      }}
                      className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700"
                    >
                      Rename
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(preset)}
                      className="rounded-lg border border-red-300 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
