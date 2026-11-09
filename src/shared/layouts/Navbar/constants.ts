import {
  homeSectionHref,
  homeSections,
  routes,
  type HomeSectionId,
} from "../../routes/routes";

export type Navlink = {
  title: string;
  path: string;
  sectionId?: HomeSectionId;
};

export const NAVLINKS: Navlink[] = [
  {
    title: "Home",
    path: routes.home,
  },
  {
    title: "About",
    path: routes.about,
  },
  {
    title: "Projects",
    path: homeSectionHref(homeSections.projects),
    sectionId: homeSections.projects,
  },
];
