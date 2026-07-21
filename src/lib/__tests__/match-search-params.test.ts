import { describe, expect, it } from "vitest";
import {
  buildMatchSearchParams,
  buildShareableMatchUrl,
  isValidMatchDate,
  parseMatchSearchParams,
} from "../match-search-params";

describe("match search parameters", () => {
  it("parses a valid destination and date", () => {
    const params = new URLSearchParams(
      "destination=North%20Goa&date=2026-08-15",
    );

    expect(parseMatchSearchParams(params)).toEqual({
      destination: "North Goa",
      date: "2026-08-15",
    });
  });

  it("ignores incomplete parameters", () => {
    expect(
      parseMatchSearchParams(
        new URLSearchParams("destination=Goa"),
      ),
    ).toBeNull();
  });

  it("rejects impossible calendar dates", () => {
    expect(isValidMatchDate("2026-02-30")).toBe(false);
    expect(isValidMatchDate("2026-02-28")).toBe(true);
  });

  it("builds encoded parameters only for valid values", () => {
    expect(
      buildMatchSearchParams({
        destination: "  New   Delhi ",
        date: "2026-09-10",
      }).toString(),
    ).toBe("destination=New+Delhi&date=2026-09-10");
  });

  it("builds a shareable URL", () => {
    expect(
      buildShareableMatchUrl(
        { destination: "Goa", date: "2026-08-15" },
        "https://example.com/matches?old=value",
      ),
    ).toBe(
      "https://example.com/matches?destination=Goa&date=2026-08-15",
    );
  });
});
