import { FlightFinder } from "@/components/flight-finder";
import { LiveStatus } from "@/components/live-status";

export default function Home() {
  return (
    <main>
      <nav><a className="brand" href="#top"><span>VF</span> VATSIM Flight Finder</a><a href="https://vatsim.net" target="_blank" rel="noreferrer">VATSIM ↗</a></nav>
      <header id="top">
        <div className="header-copy">
          <p className="kicker">Spend less time choosing. More time flying.</p>
          <h1>Your next great<br /><em>flight is online.</em></h1>
          <p className="lede">Tell us how much time you have and the kind of network experience you want. We’ll rank routes around live ATC coverage, traffic, and fit.</p>
          <LiveStatus />
        </div>
        <div className="radar" aria-hidden="true"><div className="sweep" /><span className="plane">✦</span><span className="blip one" /><span className="blip two" /></div>
      </header>
      <FlightFinder />
      <footer><span>Built for the VATSIM community.</span><span>Data refreshes approximately every 15 seconds.</span></footer>
    </main>
  );
}
