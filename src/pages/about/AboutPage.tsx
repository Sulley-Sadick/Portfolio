import { JOURNEY_SECTION_ID } from "../../features/about/journey.constants";
import { SKILLS_SECTION_ID } from "../../features/skills";
import { useHashScrollToSection } from "../../shared/hooks/useHashScrollToSection";

import { AboutProfileSection } from "./sections/Profile";
import { JourneySection } from "./sections/Journey";
import { SkillsSection } from "./sections/Skills";

export function AboutPage() {
  useHashScrollToSection({ sectionId: JOURNEY_SECTION_ID });
  useHashScrollToSection({ sectionId: SKILLS_SECTION_ID });

  return (
    <main className="mt-20">
      <AboutProfileSection />
      <JourneySection />
      <SkillsSection />
    </main>
  );
}
