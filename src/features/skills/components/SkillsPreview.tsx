import { routes } from "../../../shared/routes/routes";
import { StyledDotLink } from "../../../shared/ui/primitive/Button/IconLink";
import { AccentText } from "../../../shared/ui/primitive/AccentText";
import { SkillCard } from "../../../shared/ui/skills/SkillCard";
import {
  SKILLS_HOME_PREVIEW_LIMIT,
  skillsSectionContent,
} from "../skills.constants";
import { skillsService } from "../skills.service";

export function SkillsPreview() {
  const featuredCategories = skillsService.find({ featured: true });
  const allSkillItems = featuredCategories.flatMap(
    (category) => category.items,
  );
  const previewItems = allSkillItems.slice(0, SKILLS_HOME_PREVIEW_LIMIT);
  const showExploreCta = allSkillItems.length > SKILLS_HOME_PREVIEW_LIMIT;

  return (
    <div>
      <section className="section">
        <h2 className="section-title">
          {skillsSectionContent.titleLead}{" "}
          <AccentText as="span">{skillsSectionContent.titleAccent}</AccentText>
        </h2>

        <p className="text-neutral-secondary mx-auto mb-12 max-w-2xl text-center text-sm leading-relaxed md:text-base">
          {skillsSectionContent.description}
        </p>

        <ul className="border-neutral-secondary/10 mb-5 grid grid-cols-1 overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
          {previewItems.map((item) => (
            <SkillCard key={item.title} {...item} />
          ))}
        </ul>

        {showExploreCta ? (
          <StyledDotLink
            href={routes.about.skills}
            hover="light"
            w="fit"
            className="mx-auto flex-row gap-x-2"
          >
            {skillsSectionContent.exploreCta}
          </StyledDotLink>
        ) : null}
      </section>
    </div>
  );
}
