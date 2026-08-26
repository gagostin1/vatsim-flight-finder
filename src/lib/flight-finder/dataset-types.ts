export type Airport = {
  icao: string;
  name: string;
  municipality: string;
  latitude: number;
  longitude: number;
  centerCode: string;
};

export type RouteDefinition = {
  id: string;
  departure: string;
  arrival: string;
  estimatedDurationMinutes: number;
  centerCodes: readonly string[];
};

export type RouteDataset = {
  airports: readonly Airport[];
  routes: readonly RouteDefinition[];
};
