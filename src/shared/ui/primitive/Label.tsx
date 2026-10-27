import { cva } from "class-variance-authority";
import type { ComponentProps } from "react";

import type { ExtractVariantTypes } from "../../types/utils/ExtractVariantsTypes";
import { cn } from "../../utils/cn";

const labelVariants = cva("h-fit py-0.5", {
  variants: {
    variant: {
      "outline-dark":
        "border *:border-none *:focus:outline-none border-accent bg-muted-stone",
      none: "",
    },
    layout: {
      inline: "flex items-center",
      block: "grid gap-y-1",
      none: "",
    },
    rad: {
      xs: "rounded",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      "3xl": "rounded-3xl",
      "4xl": "rounded-4xl",
      none: "",
    },
    pad: {
      xs: "pl-1 pr-0.5",
      sm: "pl-2 pr-1",
      md: "pl-3 pr-1.5",
      lg: "pl-4 pr-2",
      xl: "pl-6 pr-3",
      none: "",
    },
  },
  defaultVariants: {
    variant: "none",
    layout: "block",
    rad: "md",
    pad: "none",
  },
});

type WrapperProps = ExtractVariantTypes<typeof labelVariants> &
  ComponentProps<"label">;

function Wrapper({
  id,
  pad,
  rad,
  variant,
  layout = "block",
  className,
  children,
  ...props
}: WrapperProps) {
  return (
    <label
      htmlFor={id}
      className={cn(labelVariants({ pad, rad, variant, layout, className }))}
      {...props}
    >
      {children}
    </label>
  );
}

type ButtonWrapperProps = ExtractVariantTypes<typeof labelVariants> &
  ComponentProps<"div">;

function ButtonWrapper({
  pad = "none",
  rad = "none",
  variant = "none",
  className,
  ...props
}: ButtonWrapperProps) {
  return (
    <div
      className={cn(labelVariants({ pad, rad, variant, className }))}
      {...props}
    />
  );
}

function Title({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "text-neutral-secondary px-1.5 text-sm font-medium tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

export const Label = { Wrapper, ButtonWrapper, Title };
