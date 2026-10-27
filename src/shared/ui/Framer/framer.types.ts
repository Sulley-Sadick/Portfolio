import type { MotionProps, TargetAndTransition } from "motion/react";

import type { ComponentProps } from "react";

export type FramerOptionsProps = {
  hidden?: TargetAndTransition;
  show?: TargetAndTransition;
  exit?: TargetAndTransition;
};

export type FramerAnimatePositionProps = {
  children: React.ReactNode;
  autoNone?: boolean;
  variants?: FramerOptionsProps;
} & Omit<ComponentProps<"div">, "style"> &
  Omit<MotionProps, "variants">;

export type useAnimatePositionProps = Pick<
  FramerAnimatePositionProps,
  "variants" | "autoNone"
>;
