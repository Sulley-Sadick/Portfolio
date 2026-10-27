import type { FramerOptionsProps } from "../framer.types";
import type { Transition } from "motion";

const transitionDefaults: Transition = {
  when: "beforeChildren",
  type: "spring",
  stiffness: 80,
  ease: "easeOut",
};

export const motionVariants = ({
  hidden = {},
  show = {},
  exit = {},
}: FramerOptionsProps) => {
  return {
    hidden: { opacity: 0, ...hidden },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      ...show,
      transition: { ...transitionDefaults, ...show.transition },
    },
    exit,
  };
};
