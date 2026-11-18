export type AboutDeveloperType = Readonly<{
  /** Hero portrait URL (optimized WebP from `avatar1.png`). */
  avatar1: string;
  /** Navbar, footer, and favicon source portrait (`avatar2.jpg`). */
  avatar2: string;
  firstName: "Sulley";
  lastName: "Sadick";
  name: "Sulley Sadick";
  resume: string;
  email: string;
  phone: string;
  socials: {
    github: string;
    whatsapp: string;
    facebook: string;
    linkedin: string;
    instagram: string;
  };
}>;

export type JourneyLocationType = "Remote" | "Hybrid" | "On site" | "Online";

export type ProfessionalJourneyType = {
  featured?: boolean;
  cardId: number;
  organization: string;
  role: string;
  logo?: string;
  locationType: JourneyLocationType;
  period: {
    start: number | string;
    end: number | string;
  };
  achievements: string[];
};

export type ProfessionalJourneyFilter = {
  featured?: boolean;
};

export interface IAboutService {
  getDeveloper: () => AboutDeveloperType;
  getProfessionalJourney: (
    filters?: ProfessionalJourneyFilter,
  ) => ProfessionalJourneyType[];
}
