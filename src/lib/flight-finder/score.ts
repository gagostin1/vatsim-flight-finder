import type { CandidateRoute, ScoredRoute, SearchPreferences } from "./types";

const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

export function scoreRoute(
  route: CandidateRoute,
  preferences: SearchPreferences,
): ScoredRoute {
  let score = 45;
  const reasons: string[] = [];

  if (route.durationMinutes <= preferences.maxMinutes) {
    const closeness = 1 - (preferences.maxMinutes - route.durationMinutes) / preferences.maxMinutes;
    score += 15 * Math.max(0, closeness);
    reasons.push("Fits your available time");
  } else {
    score -= Math.min(35, (route.durationMinutes - preferences.maxMinutes) * 0.8);
  }

  if (route.departureAtc) {
    score += 12;
    reasons.push("Departure ATC online");
  } else if (preferences.requireDepartureAtc) {
    score -= 30;
  }

  if (route.centerAtc) {
    score += 10;
    reasons.push("Enroute ATC online");
  }

  if (route.arrivalAtc) {
    score += 13;
    reasons.push("Arrival ATC online");
  } else if (preferences.requireArrivalAtc) {
    score -= 30;
  }

  if (route.trafficLevel === preferences.traffic) {
    score += 5;
    reasons.push(`${route.trafficLevel[0].toUpperCase()}${route.trafficLevel.slice(1)} traffic`);
  }

  return { ...route, score: clamp(score), reasons };
}

export function rankRoutes(
  routes: CandidateRoute[],
  preferences: SearchPreferences,
): ScoredRoute[] {
  return routes
    .map((route) => scoreRoute(route, preferences))
    .filter((route) => route.durationMinutes <= preferences.maxMinutes + 20)
    .filter((route) => !preferences.requireDepartureAtc || route.departureAtc)
    .filter((route) => !preferences.requireArrivalAtc || route.arrivalAtc)
    .sort((a, b) => b.score - a.score);
}
