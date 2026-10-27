import type { ExtractVariantTypes } from "../../../types/utils/ExtractVariantsTypes";
import { buttonVariants } from "./components/Button";
import type { ComponentProps } from "react";
import type { LinkProps as RouterLinkProps } from "react-router";
import type { IconType } from "react-icons";

export type ButtonVariants = ExtractVariantTypes<typeof buttonVariants>;

export type ButtonProps = ButtonVariants & ComponentProps<"button">;

export type LinkProps = ButtonVariants &
  ComponentProps<"a"> &
  Omit<RouterLinkProps, "to" | "search">;

export type StyleIconLinkProps = IconLinkProps;

export type IconLinkProps = LinkProps & {
  icon: IconType;
  iconClassName?: string;
};
