import { describe, expect, it } from "vitest";
import { applyControllerCoverage, type CoverageRoute } from "./coverage-matching";

const routes: CoverageRoute[] = [
  {
    departure: "KJFK",
    arrival: "KBOS",
    durationMinutes: 65,
    trafficLevel: "busy",
    centerCodes: ["NY", "BOS"],
  },
  {
    departure: "KATL",
    arrival: "KMCO",
    durationMinutes: 90,
    trafficLevel: "moderate",
    centerCodes: ["ATL", "JAX"],
  },
];

describe("applyControllerCoverage", () => {
  it("matches airport and center coverage to each route", () => {
    expect(
      applyControllerCoverage(routes, {
        airports: ["KJFK", "KMCO"],
        centers: ["BOS"],
      }),
    ).toEqual([
      {
        departure: "KJFK",
        arrival: "KBOS",
        durationMinutes: 65,
        trafficLevel: "busy",
        departureAtc: true,
        arrivalAtc: false,
        centerAtc: true,
      },
      {
        departure: "KATL",
        arrival: "KMCO",
        durationMinutes: 90,
        trafficLevel: "moderate",
        departureAtc: false,
        arrivalAtc: true,
        centerAtc: false,
      },
    ]);
  });

  it("requires a route center match rather than any online center", () => {
    expect(
      applyControllerCoverage([routes[0]], { airports: [], centers: ["ATL"] })[0].centerAtc,
    ).toBe(false);
  });

  it("returns uncovered flags when coverage is empty", () => {
    expect(applyControllerCoverage([routes[0]], { airports: [], centers: [] })[0]).toMatchObject({
      departureAtc: false,
      arrivalAtc: false,
      centerAtc: false,
    });
  });

  it("does not mutate route definitions or coverage lists", () => {
    const routeSnapshot = structuredClone(routes);
    const coverage = { airports: ["KJFK"], centers: ["NY"] };
    const coverageSnapshot = structuredClone(coverage);

    applyControllerCoverage(routes, coverage);

    expect(routes).toEqual(routeSnapshot);
    expect(coverage).toEqual(coverageSnapshot);
  });
});
