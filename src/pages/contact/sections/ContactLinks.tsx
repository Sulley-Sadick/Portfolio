import type { ComponentProps } from "react";

import {
  type SocialMediaProps,
  contactService,
} from "../../../features/contact";
import { cn } from "../../../shared/utils/cn";
import { Link } from "../../../shared/ui/primitive/Button/IconLink";
import { useTyping } from "../../../shared/hooks/useTyping";
import { FramerAnimatePosition } from "../../../shared/ui/Framer/components/FramerAnimatePosition";
import { socialMediaLinksVariants } from "./constants";

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

function SocialMediaLinks() {
  const socials = contactService.socials();

  return (
    <FramerAnimatePosition
      viewport={{ once: true }}
      animate="show"
      variants={socialMediaLinksVariants}
    >
      <ul className="grid w-full grid-cols-[repeat(auto-fill,minmax(3.5rem,1fr))] gap-4">
        {socials.map((link) => (
          <SocialMediaCard key={link.title} {...link} />
        ))}
      </ul>
    </FramerAnimatePosition>
  );
}

type SocialMediaCardProps = SocialMediaProps & ComponentProps<"div">;

function SocialMediaCard({
  title,
  icon: Icon,
  color,
  link,
  className,
  ...props
}: SocialMediaCardProps) {
  return (
    <div
      className={cn(
        "group bg-muted-secondary/30 border-muted-secondary relative flex items-center rounded-2xl border p-3 transition-all",
        className,
      )}
      {...props}
    >
      <Link
        href={link}
        className={cn(
          "link group-hover:text-neutral text-neutral-secondary static font-semibold",
          "text-neutral rounded-xl p-2.5",
          color,
        )}
        title={title}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className="size-5" />
      </Link>
    </div>
  );
}
