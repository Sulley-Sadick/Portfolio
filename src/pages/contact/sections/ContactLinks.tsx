import type { ComponentProps } from "react";
import { SocialMediaLinks } from "../../../shared/components/socialMediaLinks/SocialMediaLinks";
import { cn } from "../../../shared/utils/cn";

export function ContactLinks({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("grid h-fit w-full max-w-sm gap-6 md:w-screen", className)}
      {...props}
    >
      <h2 className="mb-4 text-xl tracking-wide">
        Contact or follow me on my social media channels!
      </h2>
      <SocialMediaLinks />
    </div>
  );
}
