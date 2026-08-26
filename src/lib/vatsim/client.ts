import { parseControllerCoverage, type ControllerCoverage } from "./coverage";

const DEFAULT_DATA_URL = "https://data.vatsim.net/v3/vatsim-data.json";

type VatsimController = {
  callsign: string;
};

type VatsimData = {
  general: { update_timestamp: string };
  pilots: unknown[];
  controllers: VatsimController[];
};

export type VatsimStatus = {
  updatedAt: string;
  pilotsOnline: number;
  controllersOnline: number;
  coverage: ControllerCoverage;
};

function isVatsimController(value: unknown): value is VatsimController {
  if (!value || typeof value !== "object") return false;
  return typeof (value as Partial<VatsimController>).callsign === "string";
}

function isVatsimData(value: unknown): value is VatsimData {
  if (!value || typeof value !== "object") return false;
  const data = value as Partial<VatsimData>;
  return Boolean(
    data.general &&
      typeof data.general.update_timestamp === "string" &&
      Array.isArray(data.pilots) &&
      Array.isArray(data.controllers) &&
      data.controllers.every(isVatsimController),
  );
}

export async function getVatsimStatus(): Promise<VatsimStatus> {
  const response = await fetch(process.env.VATSIM_DATA_URL ?? DEFAULT_DATA_URL, {
    next: { revalidate: 15 },
  });

  if (!response.ok) throw new Error(`VATSIM data request failed (${response.status})`);

  const data: unknown = await response.json();
  if (!isVatsimData(data)) throw new Error("VATSIM returned an unexpected response");

  return {
    updatedAt: data.general.update_timestamp,
    pilotsOnline: data.pilots.length,
    controllersOnline: data.controllers.length,
    coverage: parseControllerCoverage(data.controllers.map((controller) => controller.callsign)),
  };
}
