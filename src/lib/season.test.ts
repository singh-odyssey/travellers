import { describe, expect, it } from "vitest";
import { getCurrentSeason } from "./season";

describe("getCurrentSeason", () => {
  it("returns winter for January", () => {
    expect(getCurrentSeason(new Date("2026-01-15"))).toBe("winter");
  });

  it("returns winter for February", () => {
    expect(getCurrentSeason(new Date("2026-02-15"))).toBe("winter");
  });

  it("returns spring for March, April, and May", () => {
    expect(getCurrentSeason(new Date("2026-03-15"))).toBe("spring");
    expect(getCurrentSeason(new Date("2026-04-15"))).toBe("spring");
    expect(getCurrentSeason(new Date("2026-05-15"))).toBe("spring");
  });

  it("returns summer for June, July, and August", () => {
    expect(getCurrentSeason(new Date("2026-06-15"))).toBe("summer");
    expect(getCurrentSeason(new Date("2026-07-15"))).toBe("summer");
    expect(getCurrentSeason(new Date("2026-08-15"))).toBe("summer");
  });

  it("returns fall for September, October, and November", () => {
    expect(getCurrentSeason(new Date("2026-09-15"))).toBe("fall");
    expect(getCurrentSeason(new Date("2026-10-15"))).toBe("fall");
    expect(getCurrentSeason(new Date("2026-11-15"))).toBe("fall");
  });

  it("returns winter for December", () => {
    expect(getCurrentSeason(new Date("2026-12-15"))).toBe("winter");
  });
});