export type AboutDeveloperType = Readonly<{
  avatar1: string;
  avatar2: string;
  firstName: "Sadick";
  lastName: "Sulley";
  name: "Sadick Sulley";
  resume: string;
  email: string;
  phone: string;
  socials: {
    github: string;
    whatsapp: string;
    facebook: string;
    linkedin: string;
  };
}>;

export interface IAboutService {
  getDeveloper: () => AboutDeveloperType;
}
