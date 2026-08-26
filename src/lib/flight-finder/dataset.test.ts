import { describe, expect, it } from "vitest";
import { routeDataset } from "./dataset";
import { defineRouteDataset, validateRouteDataset } from "./dataset-validation";
import type { RouteDataset } from "./dataset-types";

const validDataset: RouteDataset = {
  airports: [
    {
      icao: "KJFK",
      name: "John F. Kennedy International Airport",
      municipality: "New York",
      latitude: 40.639447,
      longitude: -73.779317,
      centerCode: "ZNY",
    },
    {
      icao: "KBOS",
      name: "Boston Logan International Airport",
      municipality: "Boston",
      latitude: 42.36197,
      longitude: -71.0079,
      centerCode: "ZBW",
    },
  ],
  routes: [
    {
      id: "kjfk-kbos",
      departure: "KJFK",
      arrival: "KBOS",
      estimatedDurationMinutes: 70,
      centerCodes: ["ZNY", "ZBW"],
    },
  ],
};

describe("routeDataset", () => {
  it("contains the intended MVP-sized airport and route catalogs", () => {
    expect(routeDataset.airports).toHaveLength(12);
    expect(routeDataset.routes).toHaveLength(20);
  });

  it("passes the complete dataset validation", () => {
    expect(validateRouteDataset(routeDataset)).toEqual([]);
  });

  it("keeps routes in stable source order", () => {
    expect(routeDataset.routes.map((route) => route.id)).toMatchInlineSnapshot(`
      [
        "kbos-kjfk",
        "kbos-kewr",
        "kbos-kphl",
        "kjfk-kphl",
        "kjfk-kdca",
        "kewr-kiad",
        "kphl-kdca",
        "kdca-kclt",
        "kiad-kclt",
        "kclt-katl",
        "katl-kmco",
        "katl-ktpa",
        "kmco-ktpa",
        "kord-kdtw",
        "kdtw-kbos",
        "kord-kewr",
        "kord-katl",
        "kclt-kmco",
        "kjfk-kdtw",
        "kphl-kclt",
      ]
    `);
  });
});

describe("validateRouteDataset", () => {
  it("accepts a valid dataset", () => {
    expect(validateRouteDataset(validDataset)).toEqual([]);
  });

  it("reports duplicate airport codes, route IDs, and route pairs", () => {
    const duplicateDataset: RouteDataset = {
      airports: [...validDataset.airports, validDataset.airports[0]],
      routes: [...validDataset.routes, validDataset.routes[0]],
    };

    expect(validateRouteDataset(duplicateDataset)).toEqual(
      expect.arrayContaining([
        "Duplicate airport ICAO code: KJFK",
        "Duplicate route ID: kjfk-kbos",
        "Duplicate route pair: KJFK-KBOS",
      ]),
    );
  });

  it("reports malformed airport fields and out-of-range coordinates", () => {
    const invalidDataset: RouteDataset = {
      airports: [
        {
          icao: "JFK",
          name: " ",
          municipality: "",
          latitude: 91,
          longitude: Number.NaN,
          centerCode: "bad",
        },
      ],
      routes: [],
    };

    expect(validateRouteDataset(invalidDataset)).toEqual([
      "Invalid airport ICAO code: JFK",
      "Airport JFK is missing a name or municipality",
      "Airport JFK has an invalid latitude",
      "Airport JFK has an invalid longitude",
      "Airport JFK has an invalid center code: bad",
    ]);
  });

  it("reports broken airport references and invalid route fields", () => {
    const invalidDataset: RouteDataset = {
      airports: validDataset.airports,
      routes: [
        {
          id: "Bad ID",
          departure: "KXXX",
          arrival: "KXXX",
          estimatedDurationMinutes: 0.5,
          centerCodes: ["bad"],
        },
      ],
    };

    expect(validateRouteDataset(invalidDataset)).toEqual([
      "Invalid route ID: Bad ID",
      "Route Bad ID references unknown departure airport: KXXX",
      "Route Bad ID references unknown arrival airport: KXXX",
      "Route Bad ID must use different airports",
      "Route Bad ID has an invalid estimated duration",
      "Route Bad ID has an invalid center code: bad",
    ]);
  });

  it("requires at least one center code per route", () => {
    const invalidDataset: RouteDataset = {
      airports: validDataset.airports,
      routes: [{ ...validDataset.routes[0], centerCodes: [] }],
    };

    expect(validateRouteDataset(invalidDataset)).toContain(
      "Route kjfk-kbos must include at least one center code",
    );
  });

  it("requires unique center codes covering both endpoint centers", () => {
    const invalidDataset: RouteDataset = {
      airports: validDataset.airports,
      routes: [{ ...validDataset.routes[0], centerCodes: ["ZNY", "ZNY"] }],
    };

    expect(validateRouteDataset(invalidDataset)).toEqual([
      "Route kjfk-kbos repeats center code: ZNY",
      "Route kjfk-kbos does not include arrival center: ZBW",
    ]);
  });

  it("throws when defining an invalid dataset", () => {
    expect(() =>
      defineRouteDataset({
        airports: [],
        routes: [
          {
            id: "missing-airports",
            departure: "KJFK",
            arrival: "KBOS",
            estimatedDurationMinutes: 70,
            centerCodes: ["ZNY"],
          },
        ],
      }),
    ).toThrowError(/unknown departure airport/);
  });
});
