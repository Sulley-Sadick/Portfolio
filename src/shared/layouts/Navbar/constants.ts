import { routes } from "../../routes/routes";

interface Navlinks {
  path: string;
  title: string;
}

export const NAVLINKS: Navlinks[] = [
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
    path: routes.projects,
  },
];
