import type { ComponentProps } from "react";
import { LuBriefcase } from "react-icons/lu";
import { PiDotOutlineFill } from "react-icons/pi";

import { useTyping } from "../../../shared/hooks/useTyping";
import { cn } from "../../../shared/utils/cn";
import { AccentText } from "../../../shared/ui/primitive/AccentText";
import { Pill } from "../../../shared/ui/primitive/Button/Pill";
import { Image } from "../../../shared/ui/primitive/Image";
import type { ProfessionalJourneyType } from "../about.contract.types";

type JourneyCardProps = ComponentProps<"div"> & ProfessionalJourneyType;

type JourneyCardHeaderProps = ComponentProps<"header"> &
  Pick<
    ProfessionalJourneyType,
    "organization" | "role" | "period" | "locationType" | "logo"
  >;

type JourneyCardContentProps = ComponentProps<"div"> &
  Pick<ProfessionalJourneyType, "achievements">;

export function JourneyCard({
  organization,
  role,
  period,
  achievements,
  className,
  locationType,
  cardId: _cardId,
  featured: _featured,
  logo,
  ...props
}: JourneyCardProps) {
  return (
    <div
      {...props}
      className={cn(
        "bg-muted/60 relative flex flex-col gap-6 p-6 backdrop-blur-sm",
        className,
      )}
    >
      <JourneyCardHeader
        organization={organization}
        role={role}
        period={period}
        locationType={locationType}
        logo={logo}
      />
      <JourneyCardContent achievements={achievements} />
    </div>
  );
}

function JourneyCardHeader({
  organization,
  role,
  logo,
  period,
  className,
  locationType,
  ...props
}: JourneyCardHeaderProps) {
  return (
    <header
      {...props}
      className={cn(
        "flex flex-col items-start gap-4 sm:grid sm:grid-cols-[auto_1fr_auto]",
        className,
      )}
    >
      <div className="mx-auto sm:mx-[unset]">
        {logo ? (
          <Image url={logo} alt={organization} className="m-auto size-10" />
        ) : (
          <LuBriefcase className="m-auto size-10" aria-hidden />
        )}
      </div>
      <div className="mx-auto flex flex-col gap-2 sm:mx-[unset]">
        <h3 className="text-neutral font-bold">
          <AccentText>{role}</AccentText>
        </h3>
        <div className="mx-auto flex gap-x-2 sm:mx-[unset]">
          <h4 className="text-neutral-secondary text-center text-sm">
            {organization}
          </h4>
          <PiDotOutlineFill className="my-auto size-4" aria-hidden />
          <span className="text-neutral-secondary text-sm">{locationType}</span>
        </div>
      </div>
      <Pill className="border-muted-secondary bg-muted text-neutral mx-auto border text-xs whitespace-nowrap sm:mx-[unset] sm:my-auto">
        {period.start} — {period.end}
      </Pill>
    </header>
  );
}

function JourneyCardContent({
  achievements,
  className,
  ...props
}: JourneyCardContentProps) {
  const { ref, output: content } = useTyping({
    text: achievements.join(" "),
    whileInView: true,
    speedInSeconds: 0.1,
  });

  return (
    <div
      {...props}
      ref={ref}
      title={content}
      className={cn("text-neutral-secondary line-clamp-3 text-sm", className)}
    >
      {content}
    </div>
  );
}
