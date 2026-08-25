"use client";

import { useEffect, useState } from "react";
import type { VatsimStatus } from "@/lib/vatsim/client";

export function LiveStatus() {
  const [status, setStatus] = useState<VatsimStatus | null>(null);

  useEffect(() => {
    fetch("/api/vatsim-status")
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then(setStatus)
      .catch(() => setStatus(null));
  }, []);

  return (
    <div className="live-status" aria-live="polite">
      <span className="status-dot" />
      {status
        ? `${status.pilotsOnline.toLocaleString()} pilots · ${status.controllersOnline.toLocaleString()} controllers online`
        : "Connecting to the VATSIM network…"}
    </div>
  );
}
