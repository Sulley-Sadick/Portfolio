export const PROJECT_IDS = [
  "whatsapp-product-catalog",
  "weather-app",
] as const;

export type ProjectId = (typeof PROJECT_IDS)[number];

export type ProjectType = {
  id: ProjectId;
  imgSrc: string;
  categories: ProjectCategory[];
  title: string;
  description: string;
  tags: string[];
  link?: string;
  repo?: string;
  featured?: boolean;
  /** Lower numbers appear first when listing projects. */
  sortOrder?: number;
};

export type ProjectCategory =
  | "Web Development"
  | "Full-Stack Development"
  | "DevOps and Cloud"
  | "Developer Tools"
  | "Mobile and Automation"
  | "E-Commerce"
  | "Education"
  | "Open Source";

export type ProjectsFilter = {
  featured?: boolean;
  category?: ProjectCategory | "All" | "all";
};

export interface IProjectsService {
  find(filters?: ProjectsFilter): ProjectType[];
  findFeatured(): ProjectType[];
  getById(id: ProjectId): ProjectType | undefined;
  getCategoryFilters(): ProjectCategory[];
}
