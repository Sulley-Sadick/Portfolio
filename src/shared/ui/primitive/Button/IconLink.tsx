import { Link as RouterLink } from "react-router";
import { IoMdArrowUp } from "react-icons/io";
import { GoDotFill } from "react-icons/go";

import { cn } from "../../../utils/cn";
import { buttonVariants } from "./components/Button";

import type {
  IconLinkProps,
  LinkProps,
  StyleIconLinkProps,
} from "./button.types";

function shouldUseNativeAnchor(href: string | undefined): href is string {
  if (!href) return false;
  if (/^(https?:|mailto:|tel:)/i.test(href)) return true;
  if (/\.pdf$/i.test(href) || /\/resume\//i.test(href)) return true;
  return href.startsWith("/") && /\.[a-z0-9]+$/i.test(href);
}

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
  const linkClassName = cn(
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
  );

  if (shouldUseNativeAnchor(href)) {
    return (
      <a href={href} className={linkClassName} {...props}>
        {children}
      </a>
    );
  }

  return (
    <RouterLink to={href ?? ""} className={linkClassName} {...props}>
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
      className={cn(
        "group flex flex-row items-center justify-center gap-x-1.5 rounded-full",
        className,
      )}
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
  variant = "ghost-light",
  ...props
}: Omit<StyleIconLinkProps, "icon">) {
  return (
    <StyledIconLink
      icon={GoDotFill}
      variant={variant}
      iconClassName={cn(
        "size-2 shrink-0 fill-current group-hover:animate-pulse",
        iconClassName,
      )}
      {...props}
    />
  );
}
