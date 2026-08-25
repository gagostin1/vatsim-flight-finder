import { describe, expect, it } from "vitest";
import { rankRoutes, scoreRoute } from "./score";
import type { CandidateRoute, SearchPreferences } from "./types";

const preferences: SearchPreferences = {
  maxMinutes: 90,
  traffic: "moderate",
  requireDepartureAtc: true,
  requireArrivalAtc: true,
};

const coveredRoute: CandidateRoute = {
  departure: "KCLT",
  arrival: "KATL",
  durationMinutes: 65,
  trafficLevel: "moderate",
  departureAtc: true,
  arrivalAtc: true,
  centerAtc: true,
};

describe("scoreRoute", () => {
  it("rewards a route that matches time, traffic, and ATC preferences", () => {
    const result = scoreRoute(coveredRoute, preferences);

    expect(result.score).toBeGreaterThanOrEqual(85);
    expect(result.reasons).toContain("Arrival ATC online");
  });

  it("keeps scores inside the 0-100 range", () => {
    const result = scoreRoute(
      { ...coveredRoute, durationMinutes: 500, departureAtc: false, arrivalAtc: false },
      preferences,
    );

    expect(result.score).toBe(0);
  });
});

describe("rankRoutes", () => {
  it("sorts the strongest match first", () => {
    const routes = [
      { ...coveredRoute, departure: "KPHX", arrivalAtc: false },
      coveredRoute,
    ];

    expect(rankRoutes(routes, { ...preferences, requireArrivalAtc: false })[0].departure).toBe("KCLT");
  });

  it("filters routes that fail required coverage or exceed the time allowance", () => {
    const routes = [
      coveredRoute,
      { ...coveredRoute, departure: "KPHX", departureAtc: false },
      { ...coveredRoute, departure: "KSEA", durationMinutes: 150 },
    ];

    expect(rankRoutes(routes, preferences)).toHaveLength(1);
  });
});
