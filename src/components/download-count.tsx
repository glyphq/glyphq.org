"use client";

import { useEffect, useState } from "react";
import { ANALYTICS_URL } from "../lib/analytics";

export default function DownloadCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch(`${ANALYTICS_URL}/downloads`, { cache: "no-store" });
        if (!response.ok) return;
        const data = (await response.json()) as { count?: unknown };
        if (!cancelled && typeof data.count === "number") setCount(data.count);
      } catch {
        // The download itself must not depend on analytics availability.
      }
    };

    void load();
    const timer = window.setInterval(load, 15000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  return (
    <span className="font-medium text-ink">
      {count === null ? "—" : new Intl.NumberFormat("en-US").format(count)}
    </span>
  );
}
