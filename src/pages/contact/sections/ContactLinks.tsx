import type { ComponentProps } from "react";
import { SocialMediaLinks } from "../../../shared/components/socialMediaLinks/SocialMediaLinks";
import { cn } from "../../../shared/utils/cn";

import { useTyping } from "../../../shared/hooks/useTyping";
export function ContactLinks({ className, ...props }: ComponentProps<"div">) {
  const { output: content, ref } = useTyping({
    whileInView: true,
    speedInSeconds: 0.3,
    text: `Contact or follow me on my social media channels!`,
  });

  return (
    <div
      ref={ref}
      className={cn("grid h-fit w-full max-w-sm gap-6 md:w-screen", className)}
      {...props}
    >
      <h2 className="mb-4 text-xl tracking-wide">{content}</h2>
      <SocialMediaLinks />
    </div>
  );
}
