"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { VatsimStatus } from "@/lib/vatsim/client";

const REFRESH_INTERVAL_MS = 15_000;
const VatsimStatusContext = createContext<VatsimStatus | null | undefined>(undefined);

export function VatsimStatusProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<VatsimStatus | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadStatus() {
      try {
        const response = await fetch("/api/vatsim-status", { signal: controller.signal });
        if (!response.ok) throw new Error(`VATSIM status request failed (${response.status})`);
        setStatus((await response.json()) as VatsimStatus);
      } catch {
        if (!controller.signal.aborted) setStatus(null);
      }
    }

    void loadStatus();
    const interval = window.setInterval(loadStatus, REFRESH_INTERVAL_MS);

    return () => {
      controller.abort();
      window.clearInterval(interval);
    };
  }, []);

  return <VatsimStatusContext value={status}>{children}</VatsimStatusContext>;
}

export function useVatsimStatus(): VatsimStatus | null {
  const status = useContext(VatsimStatusContext);

  if (status === undefined) {
    throw new Error("useVatsimStatus must be used inside VatsimStatusProvider");
  }

  return status;
}
