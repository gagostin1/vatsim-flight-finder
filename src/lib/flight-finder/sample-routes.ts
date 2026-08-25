import type { CandidateRoute } from "./types";

// Temporary seed data for the UI. Milestone 1 replaces ATC flags with live feed data.
export const sampleRoutes: CandidateRoute[] = [
  { departure: "KCLT", arrival: "KATL", durationMinutes: 65, trafficLevel: "moderate", departureAtc: true, arrivalAtc: true, centerAtc: true },
  { departure: "KATL", arrival: "KMCO", durationMinutes: 78, trafficLevel: "busy", departureAtc: true, arrivalAtc: true, centerAtc: false },
  { departure: "KPHX", arrival: "KLAS", durationMinutes: 62, trafficLevel: "moderate", departureAtc: true, arrivalAtc: false, centerAtc: true },
  { departure: "KBOS", arrival: "KJFK", durationMinutes: 55, trafficLevel: "busy", departureAtc: false, arrivalAtc: true, centerAtc: true },
];
