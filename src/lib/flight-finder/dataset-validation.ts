import type { RouteDataset } from "./dataset-types";

const icaoPattern = /^[A-Z]{4}$/;
const centerCodePattern = /^[A-Z][A-Z0-9]{1,3}$/;
const routeIdPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function findDuplicates(values: readonly string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }

  return [...duplicates].sort();
}

export function validateRouteDataset(dataset: RouteDataset): string[] {
  const errors: string[] = [];
  const airportsByCode = new Map(dataset.airports.map((airport) => [airport.icao, airport]));

  for (const duplicate of findDuplicates(dataset.airports.map((airport) => airport.icao))) {
    errors.push(`Duplicate airport ICAO code: ${duplicate}`);
  }

  for (const airport of dataset.airports) {
    if (!icaoPattern.test(airport.icao)) {
      errors.push(`Invalid airport ICAO code: ${airport.icao}`);
    }
    if (!airport.name.trim() || !airport.municipality.trim()) {
      errors.push(`Airport ${airport.icao} is missing a name or municipality`);
    }
    if (!Number.isFinite(airport.latitude) || airport.latitude < -90 || airport.latitude > 90) {
      errors.push(`Airport ${airport.icao} has an invalid latitude`);
    }
    if (
      !Number.isFinite(airport.longitude) ||
      airport.longitude < -180 ||
      airport.longitude > 180
    ) {
      errors.push(`Airport ${airport.icao} has an invalid longitude`);
    }
    if (!centerCodePattern.test(airport.centerCode)) {
      errors.push(`Airport ${airport.icao} has an invalid center code: ${airport.centerCode}`);
    }
  }

  for (const duplicate of findDuplicates(dataset.routes.map((route) => route.id))) {
    errors.push(`Duplicate route ID: ${duplicate}`);
  }

  const routePairs = dataset.routes.map((route) => `${route.departure}-${route.arrival}`);
  for (const duplicate of findDuplicates(routePairs)) {
    errors.push(`Duplicate route pair: ${duplicate}`);
  }

  for (const route of dataset.routes) {
    if (!routeIdPattern.test(route.id)) {
      errors.push(`Invalid route ID: ${route.id}`);
    }
    const departureAirport = airportsByCode.get(route.departure);
    const arrivalAirport = airportsByCode.get(route.arrival);

    if (!departureAirport) {
      errors.push(`Route ${route.id} references unknown departure airport: ${route.departure}`);
    }
    if (!arrivalAirport) {
      errors.push(`Route ${route.id} references unknown arrival airport: ${route.arrival}`);
    }
    if (route.departure === route.arrival) {
      errors.push(`Route ${route.id} must use different airports`);
    }
    if (
      !Number.isInteger(route.estimatedDurationMinutes) ||
      route.estimatedDurationMinutes <= 0
    ) {
      errors.push(`Route ${route.id} has an invalid estimated duration`);
    }
    if (route.centerCodes.length === 0) {
      errors.push(`Route ${route.id} must include at least one center code`);
    }
    for (const duplicate of findDuplicates(route.centerCodes)) {
      errors.push(`Route ${route.id} repeats center code: ${duplicate}`);
    }
    for (const centerCode of route.centerCodes) {
      if (!centerCodePattern.test(centerCode)) {
        errors.push(`Route ${route.id} has an invalid center code: ${centerCode}`);
      }
    }
    if (departureAirport && !route.centerCodes.includes(departureAirport.centerCode)) {
      errors.push(`Route ${route.id} does not include departure center: ${departureAirport.centerCode}`);
    }
    if (arrivalAirport && !route.centerCodes.includes(arrivalAirport.centerCode)) {
      errors.push(`Route ${route.id} does not include arrival center: ${arrivalAirport.centerCode}`);
    }
  }

  return errors;
}

export function defineRouteDataset<const T extends RouteDataset>(dataset: T): T {
  const errors = validateRouteDataset(dataset);

  if (errors.length > 0) {
    throw new Error(`Invalid route dataset:\n${errors.join("\n")}`);
  }

  return dataset;
}
