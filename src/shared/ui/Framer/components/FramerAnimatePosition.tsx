import { motion } from "motion/react";

import type { FramerAnimatePositionProps } from "../framer.types";
import { useAnimatePosition } from "../hooks/useAnimatePosition";

export function FramerAnimatePosition({
  autoNone,
  variants,
  ...props
}: FramerAnimatePositionProps) {
  const { updatedVariants } = useAnimatePosition({ variants, autoNone });

  return (
    <motion.div
      variants={updatedVariants}
      viewport={{ once: true }}
      initial="hidden"
      exit={"hidden"}
      {...props}
    />
  );
}
