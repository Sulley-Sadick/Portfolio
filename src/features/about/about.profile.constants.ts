import { DEVELOPER } from "./developer.db";

/**
 * About page profile header (top of `/about`).
 * Title pattern: personal greeting — common on Soueidan, Okafor, Richardson-style portfolios.
 */
export const aboutProfileContent = {
  titleLead: "Hi, I'm",
  titleAccent: `${DEVELOPER.firstName}.`,
  description:
    "Junior front-end developer available for freelance and client projects. I build responsive sites with React and TypeScript, ship work you can verify on GitHub and Vercel, and care about accessible markup and maintainable code as products grow.",
} as const;
