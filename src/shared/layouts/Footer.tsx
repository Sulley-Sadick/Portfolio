import { type MouseEvent } from "react";
import { useLocation } from "react-router";
import { aboutService } from "../../features/about/about.service";
import { SocialMediaLinks } from "../components/socialMediaLinks/SocialMediaLinks";
import { useCurrentYear } from "../hooks/useCurrentYear";
import {
  homeSectionHref,
  homeSections,
  routes,
  type HomeSectionId,
} from "../routes/routes";
import { Link } from "../ui/primitive/Button/IconLink";
import { cn } from "../utils/cn";
import {
  isHomeSectionActive,
  isHomeTopActive,
  useSmoothScroll,
} from "../hooks/useSmoothScroll/useSmoothScroll";

const developer = aboutService.getDeveloper();

export function Footer() {
  const currentYear = useCurrentYear();

  return (
    <footer className="border-neutral/20 w-full border-t px-6 py-10 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-x-15 gap-y-10 py-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="flex flex-col gap-y-5 lg:col-span-2">
            <div className="*:mt-5">
              <div className="flex items-center gap-x-2">
                <div className="-rotate-12 cursor-default duration-300 ease-in-out hover:rotate-0">
                  <p>Image</p>
                </div>
                <div>
                  <h3 className="text-accent font-bold uppercase">
                    [{`Mr. ${developer.lastName}`}]
                  </h3>
                </div>
              </div>
              <p className="text-neutral-secondary max-w-sm">
                Frontend Developer building meaningful digital products.
                Let&apos;s build something together.
              </p>
            </div>
            <SocialMediaLinks className="p-2" />
          </div>
          <Navigations />
          <Services />
          <Resources />
        </div>
        <div className="border-neutral-secondary/20 my-5 border-b"></div>
        <div className="flex flex-col items-center *:mb-4 md:flex-row md:items-start md:justify-between md:*:mb-0">
          <p className="text-neutral-secondary font-medium uppercase">
            sys.status: <span className="text-accent">operational</span>
          </p>
          <p className="text-neutral-secondary">
            &copy; {currentYear} Mr. {developer.lastName}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

type FooterRouteLink = {
  title: string;
  path: string;
  sectionId?: HomeSectionId;
};

const NAVIGATIONS: FooterRouteLink[] = [
  { title: "Home", path: routes.home },
  { title: "Contact", path: routes.contact },
  {
    title: "Projects",
    path: homeSectionHref(homeSections.projects),
    sectionId: homeSections.projects,
  },
  { title: "About", path: routes.about },
];

function Navigations() {
  const { pathname, hash } = useLocation();
  const { goToHomeSection, goToHomeTop } = useSmoothScroll();

  const handleSectionClick = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: HomeSectionId,
  ) => {
    event.preventDefault();
    goToHomeSection(sectionId);
  };

  const handleHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname === routes.home) {
      event.preventDefault();
      goToHomeTop();
    }
  };

  return (
    <div>
      <h4 className="mb-6 font-bold uppercase">Navigation</h4>
      <ul className="flex flex-col gap-2.5">
        {NAVIGATIONS.map((navigation) => {
          const isHomeNav = navigation.path === routes.home;

          const active = navigation.sectionId
            ? isHomeSectionActive(pathname, hash, navigation.sectionId)
            : isHomeNav
              ? isHomeTopActive(pathname, hash)
              : navigation.path === pathname;

          return (
            <li
              key={navigation.title}
              className={cn(
                "text-neutral-secondary hover:decoration-accent hover:text-accent hover:underline",
                active ? "text-accent" : "text-neutral-secondary",
              )}
            >
              <Link
                href={navigation.path}
                pad="none"
                onClick={
                  navigation.sectionId
                    ? (event) =>
                        handleSectionClick(event, navigation.sectionId!)
                    : isHomeNav
                      ? handleHomeClick
                      : undefined
                }
              >
                <span>{navigation.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const SERVICES = [{ title: "Front-end Engineering" }] as const;

function Services() {
  return (
    <div>
      <h4 className="mb-6 font-bold uppercase">Services</h4>
      <ul className="">
        {SERVICES.map((service) => (
          <li key={service.title} className="text-neutral-secondary">
            <span>{service.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const RESOURCES: FooterRouteLink[] = [
  { title: "Resume", path: developer.resume },
  {
    title: "Projects",
    path: homeSectionHref(homeSections.projects),
    sectionId: homeSections.projects,
  },
];

function Resources() {
  const { goToHomeSection } = useSmoothScroll();

  return (
    <div>
      <h4 className="mb-6 font-bold uppercase">Resources</h4>

      <ul className="flex flex-col gap-2.5">
        {RESOURCES.map((resource) => (
          <Link
            href={resource.path}
            key={resource.title}
            className="text-neutral-secondary hover:text-white hover:underline hover:decoration-white"
            pad="none"
            onClick={
              resource.sectionId
                ? (event) => {
                    event.preventDefault();
                    goToHomeSection(resource.sectionId!);
                  }
                : undefined
            }
          >
            <span>{resource.title}</span>
          </Link>
        ))}
      </ul>
    </div>
  );
}
