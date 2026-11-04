import type { ComponentProps } from "react";
import {
  contactService,
  type SocialMediaProps,
} from "../../../features/contact";
import { motionVariants } from "../../ui/Framer/utils/motion";

import { cn } from "../../utils/cn";
import { Link } from "../../ui/primitive/Button/IconLink";
import { FramerAnimatePosition } from "../../ui/Framer/components/FramerAnimatePosition";

const socialMediaLinksVariants = motionVariants({
  hidden: { opacity: 0 },
});

export function SocialMediaLinks({ className }: ComponentProps<"div">) {
  const socials = contactService.socials();

  return (
    <FramerAnimatePosition
      viewport={{ once: true }}
      animate="show"
      variants={socialMediaLinksVariants}
    >
      <ul className="grid w-full grid-cols-[repeat(auto-fill,minmax(3.5rem,1fr))] gap-4">
        {socials.map((link) => (
          <SocialMediaCard
            key={link.title}
            {...link}
            className={cn(className)}
          />
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
        "bg-muted-secondary/30 border-muted-secondary relative flex items-center rounded-2xl border p-3 transition-all hover:border-current",
        color,
        className,
      )}
      {...props}
    >
      <Link
        href={link}
        className={cn(
          "link text-neutral-secondary static font-semibold",
          "text-neutral rounded-xl p-2.5",
          color,
        )}
        title={title}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className={cn("size-5", color)} />
      </Link>
    </div>
  );
}
