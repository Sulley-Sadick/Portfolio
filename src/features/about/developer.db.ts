import avatar1Url from "../../assets/images/Sadick.jpg";
import avatar2Url from "../../assets/images/sadick2.jpg";
import { socials } from "../../config/socials";
import type { AboutDeveloperType } from "./about.contract.types";

export const DEVELOPER: AboutDeveloperType = Object.freeze({
  avatar1: avatar1Url,
  avatar2: avatar2Url,
  firstName: "Sadick",
  lastName: "Sulley",
  name: "Sadick Sulley",
  resume: socials.resume,
  email: socials.email,
  phone: socials.phone,
  socials: {
    github: socials.github,
    facebook: socials.facebook,
    linkedin: socials.linkedin,
    instagram: socials.instagram,
    whatsapp: socials.whatsapp,
  },
});
