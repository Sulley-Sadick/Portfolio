/** Build-time SEO copy — keep in sync with `PAGE_SEO` in `src/config/seo.ts`. */

export const CANONICAL_HOST = "sulleysadick.dev";

/** Keep in sync with `src/config/branding.ts` → `DEFAULT_SHARE_IMAGE`. */
export const BUILD_SHARE_IMAGE_PATH = "branding/sulley-portrait-512.png";

export const BUILD_PAGE_SEO = {
  home: {
    path: "/",
    title: "Sulley Sadick | Front-End Developer Portfolio",
    description:
      "Front-end developer Sulley Sadick builds and ships production-oriented web applications with React, TypeScript, and modern CSS. Portfolio, projects, journey, and contact.",
  },
  about: {
    path: "/about",
    title: "About Sulley Sadick | Front-End Developer",
    description:
      "Learn about Sulley Sadick's background, professional journey, and technical skills as a front-end developer building accessible, production-ready web applications.",
  },
  contact: {
    path: "/contact",
    title: "Contact Sulley Sadick | Hire a Front-End Developer",
    description:
      "Get in touch with Sulley Sadick for freelance front-end work, collaborations, or opportunities. Email, WhatsApp, and social links.",
  },
} as const;