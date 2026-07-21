import {
  createCalendarEvent,
  createSafeCalendarFileName,
  createStableEventUid,
  downloadCalendarEvent,
  escapeCalendarText,
  formatCalendarDate,
  formatUtcTimestamp,
} from "@/lib/calendar-export";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const baseRoute = {
  id: "route-123",
  title: "Pune to Goa",
  origin: "Pune",
  destination: "Goa",
  departureDate: "2026-08-15",
  notes: "Pack snacks",
  routeUrl: "https://travellersmeet.example/routes",
};

describe("calendar export utility", () => {
  beforeEach(() => {
    Object.defineProperty(URL, "createObjectURL", {
      configurable: true,
      writable: true,
      value: vi.fn(() => "blob:calendar-test"),
    });
    Object.defineProperty(URL, "revokeObjectURL", {
      configurable: true,
      writable: true,
      value: vi.fn(),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("creates a valid VCALENDAR and VEVENT structure", () => {
    const calendar = createCalendarEvent(
      baseRoute,
      new Date("2026-07-21T12:34:56Z"),
    );

    expect(calendar).toContain("BEGIN:VCALENDAR\r\n");
    expect(calendar).toContain("VERSION:2.0\r\n");
    expect(calendar).toContain("BEGIN:VEVENT\r\n");
    expect(calendar).toContain(
      "DTSTAMP:20260721T123456Z\r\n",
    );
    expect(calendar).toContain(
      "DTSTART;VALUE=DATE:20260815\r\n",
    );
    expect(calendar).toContain("SUMMARY:Pune to Goa\r\n");
    expect(calendar).toContain("LOCATION:Goa\r\n");
    expect(calendar).toContain("END:VEVENT\r\n");
    expect(calendar.endsWith("END:VCALENDAR\r\n")).toBe(true);
  });

  it("escapes calendar-reserved characters", () => {
    expect(
      escapeCalendarText(
        "Line one\nLine two, value; C:\\Trips",
      ),
    ).toBe("Line one\\nLine two\\, value\\; C:\\\\Trips");
  });

  it("omits optional fields without producing undefined text", () => {
    const calendar = createCalendarEvent({
      id: "route-minimal",
      title: "Goa trip",
      destination: "Goa",
      departureDate: "2026-09-01",
    });

    expect(calendar).not.toContain("undefined");
    expect(calendar).not.toContain("\r\nURL:");
    expect(calendar).toContain(
      "DESCRIPTION:Travel to Goa.\r\n",
    );
  });

  it("formats valid dates and rejects impossible dates", () => {
    expect(formatCalendarDate("2026-02-28")).toBe("20260228");
    expect(() => formatCalendarDate("2026-02-30")).toThrow(
      "Departure date is invalid.",
    );
  });

  it("formats UTC timestamps", () => {
    expect(
      formatUtcTimestamp(
        new Date("2026-01-02T03:04:05.000Z"),
      ),
    ).toBe("20260102T030405Z");
  });

  it("generates a stable event UID", () => {
    expect(createStableEventUid(" Route 123 ")).toBe(
      "route-123@travellersmeet",
    );
    expect(createStableEventUid(" Route 123 ")).toBe(
      createStableEventUid(" Route 123 "),
    );
  });

  it("creates readable and safe calendar filenames", () => {
    expect(
      createSafeCalendarFileName("Pune / Goa: Road Trip!"),
    ).toBe("pune-goa-road-trip.ics");
  });

  it("includes date-time and duration when a time is selected", () => {
    const calendar = createCalendarEvent({
      ...baseRoute,
      departureTime: "09:30",
      durationMinutes: 120,
    });

    expect(calendar).toContain("DTSTART:20260815T093000\r\n");
    expect(calendar).toContain("DTEND:20260815T113000\r\n");
  });

  it("downloads the ICS file and revokes the Blob URL", () => {
    const createObjectURL = vi
      .spyOn(URL, "createObjectURL")
      .mockReturnValue("blob:calendar-test");
    const revokeObjectURL = vi
      .spyOn(URL, "revokeObjectURL")
      .mockImplementation(() => undefined);
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => undefined);

    downloadCalendarEvent(baseRoute);

    expect(createObjectURL).toHaveBeenCalledOnce();
    expect(click).toHaveBeenCalledOnce();
    expect(revokeObjectURL).toHaveBeenCalledWith(
      "blob:calendar-test",
    );
    expect(
      document.querySelector('a[download$=".ics"]'),
    ).toBeNull();
  });
});
