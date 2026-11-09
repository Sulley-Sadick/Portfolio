import type { ISkillsService, SkillFilter } from "./skills.contract.types";
import { SKILLS } from "./skills.db";

class SkillsService implements ISkillsService {
  private db = {
    skills: [...SKILLS],
  };

  find(props?: SkillFilter) {
    const { featured = false, category } = props ?? {};

    let filtered = this.db.skills;

    if (featured) {
      filtered = filtered.filter((skill) => skill.featured);
    }

    if (category) {
      filtered = filtered.filter((skill) => skill.category === category);
    }

    return filtered;
  }
}

export const skillsService = new SkillsService();
