import {
  projectsSectionContent,
  projectsService,
  ProjectsGrid,
} from "../../../features/projects";
import { AccentText } from "../../../shared/ui/primitive/AccentText";

export function ProjectsSection() {
  const projects = projectsService.findFeatured();

  return (
    <div className="bg-muted">
      <section id="projects" className="section scroll-mt-120">
        <h2 className="section-title">
          {projectsSectionContent.titleLead} <AccentText as="span">{projectsSectionContent.titleAccent}</AccentText>
        </h2>

        <p className="text-neutral-secondary mx-auto mb-12 max-w-3xl text-center text-sm leading-relaxed md:text-base">
          {projectsSectionContent.description}
        </p>

        <ProjectsGrid projects={projects} />
      </section>
    </div>
  );
}
