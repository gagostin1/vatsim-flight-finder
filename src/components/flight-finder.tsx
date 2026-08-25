"use client";

import { useMemo, useState } from "react";
import { rankRoutes } from "@/lib/flight-finder/score";
import { sampleRoutes } from "@/lib/flight-finder/sample-routes";
import type { SearchPreferences, TrafficPreference } from "@/lib/flight-finder/types";

const initialPreferences: SearchPreferences = {
  maxMinutes: 90,
  traffic: "moderate",
  requireDepartureAtc: true,
  requireArrivalAtc: true,
};

export function FlightFinder() {
  const [preferences, setPreferences] = useState(initialPreferences);
  const routes = useMemo(() => rankRoutes(sampleRoutes, preferences), [preferences]);

  return (
    <section className="finder-grid" aria-label="Flight finder">
      <form className="search-card" onSubmit={(event) => event.preventDefault()}>
        <div className="section-heading">
          <span>01</span>
          <div><p>Set your preferences</p><h2>What kind of flight?</h2></div>
        </div>

        <label>
          Time available
          <div className="range-row">
            <input
              type="range"
              min="45"
              max="180"
              step="15"
              value={preferences.maxMinutes}
              onChange={(event) => setPreferences({ ...preferences, maxMinutes: Number(event.target.value) })}
            />
            <output>{preferences.maxMinutes} min</output>
          </div>
        </label>

        <fieldset>
          <legend>Traffic level</legend>
          <div className="segmented">
            {(["quiet", "moderate", "busy"] as TrafficPreference[]).map((traffic) => (
              <button
                type="button"
                className={preferences.traffic === traffic ? "active" : ""}
                onClick={() => setPreferences({ ...preferences, traffic })}
                key={traffic}
              >
                {traffic}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="check-row">
          <input type="checkbox" checked={preferences.requireDepartureAtc} onChange={(event) => setPreferences({ ...preferences, requireDepartureAtc: event.target.checked })} />
          Require departure ATC
        </label>
        <label className="check-row">
          <input type="checkbox" checked={preferences.requireArrivalAtc} onChange={(event) => setPreferences({ ...preferences, requireArrivalAtc: event.target.checked })} />
          Require arrival ATC
        </label>

        <p className="form-note">MVP preview uses a small route catalog. Live coverage matching comes next.</p>
      </form>

      <div className="results">
        <div className="section-heading">
          <span>02</span>
          <div><p>Ranked for you</p><h2>Best matches</h2></div>
        </div>
        {routes.length ? routes.map((route, index) => (
          <article className="route-card" key={`${route.departure}-${route.arrival}`}>
            <div className="route-main">
              <span className="eyebrow">{index === 0 ? "Top match" : `Option ${index + 1}`}</span>
              <h3>{route.departure} <span>→</span> {route.arrival}</h3>
              <p>{route.durationMinutes} min · {route.trafficLevel} traffic</p>
              <ul>{route.reasons.slice(0, 3).map((reason) => <li key={reason}>{reason}</li>)}</ul>
            </div>
            <div className="score"><strong>{route.score}</strong><span>match</span></div>
          </article>
        )) : <div className="empty-state">No routes match every requirement yet. Try allowing one uncovered airport or adding more time.</div>}
      </div>
    </section>
  );
}
