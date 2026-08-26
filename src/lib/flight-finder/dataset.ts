import { defineRouteDataset } from "./dataset-validation";

/**
 * A deliberately small eastern-US catalog for the MVP recommendation flow.
 * See DATA_SOURCES.md for provenance, licensing, and duration methodology.
 */
export const routeDataset = defineRouteDataset({
  airports: [
    { icao: "KATL", name: "Hartsfield Jackson Atlanta International Airport", municipality: "Atlanta", latitude: 33.6367, longitude: -84.428101, centerCode: "ATL" },
    { icao: "KBOS", name: "Boston Logan International Airport", municipality: "Boston", latitude: 42.36197, longitude: -71.0079, centerCode: "BOS" },
    { icao: "KCLT", name: "Charlotte Douglas International Airport", municipality: "Charlotte", latitude: 35.214001, longitude: -80.9431, centerCode: "ATL" },
    { icao: "KDCA", name: "Ronald Reagan Washington National Airport", municipality: "Washington", latitude: 38.8521, longitude: -77.037697, centerCode: "DC" },
    { icao: "KDTW", name: "Detroit Metropolitan Wayne County Airport", municipality: "Detroit", latitude: 42.21377, longitude: -83.353786, centerCode: "CLE" },
    { icao: "KEWR", name: "Newark Liberty International Airport", municipality: "Newark", latitude: 40.6894, longitude: -74.170545, centerCode: "NY" },
    { icao: "KIAD", name: "Washington Dulles International Airport", municipality: "Dulles", latitude: 38.9445, longitude: -77.455803, centerCode: "DC" },
    { icao: "KJFK", name: "John F. Kennedy International Airport", municipality: "New York", latitude: 40.639447, longitude: -73.779317, centerCode: "NY" },
    { icao: "KMCO", name: "Orlando International Airport", municipality: "Orlando", latitude: 28.429399, longitude: -81.308998, centerCode: "JAX" },
    { icao: "KORD", name: "Chicago O'Hare International Airport", municipality: "Chicago", latitude: 41.9786, longitude: -87.9048, centerCode: "CHI" },
    { icao: "KPHL", name: "Philadelphia International Airport", municipality: "Philadelphia", latitude: 39.871899, longitude: -75.241096, centerCode: "NY" },
    { icao: "KTPA", name: "Tampa International Airport", municipality: "Tampa", latitude: 27.9755, longitude: -82.533203, centerCode: "JAX" },
  ],
  routes: [
    { id: "kbos-kjfk", departure: "KBOS", arrival: "KJFK", estimatedDurationMinutes: 65, centerCodes: ["BOS", "NY"] },
    { id: "kbos-kewr", departure: "KBOS", arrival: "KEWR", estimatedDurationMinutes: 70, centerCodes: ["BOS", "NY"] },
    { id: "kbos-kphl", departure: "KBOS", arrival: "KPHL", estimatedDurationMinutes: 85, centerCodes: ["BOS", "NY"] },
    { id: "kjfk-kphl", departure: "KJFK", arrival: "KPHL", estimatedDurationMinutes: 65, centerCodes: ["NY"] },
    { id: "kjfk-kdca", departure: "KJFK", arrival: "KDCA", estimatedDurationMinutes: 85, centerCodes: ["NY", "DC"] },
    { id: "kewr-kiad", departure: "KEWR", arrival: "KIAD", estimatedDurationMinutes: 90, centerCodes: ["NY", "DC"] },
    { id: "kphl-kdca", departure: "KPHL", arrival: "KDCA", estimatedDurationMinutes: 70, centerCodes: ["NY", "DC"] },
    { id: "kdca-kclt", departure: "KDCA", arrival: "KCLT", estimatedDurationMinutes: 90, centerCodes: ["DC", "ATL"] },
    { id: "kiad-kclt", departure: "KIAD", arrival: "KCLT", estimatedDurationMinutes: 95, centerCodes: ["DC", "ATL"] },
    { id: "kclt-katl", departure: "KCLT", arrival: "KATL", estimatedDurationMinutes: 75, centerCodes: ["ATL"] },
    { id: "katl-kmco", departure: "KATL", arrival: "KMCO", estimatedDurationMinutes: 90, centerCodes: ["ATL", "JAX"] },
    { id: "katl-ktpa", departure: "KATL", arrival: "KTPA", estimatedDurationMinutes: 95, centerCodes: ["ATL", "JAX"] },
    { id: "kmco-ktpa", departure: "KMCO", arrival: "KTPA", estimatedDurationMinutes: 65, centerCodes: ["JAX"] },
    { id: "kord-kdtw", departure: "KORD", arrival: "KDTW", estimatedDurationMinutes: 75, centerCodes: ["CHI", "CLE"] },
    { id: "kdtw-kbos", departure: "KDTW", arrival: "KBOS", estimatedDurationMinutes: 105, centerCodes: ["CLE", "BOS"] },
    { id: "kord-kewr", departure: "KORD", arrival: "KEWR", estimatedDurationMinutes: 130, centerCodes: ["CHI", "CLE", "NY"] },
    { id: "kord-katl", departure: "KORD", arrival: "KATL", estimatedDurationMinutes: 125, centerCodes: ["CHI", "IND", "ATL"] },
    { id: "kclt-kmco", departure: "KCLT", arrival: "KMCO", estimatedDurationMinutes: 100, centerCodes: ["ATL", "JAX"] },
    { id: "kjfk-kdtw", departure: "KJFK", arrival: "KDTW", estimatedDurationMinutes: 110, centerCodes: ["NY", "CLE"] },
    { id: "kphl-kclt", departure: "KPHL", arrival: "KCLT", estimatedDurationMinutes: 100, centerCodes: ["NY", "DC", "ATL"] },
  ],
} as const);
