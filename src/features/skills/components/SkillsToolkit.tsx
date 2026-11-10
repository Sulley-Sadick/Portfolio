import type { ComponentProps } from "react";

import { AccentText } from "../../../shared/ui/primitive/AccentText";
import { SkillCard } from "../../../shared/ui/skills/SkillCard";
import { cn } from "../../../shared/utils/cn";
import { SKILLS_SECTION_ID, skillsSectionContent } from "../skills.constants";
import { skillsService } from "../skills.service";

type SkillsToolkitProps = Pick<ComponentProps<"section">, "className">;

/** Full engineering toolkit — used on the About page (`#skills`). */
export function SkillsToolkit({ className }: SkillsToolkitProps) {
  const skillItems = skillsService.find().flatMap((category) => category.items);

  return (
    <section
      id={SKILLS_SECTION_ID}
      className={cn("section scroll-mt-120", className)}
    >
      <h2 className="section-title">
        {skillsSectionContent.titleLead}{" "}
        <AccentText as="span">{skillsSectionContent.titleAccent}</AccentText>
      </h2>

      <p className="text-neutral-secondary mx-auto mb-12 max-w-2xl text-center text-sm leading-relaxed md:text-base">
        {skillsSectionContent.description}
      </p>

      <ul className="border-neutral-secondary/10 mb-5 grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] overflow-hidden">
        {skillItems.map((item) => (
          <SkillCard key={item.title} {...item} />
        ))}
      </ul>
    </section>
  );
}
