/** Public path for journey org logos (files live under `public/images/journey/`). */
export const JOURNEY_IMAGE_BASE_PATH = "/images/journey";

export function journeyImagePath(fileName: string): string {
  return `${JOURNEY_IMAGE_BASE_PATH}/${fileName}`;
}

export const journeySectionContent = {
  titleLead: "Professional",
  titleAccent: "Milestones",
  exploreCta: "Explore Full Journey",
} as const;

export const JOURNEY_SECTION_ID = "professional-journey";
