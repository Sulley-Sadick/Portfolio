import type { ComponentProps } from "react";

import { Spinner, type SpinnerVariantsProps } from "./Spinner";
import { cn } from "../../utils/cn";

type LoadingSwapProps = {
  children: React.ReactNode;
  isLoading: boolean;
} & ComponentProps<"span">;

export function LoadingSwap({
  isLoading,
  className,
  children,
  ...props
}: LoadingSwapProps & SpinnerVariantsProps) {
  return (
    <>
      {isLoading && (
        <span className="flex-center size-full outline-none *:flex-0">
          <Spinner className={cn("size-6", className)} {...props}></Spinner>
        </span>
      )}
      {!isLoading && children}
    </>
  );
}
