import { publicAssetPath } from "../../shared/utils/publicAssetPath";

/** Public path for project screenshots (files live under `public/images/projects/`). */
export function projectImagePath(fileName: string): string {
  return publicAssetPath(`images/projects/${fileName}`);
}

/** Tags shown on a card before collapsing the rest into "+N". */
export const PROJECT_CARD_MAX_VISIBLE_TAGS = 4;

export const projectsSectionContent = {
  titleLead: "Featured",
  titleAccent: "Web Applications",
  description:
    "Selected work built for real-world use—a retail product catalog with WhatsApp ordering for streamlined discovery, and a geolocation-aware weather application for local conditions and on-demand search. Both emphasize clear interfaces, dependable behavior, and maintainable front-end implementation.",
} as const;
