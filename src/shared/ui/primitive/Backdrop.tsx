import { useEffect } from "react";

import { cn } from "../../utils/cn";
import type { Backdrop } from "../types/types";

export function Backdrop({ className, ...props }: Backdrop) {
  useEffect(() => {
    document.documentElement.classList.add("overflow-hidden");
    document.documentElement.classList.add("lg:overflow-y-auto");

    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("lg:overflow-y-auto");
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-2000 h-screen w-screen bg-slate-900/5 backdrop-blur *:z-10",
        className,
      )}
      {...props}
    />
  );
}
