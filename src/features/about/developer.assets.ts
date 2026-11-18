/**
 * Master portrait files (edit these). Build emits optimized variants for the app.
 * `AboutDeveloperType.avatar1` / `avatar2` resolve to the optimized imports in `developer.db.ts`.
 */

export const DEVELOPER_AVATAR_SOURCES = {
  /** Hero — studio portrait on dark background (large PNG master). */
  avatar1Master: "src/assets/images/avatar1.png",
  avatar1Optimized: "src/assets/images/avatar1.webp",
  /** Navbar, footer, favicon circle crop. */
  avatar2Master: "src/assets/images/avatar2.jpg",
} as const;

export const AVATAR1_MAX_WIDTH = 960;
export const AVATAR1_WEBP_QUALITY = 88;