import type { CandidateRoute } from "./types";
import { routeDataset } from "./dataset";

// Temporary UI state. The next milestone replaces these preview signals with live feed data.
const previewSignals = [
  { id: "kclt-katl", trafficLevel: "moderate", departureAtc: true, arrivalAtc: true, centerAtc: true },
  { id: "katl-kmco", trafficLevel: "busy", departureAtc: true, arrivalAtc: true, centerAtc: false },
  { id: "kord-kdtw", trafficLevel: "moderate", departureAtc: true, arrivalAtc: false, centerAtc: true },
  { id: "kbos-kjfk", trafficLevel: "busy", departureAtc: false, arrivalAtc: true, centerAtc: true },
] as const;

export const sampleRoutes: CandidateRoute[] = previewSignals.map(({ id, ...signals }) => {
  const route = routeDataset.routes.find((candidate) => candidate.id === id);

  if (!route) throw new Error(`Preview route is missing from the route dataset: ${id}`);

  return {
    departure: route.departure,
    arrival: route.arrival,
    durationMinutes: route.estimatedDurationMinutes,
    ...signals,
  };
});
