import { defineRouteDataset } from "./dataset-validation";

/**
 * A deliberately small eastern-US catalog for the MVP recommendation flow.
 * See DATA_SOURCES.md for provenance, licensing, and duration methodology.
 */
export const routeDataset = defineRouteDataset({
  airports: [
    { icao: "KATL", name: "Hartsfield Jackson Atlanta International Airport", municipality: "Atlanta", latitude: 33.6367, longitude: -84.428101, centerCode: "ZTL" },
    { icao: "KBOS", name: "Boston Logan International Airport", municipality: "Boston", latitude: 42.36197, longitude: -71.0079, centerCode: "ZBW" },
    { icao: "KCLT", name: "Charlotte Douglas International Airport", municipality: "Charlotte", latitude: 35.214001, longitude: -80.9431, centerCode: "ZTL" },
    { icao: "KDCA", name: "Ronald Reagan Washington National Airport", municipality: "Washington", latitude: 38.8521, longitude: -77.037697, centerCode: "ZDC" },
    { icao: "KDTW", name: "Detroit Metropolitan Wayne County Airport", municipality: "Detroit", latitude: 42.21377, longitude: -83.353786, centerCode: "ZOB" },
    { icao: "KEWR", name: "Newark Liberty International Airport", municipality: "Newark", latitude: 40.6894, longitude: -74.170545, centerCode: "ZNY" },
    { icao: "KIAD", name: "Washington Dulles International Airport", municipality: "Dulles", latitude: 38.9445, longitude: -77.455803, centerCode: "ZDC" },
    { icao: "KJFK", name: "John F. Kennedy International Airport", municipality: "New York", latitude: 40.639447, longitude: -73.779317, centerCode: "ZNY" },
    { icao: "KMCO", name: "Orlando International Airport", municipality: "Orlando", latitude: 28.429399, longitude: -81.308998, centerCode: "ZJX" },
    { icao: "KORD", name: "Chicago O'Hare International Airport", municipality: "Chicago", latitude: 41.9786, longitude: -87.9048, centerCode: "ZAU" },
    { icao: "KPHL", name: "Philadelphia International Airport", municipality: "Philadelphia", latitude: 39.871899, longitude: -75.241096, centerCode: "ZNY" },
    { icao: "KTPA", name: "Tampa International Airport", municipality: "Tampa", latitude: 27.9755, longitude: -82.533203, centerCode: "ZJX" },
  ],
  routes: [
    { id: "kbos-kjfk", departure: "KBOS", arrival: "KJFK", estimatedDurationMinutes: 65, centerCodes: ["ZBW", "ZNY"] },
    { id: "kbos-kewr", departure: "KBOS", arrival: "KEWR", estimatedDurationMinutes: 70, centerCodes: ["ZBW", "ZNY"] },
    { id: "kbos-kphl", departure: "KBOS", arrival: "KPHL", estimatedDurationMinutes: 85, centerCodes: ["ZBW", "ZNY"] },
    { id: "kjfk-kphl", departure: "KJFK", arrival: "KPHL", estimatedDurationMinutes: 65, centerCodes: ["ZNY"] },
    { id: "kjfk-kdca", departure: "KJFK", arrival: "KDCA", estimatedDurationMinutes: 85, centerCodes: ["ZNY", "ZDC"] },
    { id: "kewr-kiad", departure: "KEWR", arrival: "KIAD", estimatedDurationMinutes: 90, centerCodes: ["ZNY", "ZDC"] },
    { id: "kphl-kdca", departure: "KPHL", arrival: "KDCA", estimatedDurationMinutes: 70, centerCodes: ["ZNY", "ZDC"] },
    { id: "kdca-kclt", departure: "KDCA", arrival: "KCLT", estimatedDurationMinutes: 90, centerCodes: ["ZDC", "ZTL"] },
    { id: "kiad-kclt", departure: "KIAD", arrival: "KCLT", estimatedDurationMinutes: 95, centerCodes: ["ZDC", "ZTL"] },
    { id: "kclt-katl", departure: "KCLT", arrival: "KATL", estimatedDurationMinutes: 75, centerCodes: ["ZTL"] },
    { id: "katl-kmco", departure: "KATL", arrival: "KMCO", estimatedDurationMinutes: 90, centerCodes: ["ZTL", "ZJX"] },
    { id: "katl-ktpa", departure: "KATL", arrival: "KTPA", estimatedDurationMinutes: 95, centerCodes: ["ZTL", "ZJX"] },
    { id: "kmco-ktpa", departure: "KMCO", arrival: "KTPA", estimatedDurationMinutes: 65, centerCodes: ["ZJX"] },
    { id: "kord-kdtw", departure: "KORD", arrival: "KDTW", estimatedDurationMinutes: 75, centerCodes: ["ZAU", "ZOB"] },
    { id: "kdtw-kbos", departure: "KDTW", arrival: "KBOS", estimatedDurationMinutes: 105, centerCodes: ["ZOB", "ZBW"] },
    { id: "kord-kewr", departure: "KORD", arrival: "KEWR", estimatedDurationMinutes: 130, centerCodes: ["ZAU", "ZOB", "ZNY"] },
    { id: "kord-katl", departure: "KORD", arrival: "KATL", estimatedDurationMinutes: 125, centerCodes: ["ZAU", "ZID", "ZTL"] },
    { id: "kclt-kmco", departure: "KCLT", arrival: "KMCO", estimatedDurationMinutes: 100, centerCodes: ["ZTL", "ZJX"] },
    { id: "kjfk-kdtw", departure: "KJFK", arrival: "KDTW", estimatedDurationMinutes: 110, centerCodes: ["ZNY", "ZOB"] },
    { id: "kphl-kclt", departure: "KPHL", arrival: "KCLT", estimatedDurationMinutes: 100, centerCodes: ["ZNY", "ZDC", "ZTL"] },
  ],
} as const);
