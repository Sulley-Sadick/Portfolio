import { motion, type MotionProps } from "motion/react";
import { type ComponentProps, useId } from "react";

import { useMeasure } from "../hooks/useMeasure";
import { useFramerScroll } from "./Framer/hooks/useFramerScroll";
import { cn } from "../utils/cn";

export type TimelineContainerProps = ComponentProps<"div"> &
  MotionProps & {
    wrapperClassName?: string;
  };

export function TimelineContainer({
  className,
  children,
  wrapperClassName,
  ...props
}: TimelineContainerProps) {
  const id = useId().replace(/:/g, "");
  const listSelector = `#${id}`;
  const { height } = useMeasure({ selector: listSelector });
  const { ref, motionValue: motionHeight } = useFramerScroll<HTMLDivElement>({
    offset: ["start end", "end"],
    inputRange: [0, 0.5, 0.75, 0.85, 1],
    outputRange: [
      "0px",
      `${height / 4}px`,
      `${height / 2.2}px`,
      `${height / 2}px`,
      `${height}px`,
    ],
  });

  return (
    <div
      {...props}
      ref={ref}
      className={cn("relative mx-auto grid w-full pl-6", className)}
    >
      <motion.div
        style={{ height: motionHeight }}
        className="timeline-view-container"
      />
      <ul id={id} className={wrapperClassName}>
        {children}
      </ul>
    </div>
  );
}

export function TimelineCard({ children }: { children: React.ReactNode }) {
  return (
    <li className="timeline-card relative">
      <div className="floating-dot-timeline" />
      {children}
    </li>
  );
}
