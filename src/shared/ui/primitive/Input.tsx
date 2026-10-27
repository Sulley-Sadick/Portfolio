import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn("flex w-full rounded-md border px-4 py-2", className)}
      {...props}
    />
  );
}
