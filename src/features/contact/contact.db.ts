import { MdOutlineEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { SiGithub, SiWhatsapp } from "react-icons/si";

import { DEVELOPER } from "./../about/developer.db";
import type { SocialMediaProps } from "./contact.contract.types";

function definedLinks(
  entries: Array<SocialMediaProps | null>,
): SocialMediaProps[] {
  return entries.filter((entry): entry is SocialMediaProps => entry !== null);
}

/**
 * Public contact / social links. Entries with empty env-backed URLs are omitted
 * so the UI never renders dead hrefs when secrets are missing locally.
 */
export const CONTACTLINKS: SocialMediaProps[] = definedLinks([
  DEVELOPER.socials.github
    ? {
        title: "Github",
        icon: SiGithub,
        link: DEVELOPER.socials.github,
        color: "text-neutral",
      }
    : null,
  DEVELOPER.email
    ? {
        title: "Email",
        icon: MdOutlineEmail,
        link: `mailto:${DEVELOPER.email}`,
        color: "text-red-500",
      }
    : null,
  DEVELOPER.socials.linkedin
    ? {
        title: "LinkedIn",
        icon: FaLinkedin,
        link: DEVELOPER.socials.linkedin,
        color: "text-blue-500",
      }
    : null,
  DEVELOPER.socials.whatsapp
    ? {
        title: "Whatsapp",
        icon: SiWhatsapp,
        link: DEVELOPER.socials.whatsapp,
        color: "text-green-500",
      }
    : null,
]);
