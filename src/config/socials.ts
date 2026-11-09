import { externalUrl } from "./utils/externalUrl";
import { getEnv } from "./utils/getEnv";
import { resolveResumeHref } from "./utils/resumeHref";

const github = externalUrl(getEnv({ name: "VITE_GITHUB_LINK" }));
const whatsapp = externalUrl(getEnv({ name: "VITE_WHATSAPP_LINK" }));
const email = getEnv({ name: "VITE_EMAIL_LINK" });
const resume = resolveResumeHref(
  getEnv({ name: "VITE_RESUME_LINK", required: false }),
);
const linkedin = externalUrl(getEnv({ name: "VITE_LINKEDIN_LINK" }));
const instagram = externalUrl(getEnv({ name: "VITE_INSTAGRAM_LINK" }));
const facebook = externalUrl(getEnv({ name: "VITE_FACEBOOK_LINK" }));
const phone = getEnv({ name: "VITE_PHONE_NUMBER" });

export const socials = {
  github,
  whatsapp,
  email,
  resume,
  phone,
  linkedin,
  instagram,
  facebook,
};
