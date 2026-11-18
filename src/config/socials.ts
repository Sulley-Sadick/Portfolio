import { externalUrl } from "./utils/externalUrl";
import { getEnv } from "./utils/getEnv";
import { resolveResumeHref } from "./utils/resumeHref";

/**
 * Social / contact links from env.
 * Missing values become empty strings so the static UI still boots locally
 * or in CI without every secret present. Call sites should hide empty links.
 */
export const socials = {
  github: externalUrl(getEnv({ name: "VITE_GITHUB_LINK", required: false })),
  whatsapp: externalUrl(
    getEnv({ name: "VITE_WHATSAPP_LINK", required: false }),
  ),
  email: getEnv({ name: "VITE_EMAIL_LINK", required: false }) ?? "",
  resume: resolveResumeHref(
    getEnv({ name: "VITE_RESUME_LINK", required: false }),
  ),
  phone: getEnv({ name: "VITE_PHONE_NUMBER", required: false }) ?? "",
  linkedin: externalUrl(
    getEnv({ name: "VITE_LINKEDIN_LINK", required: false }),
  ),
  instagram: externalUrl(
    getEnv({ name: "VITE_INSTAGRAM_LINK", required: false }),
  ),
  facebook: externalUrl(
    getEnv({ name: "VITE_FACEBOOK_LINK", required: false }),
  ),
} as const;
