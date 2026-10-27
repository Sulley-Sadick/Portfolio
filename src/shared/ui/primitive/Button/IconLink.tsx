import { Link as RouterLink } from "react-router";
import { IoMdArrowUp } from "react-icons/io";
import { PiDotOutlineFill } from "react-icons/pi";

import { cn } from "../../../utils/cn";
import { buttonVariants } from "./components/Button";

import type {
  IconLinkProps,
  LinkProps,
  StyleIconLinkProps,
} from "./button.types";

export function Link({
  children,
  className,
  variant,
  pad,
  rad,
  x,
  y,
  w,
  animation,
  href,
  hover,
  ...props
}: LinkProps) {
  return (
    <RouterLink
      to={href as never}
      className={cn(
        buttonVariants({
          pad,
          rad,
          x,
          y,
          w,
          animation,
          hover,
          className,
          variant,
        }),
      )}

      {...props}
    >
      {children}
    </RouterLink>
  );
}

export function IconLink({
  className,
  icon: Icon,
  iconClassName,
  children,
  ...props
}: IconLinkProps) {
  return (
    <Link
      className={cn("flex gap-x-1.5 rounded-lg", className)}
      x="center"
      y="center"
      pad="lg"
      {...props}
    >
      <Icon className={iconClassName} />
      {children}
    </Link>
  );
}

export function StyledIconLink(props: StyleIconLinkProps) {
  return <IconLink {...props} />;
}

export function StyledArrowLink({
  iconClassName,
  ...props
}: Omit<StyleIconLinkProps, "icon">) {
  return (
    <StyledIconLink
      icon={IoMdArrowUp}
      iconClassName={cn("rotate-45 rounded-md  border p-0.5", iconClassName)}
      {...props}
    />
  );
}

export function StyledDotLink({
  iconClassName,
  ...props
}: Omit<StyleIconLinkProps, "icon">) {
  return (
    <StyledIconLink
      icon={PiDotOutlineFill}
      iconClassName={cn(
        "size-2 rounded-full bg-muted fill-muted group-hover-animate-pulse",
        iconClassName,
      )}
      {...props}
    />
  );
}
