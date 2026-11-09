import { DEVELOPER } from "./developer.db";

/**
 * About page profile header (top of `/about`).
 * Title pattern: personal greeting — common on Soueidan, Okafor, Richardson-style portfolios.
 */
export const aboutProfileContent = {
  titleLead: "Hi, I'm",
  titleAccent: `${DEVELOPER.firstName}.`,
  description:
    "A frontend developer who enjoys turning ideas into fast, responsive, and modern web experiences. I work mainly with React and TypeScript, and I care about clean interfaces, accessible markup, and code that stays maintainable as products grow.",
} as const;
