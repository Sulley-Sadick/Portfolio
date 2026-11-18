import { FramerAnimatePosition } from "../../shared/ui/Framer/components/FramerAnimatePosition";
import { motionVariants } from "../../shared/ui/Framer/utils/motion";
import { ContactLinks } from "./sections/ContactLinks";
import { ContactSection } from "./sections/ContactSection";

const contactIntroVariants = motionVariants({
  hidden: { opacity: 0, x: -48 },
  show: {
    opacity: 1,
    x: 0,
    transition: { ease: "easeOut", duration: 0.6, stiffness: 70 },
  },
});

const contactFormVariants = motionVariants({
  hidden: { opacity: 0, x: 48 },
  show: {
    opacity: 1,
    x: 0,
    transition: { ease: "easeOut", duration: 0.6, delay: 0.08, stiffness: 70 },
  },
});

export function ContactPage() {
  return (
    <main className="min-h-app-height mx-auto mt-15 grid max-w-6xl gap-8 overflow-hidden px-4 py-20 sm:px-6 md:grid-cols-[auto_1fr]">
      <FramerAnimatePosition
        whileInView="show"
        viewport={{ once: true }}
        variants={contactIntroVariants}
        className="h-fit w-full"
      >
        <ContactLinks />
      </FramerAnimatePosition>
      <FramerAnimatePosition
        whileInView="show"
        viewport={{ once: true }}
        variants={contactFormVariants}
        className="h-fit w-full"
      >
        <ContactSection />
      </FramerAnimatePosition>
    </main>
  );
}
