import type { ComponentProps } from "react";

import type { SkillItemType } from "../../../features/skills/skills.contract.types";
import { cn } from "../../utils/cn";

export type SkillCardProps = ComponentProps<"li"> & SkillItemType;

export function SkillCard({
  icon: Icon,
  logo,
  title,
  color,
  description,
  className,
  ...props
}: SkillCardProps) {
  return (
    <li
      {...props}
      className={cn(
        "card-surface flex flex-col gap-3 rounded-none p-4 hover:bg-muted-secondary/20",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "bg-muted/40 flex items-center justify-center rounded-xl p-2",
            !logo && color,
          )}
        >
          {logo ? (
            <img
              src={logo}
              alt=""
              className="size-5 object-contain md:size-6"
              loading="lazy"
            />
          ) : Icon ? (
            <Icon className="size-5 md:size-6" />
          ) : null}
        </div>
        <h4 className="text-neutral font-bold">{title}</h4>
      </div>
      <p className="text-neutral-secondary text-sm leading-relaxed">
        {description}
      </p>
    </li>
  );
}
