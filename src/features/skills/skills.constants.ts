import { publicAssetPath } from "../../shared/utils/publicAssetPath";

/** Public path for skill logos (files live under `public/images/skills/`). */
export function skillImagePath(fileName: string): string {
  return publicAssetPath(`images/skills/${fileName}`);
}

/** Home preview grid: 3 columns × 3 rows (see Tendanzo-style toolkit teaser). */
export const SKILLS_HOME_PREVIEW_COLUMNS = 3;
export const SKILLS_HOME_PREVIEW_ROWS = 3;
export const SKILLS_HOME_PREVIEW_LIMIT =
  SKILLS_HOME_PREVIEW_COLUMNS * SKILLS_HOME_PREVIEW_ROWS;

export const SKILLS_SECTION_ID = "skills";

export const skillsSectionContent = {
  titleLead: "Tools",
  titleAccent: "I Excel In",
  description:
    "Languages, styling, frameworks, version control, package tooling, and editors—the core tools that shape day-to-day development on my projects.",
  exploreCta: "Explore My Full Engineering Toolkit",
} as const;
