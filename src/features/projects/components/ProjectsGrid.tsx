import type { ProjectType } from "../projects.contract.types";
import { ProjectCard } from "./ProjectCard";

type ProjectsGridProps = {
  projects: ProjectType[];
};

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="@container">
      <ul className="grid @lg:grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </ul>
    </div>
  );
}
