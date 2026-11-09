export type AboutDeveloperType = Readonly<{
  avatar1: string;
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
