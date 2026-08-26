"use client";

import { useVatsimStatus } from "./vatsim-status-provider";

export function LiveStatus() {
  const status = useVatsimStatus();

  return (
    <div className="live-status" aria-live="polite">
      <span className="status-dot" />
      {status
        ? `${status.pilotsOnline.toLocaleString()} pilots · ${status.controllersOnline.toLocaleString()} controllers online`
        : "Connecting to the VATSIM network…"}
    </div>
  );
}
