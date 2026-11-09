import type { ComponentProps } from "react";

import { routes } from "../../../shared/routes/routes";
import {
  TimelineCard,
  TimelineContainer,
} from "../../../shared/ui/TimelineContainer";
import { StyledDotLink } from "../../../shared/ui/primitive/Button/IconLink";
import { AccentText } from "../../../shared/ui/primitive/AccentText";
import { cn } from "../../../shared/utils/cn";
import { aboutService } from "../about.service";
import {
  JOURNEY_SECTION_ID,
  journeySectionContent,
} from "../journey.constants";
import { JourneyCard } from "./JourneyCard";

type JourneyMilestonesProps = {
  featuredOnly?: boolean;
  showExploreCta?: boolean;
  sectionId?: string;
} & Pick<ComponentProps<"section">, "className">;

export function JourneyMilestones({
  featuredOnly = false,
  showExploreCta = false,
  sectionId,
  className,
}: JourneyMilestonesProps) {
  const timelines = aboutService.getProfessionalJourney(
    featuredOnly ? { featured: true } : undefined,
  );

  return (
    <section
      id={sectionId}
      className={cn(
        "section space-y-4",
        sectionId === JOURNEY_SECTION_ID && "scroll-mt-120",
        className,
      )}
    >
      <h2 className="section-title">
        {journeySectionContent.titleLead}{" "}
        <AccentText as="span">{journeySectionContent.titleAccent}</AccentText>
      </h2>

      <div className="mx-auto max-w-4xl md:w-screen">
        <TimelineContainer wrapperClassName="grid gap-y-4">
          {timelines.map((item) => (
            <TimelineCard key={item.cardId}>
              <JourneyCard {...item} />
            </TimelineCard>
          ))}
        </TimelineContainer>
      </div>

      {showExploreCta ? (
        <StyledDotLink
          href={routes.about.professionalJourney}
          variant="ghost-light"
          hover="light"
          className="mx-auto gap-x-4"
        >
          {journeySectionContent.exploreCta}
        </StyledDotLink>
      ) : null}
    </section>
  );
}
