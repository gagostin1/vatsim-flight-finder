import { afterEach, describe, expect, it, vi } from "vitest";
import { getVatsimStatus } from "./client";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("getVatsimStatus", () => {
  it("returns network counts and parsed controller coverage", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          general: { update_timestamp: "2026-08-26T12:00:00Z" },
          pilots: [{}, {}],
          controllers: [
            { callsign: "KJFK_TWR" },
            { callsign: "NY_CTR" },
            { callsign: "SUP" },
          ],
        }),
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(getVatsimStatus()).resolves.toEqual({
      updatedAt: "2026-08-26T12:00:00Z",
      pilotsOnline: 2,
      controllersOnline: 3,
      coverage: { airports: ["KJFK"], centers: ["NY"] },
    });
    expect(fetchMock).toHaveBeenCalledWith("https://data.vatsim.net/v3/vatsim-data.json", {
      next: { revalidate: 15 },
    });
  });

  it("uses the configured data URL", async () => {
    vi.stubEnv("VATSIM_DATA_URL", "https://example.test/vatsim.json");
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          general: { update_timestamp: "2026-08-26T12:00:00Z" },
          pilots: [],
          controllers: [],
        }),
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    await getVatsimStatus();

    expect(fetchMock).toHaveBeenCalledWith("https://example.test/vatsim.json", {
      next: { revalidate: 15 },
    });
  });

  it("rejects unsuccessful responses", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 503 })));

    await expect(getVatsimStatus()).rejects.toThrow("VATSIM data request failed (503)");
  });

  it("rejects controller records without callsigns", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            general: { update_timestamp: "2026-08-26T12:00:00Z" },
            pilots: [],
            controllers: [{}],
          }),
        ),
      ),
    );

    await expect(getVatsimStatus()).rejects.toThrow("VATSIM returned an unexpected response");
  });
});
