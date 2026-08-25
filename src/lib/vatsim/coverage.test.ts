import { describe, expect, it } from "vitest";
import { parseControllerCallsign, parseControllerCoverage } from "./coverage";

describe("parseControllerCallsign", () => {
  it.each([
    ["KJFK_DEL", "DEL"],
    ["KJFK_GND", "GND"],
    ["KJFK_TWR", "TWR"],
    ["KJFK_APP", "APP"],
    ["KJFK_DEP", "DEP"],
  ] as const)("parses the airport position in %s", (callsign, position) => {
    expect(parseControllerCallsign(callsign)).toEqual({
      kind: "airport",
      airportCode: "KJFK",
      position,
    });
  });

  it("parses international airport identifiers", () => {
    expect(parseControllerCallsign("EGLL_TWR")).toEqual({
      kind: "airport",
      airportCode: "EGLL",
      position: "TWR",
    });
  });

  it("parses sectorized airport positions", () => {
    expect(parseControllerCallsign("KJFK_2_TWR")).toEqual({
      kind: "airport",
      airportCode: "KJFK",
      position: "TWR",
    });
  });

  it.each(["ZNY_CTR", "LON_SC_CTR", "CZQX_1_CTR"])(
    "parses center position %s",
    (callsign) => {
      expect(parseControllerCallsign(callsign)).toEqual({
        kind: "center",
        centerCode: callsign.split("_")[0],
      });
    },
  );

  it("normalizes surrounding whitespace and letter case", () => {
    expect(parseControllerCallsign("  kjfk_gnd  ")).toEqual({
      kind: "airport",
      airportCode: "KJFK",
      position: "GND",
    });
  });

  it.each([
    "",
    "KJFK",
    "JFK_TWR",
    "KJFK_ATIS",
    "KJFK_OBS",
    "KZAK_FSS",
    "LAX_APP",
    "KJFK__TWR",
    "KJFK_TWR_EXTRA",
    "KJFK-N_TWR",
  ])("rejects unsupported or malformed callsign %j", (callsign) => {
    expect(parseControllerCallsign(callsign)).toBeNull();
  });
});

describe("parseControllerCoverage", () => {
  it("returns sorted, unique airport and center coverage", () => {
    expect(
      parseControllerCoverage([
        "KSEA_TWR",
        "ZSE_CTR",
        "KJFK_GND",
        "KSEA_APP",
        "LON_SC_CTR",
        "ZSE_1_CTR",
      ]),
    ).toEqual({
      airports: ["KJFK", "KSEA"],
      centers: ["LON", "ZSE"],
    });
  });

  it("ignores callsigns that do not provide airport or center coverage", () => {
    expect(parseControllerCoverage(["KJFK_ATIS", "SUP", "KZAK_FSS", "bad data"])).toEqual({
      airports: [],
      centers: [],
    });
  });

  it("accepts any iterable of callsigns", () => {
    expect(parseControllerCoverage(new Set(["KLAX_TWR", "LAX_CTR"]))).toEqual({
      airports: ["KLAX"],
      centers: ["LAX"],
    });
  });
});
