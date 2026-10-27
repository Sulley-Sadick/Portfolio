import { motionVariants } from "../../../shared/ui/Framer/utils/motion";

export const socialMediaLinksVariants = motionVariants({
  hidden: { opacity: 0 },
});

export const formSectionVariants = motionVariants({
  hidden: { opacity: 0, y: 8 },
});

export const formButtonVariants = motionVariants({
  hidden: { opacity: 0, y: 10 },
  show: { transition: { delay: 0.15 } },
});
