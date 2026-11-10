import type {
  IProjectsService,
  ProjectCategory,
  ProjectId,
  ProjectsFilter,
  ProjectType,
} from "./projects.contract.types";
import { PROJECTS } from "./projects.db";

function isAllCategories(
  category: ProjectsFilter["category"],
): category is "All" | "all" {
  return category === "All" || category === "all";
}

function compareProjects(a: ProjectType, b: ProjectType): number {
  return (
    (a.sortOrder ?? Number.MAX_SAFE_INTEGER) -
    (b.sortOrder ?? Number.MAX_SAFE_INTEGER)
  );
}

class ProjectsService implements IProjectsService {
  private readonly projects: ProjectType[] = [...PROJECTS];

  find(filters?: ProjectsFilter): ProjectType[] {
    const { featured, category } = filters ?? {};
    let filtered = this.projects;

    if (featured) {
      filtered = filtered.filter((project) => project.featured);
    }

    if (category && !isAllCategories(category)) {
      filtered = filtered.filter((project) =>
        project.categories.includes(category),
      );
    }

    return [...filtered].sort(compareProjects);
  }

  findFeatured(): ProjectType[] {
    return this.find({ featured: true });
  }

  getById(id: ProjectId): ProjectType | undefined {
    return this.projects.find((project) => project.id === id);
  }

  getCategoryFilters(): ProjectCategory[] {
    return [...new Set(this.projects.flatMap((project) => project.categories))];
  }
}

export const projectsService = new ProjectsService();
