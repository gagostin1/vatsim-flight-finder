import { routeDataset } from "./dataset";
import type { CoverageRoute } from "./coverage-matching";

// Traffic remains a preview signal until live pilot matching is implemented.
const previewTraffic = {
  "kbos-kjfk": "busy",
  "kbos-kewr": "busy",
  "kbos-kphl": "moderate",
  "kjfk-kphl": "moderate",
  "kjfk-kdca": "busy",
  "kewr-kiad": "moderate",
  "kphl-kdca": "moderate",
  "kdca-kclt": "moderate",
  "kiad-kclt": "quiet",
  "kclt-katl": "moderate",
  "katl-kmco": "busy",
  "katl-ktpa": "moderate",
  "kmco-ktpa": "moderate",
  "kord-kdtw": "moderate",
  "kdtw-kbos": "moderate",
  "kord-kewr": "busy",
  "kord-katl": "busy",
  "kclt-kmco": "moderate",
  "kjfk-kdtw": "busy",
  "kphl-kclt": "moderate",
} as const satisfies Record<(typeof routeDataset.routes)[number]["id"], CoverageRoute["trafficLevel"]>;

export const sampleRoutes: CoverageRoute[] = routeDataset.routes.map((route) => ({
  departure: route.departure,
  arrival: route.arrival,
  durationMinutes: route.estimatedDurationMinutes,
  trafficLevel: previewTraffic[route.id],
  centerCodes: route.centerCodes,
}));
