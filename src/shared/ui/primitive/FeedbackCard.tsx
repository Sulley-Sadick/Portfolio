import type { ComponentProps } from "react";
import { cva } from "class-variance-authority";
import { GoCheckCircle } from "react-icons/go";

import type { ExtractVariantTypes } from "../../types/utils/ExtractVariantsTypes";
import { IoAlertCircleOutline } from "react-icons/io5";
import { cn } from "../../utils/cn";
import { FramerAnimatePosition } from "../Framer/components/FramerAnimatePosition";

const cardVariants = cva(
  "h-fit w-full flex items-start gap-2 text-sm font-medium transition-all duration-300 shadow-sm",
  {
    variants: {
      variant: {
        danger: "bg-danger text-neutral shadow-danger/20",
        success: "bg-success text-neutral shadow-success/20",
        "outline-danger": "bg-danger/5 border border-danger/20 text-danger",
        "outline-success": "bg-success/5 border border-success/20 text-success",
        "ghost-danger": "bg-danger/3 text-danger",
        "ghost-success": "bg-success/10 text-success",
        "text-danger": "text-danger bg-transparent shadow-none px-0 py-1",
        "text-success": "text-success bg-transparent shadow-none px-0 py-1",
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
        xs: "px-2 py-1",
        sm: "px-3 py-1.5",
        md: "px-4 py-2",
        lg: "px-5 py-2.5",
        xl: "px-6 py-3",
        none: "",
      },
    },
    defaultVariants: {
      variant: "danger",
      pad: "md",
      rad: "lg",
    },
  },
);

type FeedbackProps = ExtractVariantTypes<typeof cardVariants> & {
  success?: boolean;
  error?: boolean;
  icon?: boolean;
} & ComponentProps<"div">;

export function FeedbackCard({
  success,
  error,
  icon = true,
  pad,
  rad,
  variant = error ? "ghost-danger" : "ghost-success",
  className,
  children,
  ...props
}: FeedbackProps) {
  const isDanger = variant.includes("danger") || error;

  const Icon = !isDanger || success ? GoCheckCircle : IoAlertCircleOutline;

  return (
    <div
      className={cn(cardVariants({ pad, rad, variant, className }))}
      {...props}
    >
      <FramerAnimatePosition
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0, scale: 0.98, y: -8 },
          show: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
          },
        }}
        className="flex items-center gap-2"
      >
        {icon && (
          <Icon className="size-4 shrink-0 transition-transform duration-300"></Icon>
        )}
        <p className="flex-1 leading-relaxed" role={error ? "alert" : "status"}>
          {children}
        </p>
      </FramerAnimatePosition>
    </div>
  );
}
