import { socials } from "../../config/socials";
import type { AboutDeveloperType } from "./about.contract.types";

export const DEVELOPER: AboutDeveloperType = Object.freeze({
  avatar1: "/src/assets/images/sadick.jpg",
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
