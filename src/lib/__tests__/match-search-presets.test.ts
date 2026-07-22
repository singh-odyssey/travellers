import { beforeEach, describe, expect, it } from "vitest";
import {
  MATCH_PRESETS_STORAGE_KEY,
  deleteMatchSearchPreset,
  loadMatchSearchPresets,
  recordRecentMatchSearch,
  renameMatchSearchPreset,
  saveMatchSearchPreset,
} from "../match-search-presets";

describe("match search presets", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns an empty list for malformed storage", () => {
    localStorage.setItem(MATCH_PRESETS_STORAGE_KEY, "not-json");
    expect(loadMatchSearchPresets(localStorage)).toEqual([]);
  });

  it("saves and loads a preset", () => {
    const now = new Date("2026-07-20T10:00:00.000Z");
    const saved = saveMatchSearchPreset(localStorage, {
      id: "goa-trip",
      name: "Goa trip",
      destination: "Goa",
      date: "2026-08-15",
      now,
    });

    expect(saved).toHaveLength(1);
    expect(loadMatchSearchPresets(localStorage)[0]).toMatchObject({
      id: "goa-trip",
      name: "Goa trip",
      destination: "Goa",
      date: "2026-08-15",
    });
  });

  it("replaces duplicate preset identifiers", () => {
    saveMatchSearchPreset(localStorage, {
      id: "same-id",
      name: "First",
      destination: "Goa",
      date: "2026-08-15",
    });

    const presets = saveMatchSearchPreset(localStorage, {
      id: "same-id",
      name: "Updated",
      destination: "Jaipur",
      date: "2026-09-01",
    });

    expect(presets).toHaveLength(1);
    expect(presets[0].name).toBe("Updated");
  });

  it("renames and deletes a preset", () => {
    saveMatchSearchPreset(localStorage, {
      id: "rename-me",
      name: "Old name",
      destination: "Mumbai",
      date: "2026-10-05",
    });

    const renamed = renameMatchSearchPreset(
      localStorage,
      "rename-me",
      "New name",
    );
    expect(renamed[0].name).toBe("New name");

    expect(
      deleteMatchSearchPreset(localStorage, "rename-me"),
    ).toEqual([]);
  });

  it("deduplicates recent searches", () => {
    recordRecentMatchSearch(localStorage, {
      destination: "Goa",
      date: "2026-08-15",
    });

    const recent = recordRecentMatchSearch(localStorage, {
      destination: "goa",
      date: "2026-08-15",
    });

    expect(recent).toHaveLength(1);
  });
});
