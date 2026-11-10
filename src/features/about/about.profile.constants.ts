import { DEVELOPER } from "./developer.db";

/**
 * About page profile header (top of `/about`).
 * Title pattern: personal greeting — common on Soueidan, Okafor, Richardson-style portfolios.
 */
export const aboutProfileContent = {
  titleLead: "Hi, I'm",
  titleAccent: `${DEVELOPER.firstName}.`,
  description:
    "I am a front-end developer who turns product goals into dependable web experiences. I implement full UI flows with modern HTML, CSS, JavaScript, TypeScript, and React—layout, state, routing, and REST-style integrations—so applications stay fast, responsive, and easy to extend. Whether for a business catalog, a customer-facing tool, or a multi-section product site, I deliver work that is structured for real users in production, not prototypes alone.",
} as const;
