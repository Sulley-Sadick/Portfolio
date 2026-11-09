import { publicAssetPath } from "../../shared/utils/publicAssetPath";

/** Public path for journey org logos (files live under `public/images/journey/`). */
export function journeyImagePath(fileName: string): string {
  return publicAssetPath(`images/journey/${fileName}`);
}

export const journeySectionContent = {
  titleLead: "Professional",
  titleAccent: "Milestones",
  exploreCta: "Explore Full Journey",
} as const;

export const JOURNEY_SECTION_ID = "professional-journey";
