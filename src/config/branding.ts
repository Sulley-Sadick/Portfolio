/**
 * Public branding assets (generated via `pnpm run brand:icons` from `sadick2.jpg`).
 * Paths are relative to `public/`.
 */

export const BRAND_PORTRAIT_SOURCE = "src/assets/images/sadick2.jpg";

export const brandPortrait = {
  faviconIco: "favicon.ico",
  png48: "branding/sulley-portrait-48.png",
  png192: "branding/sulley-portrait-192.png",
  png512: "branding/sulley-portrait-512.png",
} as const;

/** Open Graph, Twitter, and Person schema share image. */
export const DEFAULT_SHARE_IMAGE = brandPortrait.png512;