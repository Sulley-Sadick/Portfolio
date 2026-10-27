import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";

type AccentTextProps<T extends React.ElementType> = {
  as?: T;
} & ComponentProps<T>;

export function AccentText<T extends React.ElementType = "i">({
  as: Tag = "i",
  className,
  children,
  props,
}: AccentTextProps<T>) {
  return (
    <Tag className={cn("text-accent", className)} {...props}>
      {children}
    </Tag>
  );
}
