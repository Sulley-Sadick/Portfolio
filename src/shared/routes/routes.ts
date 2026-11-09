export const routes = Object.freeze({
  home: "/",
  contact: "/contact",
  about: "/about",
});

export const homeSections = Object.freeze({
  projects: "projects",
} as const);

export type HomeSectionId = (typeof homeSections)[keyof typeof homeSections];

export function homeSectionHref(section: HomeSectionId): `/#${string}` {
  return `/#${section}`;
}
