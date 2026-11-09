import { JourneyMilestones } from "../../../features/about/components/JourneyMilestones";
import { JOURNEY_SECTION_ID } from "../../../features/about/journey.constants";

export function JourneySection() {
  return (
    <div>
      <JourneyMilestones sectionId={JOURNEY_SECTION_ID} />
    </div>
  );
}
