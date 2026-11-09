import type { ComponentType } from "react";
import type { IconType } from "react-icons";

export type SkillIcon =
  | IconType
  | ComponentType<{ className?: string }>;

export type SkillItemType = {
  title: string;
  /** Brand logo under `public/images/skills/` when no react-icons mark exists. */
  logo?: string;
  icon?: SkillIcon;
  color: string;
  description: string;
};

export type SkillType = {
  featured?: boolean;
  category: string;
  items: SkillItemType[];
};

export type SkillFilter = {
  category?: string;
  featured?: boolean;
};

export interface ISkillsService {
  find(props?: SkillFilter): SkillType[];
}
