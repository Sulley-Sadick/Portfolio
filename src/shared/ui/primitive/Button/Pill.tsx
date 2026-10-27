import type { ComponentProps } from "react";

import { cn } from "../../../utils/cn";
import type { ButtonProps } from "./button.types";
import { buttonVariants } from "./components/Button";

export function Pill({
  className,
  rad,
  pad,
  x,
  y,
  w,
  animation,
  hover,
  variant,
  ...props
}: ButtonProps & ComponentProps<"span">) {
  return (
    <span
      className={cn(
        buttonVariants({
          pad,
          rad,
          x,
          y,
          w,
          animation,
          hover,
          variant,
          className,
        }),
      )}
      {...props}
    />
  );
}
