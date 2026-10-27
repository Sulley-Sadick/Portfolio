import type { ComponentProps } from "react";
import { cn } from "../../../utils/cn";

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea className={cn("flex w-full px-2 py-1", className)} {...props} />
  );
}
