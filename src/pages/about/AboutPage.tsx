import { JOURNEY_SECTION_ID } from "../../features/about/journey.constants";
import { useHashScrollToSection } from "../../shared/hooks/useHashScrollToSection";

import { JourneySection } from "./sections/Journey";

export function AboutPage() {
  useHashScrollToSection({ sectionId: JOURNEY_SECTION_ID });

  return (
    <main className="mt-20">
      <JourneySection />
    </main>
  );
}
