/**
 * Build a URL for a file served from `public/`, respecting Vite `base`
 * (`/` on sulleysadick.dev and in local dev).
 */
export function publicAssetPath(relativePath: string): string {
  const base = import.meta.env.BASE_URL;
  const withSlash = base.endsWith("/") ? base : `${base}/`;
  const normalized = relativePath.replace(/^\/+/, "");
  return `${withSlash}${normalized}`;
}
