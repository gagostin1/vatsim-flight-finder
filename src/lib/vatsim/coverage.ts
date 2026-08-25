const AIRPORT_POSITIONS = ["DEL", "GND", "TWR", "APP", "DEP"] as const;

export type AirportPosition = (typeof AIRPORT_POSITIONS)[number];

export type ParsedControllerCallsign =
  | {
      kind: "airport";
      airportCode: string;
      position: AirportPosition;
    }
  | {
      kind: "center";
      centerCode: string;
    };

export type ControllerCoverage = {
  airports: string[];
  centers: string[];
};

const airportPositions = new Set<string>(AIRPORT_POSITIONS);
const airportCodePattern = /^[A-Z]{4}$/;
const centerCodePattern = /^[A-Z][A-Z0-9]{1,3}$/;
const sectorPattern = /^[A-Z0-9]+$/;

function isAirportPosition(value: string | undefined): value is AirportPosition {
  return value !== undefined && airportPositions.has(value);
}

/**
 * Classifies a VATSIM controller callsign without depending on the live feed.
 * Optional tokens between the facility identifier and position support
 * sectorized callsigns such as KJFK_2_TWR and LON_SC_CTR.
 */
export function parseControllerCallsign(callsign: string): ParsedControllerCallsign | null {
  const tokens = callsign.trim().toUpperCase().split("_");

  if (tokens.length < 2 || tokens.some((token) => !sectorPattern.test(token))) {
    return null;
  }

  const facilityCode = tokens[0];
  const position = tokens.at(-1);

  if (position === "CTR" && centerCodePattern.test(facilityCode)) {
    return { kind: "center", centerCode: facilityCode };
  }

  if (isAirportPosition(position) && airportCodePattern.test(facilityCode)) {
    return {
      kind: "airport",
      airportCode: facilityCode,
      position,
    };
  }

  return null;
}

/** Builds stable, de-duplicated coverage lists from controller callsigns. */
export function parseControllerCoverage(callsigns: Iterable<string>): ControllerCoverage {
  const airports = new Set<string>();
  const centers = new Set<string>();

  for (const callsign of callsigns) {
    const parsed = parseControllerCallsign(callsign);

    if (parsed?.kind === "airport") {
      airports.add(parsed.airportCode);
    } else if (parsed?.kind === "center") {
      centers.add(parsed.centerCode);
    }
  }

  return {
    airports: [...airports].sort(),
    centers: [...centers].sort(),
  };
}
