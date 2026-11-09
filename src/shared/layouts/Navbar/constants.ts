import { routes } from "../../routes/routes";

export type Navlink = {
  title: string;
  path: string;
};

export const NAVLINKS: Navlink[] = [
  {
    title: "Home",
    path: routes.home,
  },
  {
    title: "About",
    path: routes.about.home,
  },
];
