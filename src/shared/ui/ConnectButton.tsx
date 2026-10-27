import { SiWhatsapp } from "react-icons/si";

import type { LinkProps } from "./primitive/Button/button.types";
import { Link } from "./primitive/Button/IconLink";
import { cn } from "../utils/cn";
import { aboutService } from "../../features/about/about.service";

export function ConnectButton({ className, ...props }: LinkProps) {
  const developer = aboutService.getDeveloper();
  return (
    <Link
      href={developer.socials.whatsapp}
      variant="accent"
      y="center"
      className={cn(
        "flex items-center gap-x-2 bg-green-600 px-8 py-2 text-xl font-medium tracking-wide text-white hover:scale-x-105 hover:bg-green-500",
        className,
      )}
      target="_blank"
      {...props}
    >
      <SiWhatsapp /> Let&apos;s build
    </Link>
  );
}
