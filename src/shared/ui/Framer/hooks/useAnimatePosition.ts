import { useMemo } from "react";
import { useReducedMotion } from "motion/react";

import type { useAnimatePositionProps } from "../framer.types";
import { motionVariants } from "../utils/motion";

export function useAnimatePosition({
  variants,
  autoNone,
}: useAnimatePositionProps) {
  const prefersReducedMotion = useReducedMotion();

  const updatedVariants = useMemo(() => {
    if (prefersReducedMotion) {
      return {
        hidden: { opacity: 1 },
        show: { opacity: 1, transition: { duration: 0 } },
        exit: { opacity: 1, transition: { duration: 0 } },
      };
    }

    const animatePosition = motionVariants({
      hidden: autoNone ? {} : { ...(variants?.hidden ?? {}) },
    });

    return {
      hidden: { ...animatePosition.hidden, ...variants?.hidden },
      show: { ...animatePosition.show, ...variants?.show },
      exit: { ...animatePosition.exit, ...variants?.exit },
    };
  }, [variants, autoNone, prefersReducedMotion]);

  return { updatedVariants };
}
