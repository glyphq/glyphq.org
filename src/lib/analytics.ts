const configuredUrl = import.meta.env.PUBLIC_ANALYTICS_URL;
const defaultUrl = import.meta.env.DEV ? "http://127.0.0.1:8787" : "/api";

export const ANALYTICS_URL = (configuredUrl || defaultUrl).replace(/\/$/, "");

export const trackDownload = (platform: string) => {
  if (typeof navigator === "undefined") return;

  const body = JSON.stringify({ platform });
  if (navigator.sendBeacon) {
    navigator.sendBeacon(
      `${ANALYTICS_URL}/downloads`,
      new Blob([body], { type: "text/plain;charset=UTF-8" }),
    );
    return;
  }

  void fetch(`${ANALYTICS_URL}/downloads`, {
    method: "POST",
    body,
    keepalive: true,
    headers: { "Content-Type": "text/plain" },
  });
};
