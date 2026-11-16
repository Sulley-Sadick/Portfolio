import { getEnv } from "./utils/getEnv";

/** Must match `CANONICAL_HOST` in `seo.build-data.ts` and `public/CNAME`. */
export const CANONICAL_HOST = "www.sulleysadick.dev";

function siteOriginFromEnv(): string {
  const raw = getEnv({ name: "VITE_APP_URL" });
  try {
    const parsed = new URL(raw.trim());
    parsed.hostname = CANONICAL_HOST;
    return parsed.origin;
  } catch {
    return `https://${CANONICAL_HOST}`;
  }
}

/** Canonical origin (www) for this site — avoids apex↔www redirect mismatches in Search Console. */
export function canonicalOrigin(): string {
  return siteOriginFromEnv();
}

/** Absolute URL for an app route (`/`, `/about`, …). */
export function canonicalRouteUrl(pathname: string): string {
  const origin = canonicalOrigin();
  const segment = pathname.replace(/^\//, "").replace(/\/$/, "");
  if (!segment) {
    return `${origin}/`;
  }
  return `${origin}/${segment}`;
}