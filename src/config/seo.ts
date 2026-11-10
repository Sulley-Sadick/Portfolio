import { DEVELOPER } from "../features/about/developer.db";
import { publicUrls } from "./publicUrls";
import { socials } from "./socials";
import { getEnv } from "./utils/getEnv";
import { publicAssetPath } from "../shared/utils/publicAssetPath";

export const SITE_NAME = DEVELOPER.name;

const DEFAULT_DESCRIPTION =
  "Front-end developer Sulley Sadick builds and ships production-oriented web applications with React, TypeScript, and modern CSS. Portfolio, projects, journey, and contact.";

const KEYWORDS = [
  "Sulley Sadick",
  "Sadick Sulley",
  "front-end developer",
  "frontend developer",
  "React developer",
  "TypeScript",
  "web developer portfolio",
  "Ghana developer",
  "freelance web developer",
].join(", ");

export type PageSeoConfig = {
  title: string;
  description: string;
  path: string;
};

export const PAGE_SEO: Record<"home" | "about" | "contact", PageSeoConfig> = {
  home: {
    title: `${SITE_NAME} | Front-End Developer Portfolio`,
    description: DEFAULT_DESCRIPTION,
    path: "/",
  },
  about: {
    title: `About ${SITE_NAME} | Front-End Developer`,
    description: `Learn about ${SITE_NAME}'s background, professional journey, and technical skills as a front-end developer building accessible, production-ready web applications.`,
    path: "/about",
  },
  contact: {
    title: `Contact ${SITE_NAME} | Hire a Front-End Developer`,
    description: `Get in touch with ${SITE_NAME} for freelance front-end work, collaborations, or opportunities. Email, WhatsApp, and social links.`,
    path: "/contact",
  },
};

export const DEFAULT_OG_IMAGE = "images/projects/portfolio.png";

export function getPageSeoKey(pathname: string): keyof typeof PAGE_SEO {
  const normalized = pathname.replace(/\/$/, "") || "/";
  if (normalized === "/about") return "about";
  if (normalized === "/contact") return "contact";
  return "home";
}

export function getPageSeo(pathname: string): PageSeoConfig {
  return PAGE_SEO[getPageSeoKey(pathname)];
}

/** Absolute URL for a route (`/`, `/about`, …), using `VITE_APP_URL`. */
export function absoluteRouteUrl(pathname: string): string {
  const segment = pathname.replace(/^\//, "");
  const base = publicUrls.appUrl.endsWith("/")
    ? publicUrls.appUrl
    : `${publicUrls.appUrl}/`;
  if (!segment) {
    return base;
  }
  return new URL(segment, base).href;
}

/** Absolute URL for a file under `public/`. */
export function absolutePublicUrl(relativePath: string): string {
  const assetPath = publicAssetPath(relativePath);
  const origin = new URL(publicUrls.appUrl).origin;
  return `${origin}${assetPath.startsWith("/") ? assetPath : `/${assetPath}`}`;
}

export function siteKeywords(): string {
  return KEYWORDS;
}

export function googleSiteVerification(): string | undefined {
  return getEnv({ name: "VITE_GOOGLE_SITE_VERIFICATION", required: false });
}

export function socialSameAs(): string[] {
  return [
    socials.github,
    socials.linkedin,
    socials.instagram,
    socials.facebook,
    socials.whatsapp,
  ].filter((url): url is string => Boolean(url));
}

export function defaultShareImageUrl(): string {
  return absolutePublicUrl(DEFAULT_OG_IMAGE);
}
