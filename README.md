# VATSIM Flight Finder

A web app that helps VATSIM pilots choose a route based on available time, desired traffic, and live ATC coverage.

## Stack

- Next.js App Router + React + TypeScript
- VATSIM public data feed through a server route
- Vitest for fast unit tests
- ESLint, strict TypeScript, and GitHub Actions CI

## Start locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No API key is required.

Before committing, run:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## MVP milestone: useful route recommendations

The first milestone is complete when a pilot can enter a time budget and coverage preferences, receive at least three ranked airport pairs, and understand why each route was recommended.

### Milestone 1 issues

1. Parse live controller callsigns into airport and center coverage.
2. Add a small, licensed airport/route dataset with coordinates and estimated durations.
3. Replace preview ATC flags with live coverage matching.
4. Show feed freshness and a friendly degraded-data state.
5. Add tests for callsign parsing, duration filtering, and deterministic ranking.

### Deliberately later

Accounts, saved searches, historical coverage prediction, events, METAR filtering, and worldwide route generation are valuable—but not required to prove the MVP.

## Project map

```text
src/app/                       pages, styling, and server endpoints
src/components/                interactive UI
src/lib/vatsim/                VATSIM data access and validation
src/lib/flight-finder/         route types, filters, and scoring
.github/workflows/ci.yml       pull-request quality checks
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the branch and pull-request workflow.
