import { SiWhatsapp } from "react-icons/si";

import { aboutService } from "../../features/about/about.service";
import { routes } from "../routes/routes";
import type { LinkProps } from "./primitive/Button/button.types";
import { Link } from "./primitive/Button/IconLink";
import { cn } from "../utils/cn";

export function ConnectButton({ className, ...props }: LinkProps) {
  const developer = aboutService.getDeveloper();
  const whatsapp = developer.socials.whatsapp;
  const href = whatsapp || routes.contact;
  const opensExternally = Boolean(whatsapp);

  return (
    <Link
      href={href}
      variant="accent"
      y="center"
      className={cn(
        "flex items-center gap-x-2 bg-green-600 px-8 py-2 text-xl font-medium tracking-wide text-white hover:scale-x-105 hover:bg-green-500",
        className,
      )}
      target={opensExternally ? "_blank" : undefined}
      rel={opensExternally ? "noopener noreferrer" : undefined}
      {...props}
    >
      <SiWhatsapp /> Let&apos;s build
    </Link>
  );
}
