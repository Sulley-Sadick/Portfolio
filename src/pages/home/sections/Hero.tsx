import { aboutService } from "../../../features/about/about.service";
import { AccentText } from "../../../shared/ui/primitive/AccentText";
import { ConnectButton } from "../../../shared/ui/ConnectButton";
import { FramerAnimatePosition } from "../../../shared/ui/Framer/components/FramerAnimatePosition";
import { motionVariants } from "../../../shared/ui/Framer/utils/motion";
import { Pill } from "../../../shared/ui/primitive/Button/Pill";
import { Image } from "../../../shared/ui/primitive/Image";

const HERO_DESCRIPTION = `Front-end developer who builds and ships production-oriented web applications for clients and everyday users. I work with HTML, CSS, JavaScript, TypeScript, and React—responsive interfaces, API-backed features, and deployments you can review on GitHub and live hosts. I focus on clear UX, accessible markup, and maintainable code from first build through release.`;

export function HeroSection() {
  const developer = aboutService.getDeveloper();

  return (
    <div className="bg-muted overflow-hidden">
      <Pill
        className="font-finlandica mx-auto block w-fit px-4 text-sm font-medium tracking-wide uppercase motion-safe:animate-pulse"
        pad="sm"
        variant="accent-light"
      >
        Modern Web Engineering
      </Pill>
      <section className="section grid w-full grid-rows-[auto_auto] md:grid-cols-2 md:grid-rows-1 md:items-center">
        <FramerAnimatePosition
          whileInView="show"
          viewport={{ once: true }}
          variants={heroCopyVariants}
          className="mt-6 h-fit"
        >
          <h1 className="font-finlandica text-6xl font-bold">
            Front-<AccentText>End</AccentText> <br /> Develop
            <AccentText>er</AccentText>
          </h1>
          <p className="text-neutral-secondary mt-6 max-w-md">{HERO_DESCRIPTION}</p>
          <ConnectButton className="mt-8 w-fit" />
        </FramerAnimatePosition>
        <div className="group relative mt-10 md:mt-0">
          <div
            className="bg-accent/15 absolute top-1/2 left-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[100px] md:size-80"
            aria-hidden="true"
          />
          <FramerAnimatePosition
            whileInView="show"
            viewport={{ once: true }}
            variants={heroImageVariants}
            className="relative mx-auto w-full max-w-[20rem]"
          >
            <Image
              url={developer.avatar1}
              alt={`Professional portrait of ${developer.name}`}
              priority
              objectFit="cover"
              rounded="xl"
              className="aspect-[2/2.72] w-full"
              sizes="(max-width: 768px) 72vw, 320px"
              imageClassName="object-[50%_17%]"
            />
          </FramerAnimatePosition>
        </div>
      </section>
    </div>
  );
}

const heroCopyVariants = motionVariants({
  hidden: {
    opacity: 0,
    x: -56,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: { ease: "easeOut", duration: 0.65, stiffness: 70 },
  },
});

const heroImageVariants = motionVariants({
  hidden: {
    opacity: 0,
    x: 56,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: { ease: "easeOut", duration: 0.65, delay: 0.08, stiffness: 70 },
  },
});
