import { describe, expect, it } from "vitest";
import { routeDataset } from "./dataset";
import { sampleRoutes } from "./sample-routes";

describe("sampleRoutes", () => {
  it("uses canonical airport pairs and durations from the route dataset", () => {
    for (const sampleRoute of sampleRoutes) {
      const datasetRoute = routeDataset.routes.find(
        (route) =>
          route.departure === sampleRoute.departure && route.arrival === sampleRoute.arrival,
      );

      expect(datasetRoute).toBeDefined();
      expect(sampleRoute.durationMinutes).toBe(datasetRoute?.estimatedDurationMinutes);
    }
  });
});
