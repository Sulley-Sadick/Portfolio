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
    text: `Junior front-end developer open to client and freelance work—landing pages, catalog sites, and polished UI builds. I work mainly with React and TypeScript, ship projects with live demos and public repos, and focus on responsive, maintainable interfaces.
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
      <section className="section grid w-full grid-rows-[auto_auto] md:grid-cols-2 md:grid-rows-1">
        <div className="mt-6 h-fit">
          <h1 className="font-finlandica text-7xl font-bold md:text-6xl">
            Front-<AccentText>End</AccentText> <br /> Develop
            <AccentText>er</AccentText>
          </h1>
          <p ref={ref} className="text-neutral-secondary mt-6 max-w-md">
            {description}
          </p>
          <ConnectButton className="mt-8 w-fit" />
        </div>
        <div className="group relative h-fit">
          <div className="bg-accent/10 absolute inset-0 scale-150 rounded-full opacity-50 blur-[140px]"></div>
          <FramerAnimatePosition
            whileInView="show"
            viewport={{ once: true }}
            variants={imageVariants}
            className="border-accent mx-auto max-w-100 overflow-y-hidden border-b-4"
          >
            <div className="py-4">
              <Image
                url={developer.avatar1}
                alt="Mr. Sulley Sadick image"
                className="relative z-10 mx-auto h-100 p-1 transition-transform"
                imageClassName="transition-all duration-400 rounded-full"
              />
            </div>
          </FramerAnimatePosition>
        </div>
      </section>
    </div>
  );
}

const imageVariants = motionVariants({
  hidden: {
    opacity: 0,
    height: 0,
    filter: "grayscale(100%)",
  },
  show: {
    opacity: 1,
    filter: "grayscale(0%)",
    height: "fit-content",
    transition: { ease: "linear", duration: 0.5, stiffness: 40 },
  },
});
