import type {
  IAboutService,
  ProfessionalJourneyFilter,
} from "./about.contract.types";
import { DEVELOPER } from "./developer.db";
import { PROFESSIONAL_JOURNEY } from "./professional-journey.db";

class AboutService implements IAboutService {
  private db = {
    developer: DEVELOPER,
    professionalJourney: PROFESSIONAL_JOURNEY,
  };

  getDeveloper() {
    return this.db.developer;
  }

  getProfessionalJourney(filters?: ProfessionalJourneyFilter) {
    const { featured } = filters ?? {};
    let filtered = this.db.professionalJourney;

    if (featured) {
      filtered = filtered.filter((item) => item.featured);
    }

    return filtered;
  }
}

export const aboutService = new AboutService();
