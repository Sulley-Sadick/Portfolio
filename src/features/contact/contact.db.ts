import { DEVELOPER } from "./../about/developer.db";
import { SiGithub, SiWhatsapp } from "react-icons/si";
import { MdOutlineEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";

import type { SocialMediaProps } from "./contact.contract.types";

export const CONTACTLINKS: SocialMediaProps[] = [
  {
    title: "Github",
    icon: SiGithub,
    link: DEVELOPER.socials.github,
    color: "text-neutral",
  },
  {
    title: "Email",
    icon: MdOutlineEmail,
    link: `mailto:${DEVELOPER.email}`,
    color: "text-red-500",
  },
  {
    title: "LinkedIn",
    icon: FaLinkedin,
    link: DEVELOPER.socials.linkedin,
    color: "text-blue-500",
  },
  {
    title: "Whatsapp",
    icon: SiWhatsapp,
    link: DEVELOPER.socials.whatsapp,
    color: "text-green-500",
  },
];
