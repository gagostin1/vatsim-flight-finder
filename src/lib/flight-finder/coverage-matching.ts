import type { ControllerCoverage } from "@/lib/vatsim/coverage";
import type { CandidateRoute, TrafficPreference } from "./types";

export type CoverageRoute = {
  departure: string;
  arrival: string;
  durationMinutes: number;
  trafficLevel: TrafficPreference;
  centerCodes: readonly string[];
};

export function applyControllerCoverage(
  routes: readonly CoverageRoute[],
  coverage: ControllerCoverage,
): CandidateRoute[] {
  const coveredAirports = new Set(coverage.airports);
  const coveredCenters = new Set(coverage.centers);

  return routes.map(({ centerCodes, ...route }) => ({
    ...route,
    departureAtc: coveredAirports.has(route.departure),
    arrivalAtc: coveredAirports.has(route.arrival),
    centerAtc: centerCodes.some((centerCode) => coveredCenters.has(centerCode)),
  }));
}
