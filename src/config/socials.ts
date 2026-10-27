import { getEnv } from "./utils/getEnv";

const github = getEnv({ name: "VITE_GITHUB_LINK" });
const whatsapp = getEnv({ name: "VITE_WHATSAPP_LINK" });
const email = getEnv({ name: "VITE_EMAIL_LINK" });
const resume = getEnv({ name: "VITE_RESUME_LINK" });
const linkedin = getEnv({ name: "VITE_LINKEDIN_LINK" });
const instagram = getEnv({ name: "VITE_INSTAGRAM_LINK" });
const facebook = getEnv({ name: "VITE_FACEBOOK_LINK" });
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
