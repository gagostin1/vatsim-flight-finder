export type TrafficPreference = "quiet" | "moderate" | "busy";

export type SearchPreferences = {
  maxMinutes: number;
  traffic: TrafficPreference;
  requireDepartureAtc: boolean;
  requireArrivalAtc: boolean;
};

export type CandidateRoute = {
  departure: string;
  arrival: string;
  durationMinutes: number;
  trafficLevel: TrafficPreference;
  departureAtc: boolean;
  arrivalAtc: boolean;
  centerAtc: boolean;
};

export type ScoredRoute = CandidateRoute & {
  score: number;
  reasons: string[];
};
