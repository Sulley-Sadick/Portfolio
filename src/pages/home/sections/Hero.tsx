import { aboutService } from "../../../features/about/about.service";
import { useTyping } from "../../../shared/hooks/useTyping";
import { AccentText } from "../../../shared/ui/primitive/AccentText";
import { ConnectButton } from "../../../shared/ui/ConnectButton";
import { FramerAnimatePosition } from "../../../shared/ui/Framer/components/FramerAnimatePosition";
import { motionVariants } from "../../../shared/ui/Framer/utils/motion";
import { Pill } from "../../../shared/ui/primitive/Button/Pill";
import { Image } from "../../../shared/ui/primitive/Image";

export function HeroSection() {
  const developer = aboutService.getDeveloper();

  const { output: description, ref } = useTyping({
    text: `Front-end developer who builds and ships production-oriented web applications for clients and everyday users. I work with HTML, CSS, JavaScript, TypeScript, and React—responsive interfaces, API-backed features, and deployments you can review on GitHub and live hosts. I focus on clear UX, accessible markup, and maintainable code from first build through release.
`,
    whileInView: true,
    speedInSeconds: 0.2,
  });

  return (
    <div className="bg-muted overflow-hidden">
      <Pill
        className="font-finlandica mx-auto block w-fit animate-pulse px-4 text-sm font-medium tracking-wide uppercase"
        pad="sm"
        variant="accent-light"
      >
        Modern Web Engineering
      </Pill>
      <section className="section grid w-full grid-rows-[auto_auto] md:grid-cols-2 md:grid-rows-1 md:items-center">
        <div className="mt-6 h-fit">
          <h1 className="font-finlandica text-6xl font-bold">
            Front-<AccentText>End</AccentText> <br /> Develop
            <AccentText>er</AccentText>
          </h1>
          <p ref={ref} className="text-neutral-secondary mt-6 max-w-md">
            {description}
          </p>
          <ConnectButton className="mt-8 w-fit" />
        </div>
        <div className="group relative mt-10 md:mt-0">
          <div className="bg-accent/15 absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[100px] md:size-80" />
          <FramerAnimatePosition
            whileInView="show"
            viewport={{ once: true }}
            variants={imageVariants}
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

const imageVariants = motionVariants({
  hidden: {
    opacity: 0,
    y: 12,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut", duration: 0.55 },
  },
});