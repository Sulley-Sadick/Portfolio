import type { IAboutService } from "./about.contract.types";
import { DEVELOPER } from "./developer.db";

class AboutService implements IAboutService {
  private db = {
    developer: DEVELOPER,
  };

  getDeveloper() {
    return this.db.developer;
  }
}

export const aboutService = new AboutService();
