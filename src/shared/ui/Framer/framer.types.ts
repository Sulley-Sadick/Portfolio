import type {
  MotionProps,
  SpringOptions,
  TargetAndTransition,
  TransformInputRange,
} from "motion/react";

import type { ComponentProps, RefObject } from "react";

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

type SupportedEdgeUnit = "px" | "vw" | "vh" | "%";
type EdgeUnit = `${number}${SupportedEdgeUnit}`;
type NamedEdges = "start" | "end" | "center";
type EdgeString = NamedEdges | EdgeUnit | `${number}`;
type Edge = EdgeString | number;
type ProgressIntersection = [number, number];
type Intersection = `${Edge} ${Edge}`;
type ScrollOffset = Array<Edge | Intersection | ProgressIntersection>;

export type FramerScrollWrapperProps = {
  container?: RefObject<HTMLElement | null>;
  target?: RefObject<HTMLElement | null>;
  axis?: "x" | "y";
  offset?: ScrollOffset;
  spring?: SpringOptions;
  inputRange: TransformInputRange;
  outputRange: string[];
};
