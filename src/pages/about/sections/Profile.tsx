import { aboutProfileContent } from "../../../features/about/about.profile.constants";
import { aboutService } from "../../../features/about/about.service";
import { ConnectButton } from "../../../shared/ui/ConnectButton";
import { AccentText } from "../../../shared/ui/primitive/AccentText";
import { Link } from "../../../shared/ui/primitive/Button/IconLink";
import { LuExternalLink } from "react-icons/lu";

export function AboutProfileSection() {
  const developer = aboutService.getDeveloper();

  return (
    <section className="section text-center">
      <h1 className="font-finlandica mb-6 text-4xl font-bold md:text-6xl">
        {aboutProfileContent.titleLead}{" "}
        <AccentText as="span">{aboutProfileContent.titleAccent}</AccentText>
      </h1>

      <p className="text-neutral-secondary mx-auto mb-12 max-w-4xl text-sm leading-relaxed md:text-base">
        {aboutProfileContent.description}
      </p>

      <div className="mx-auto flex w-fit flex-col items-center gap-4 sm:flex-row">
        <ConnectButton />
        <Link
          href={developer.resume}
          target="_blank"
          rel="noreferrer noopener"
          variant="ghost-light"
          hover="light"
          y="center"
          className="flex gap-x-1.5 px-8 py-2"
        >
          <LuExternalLink className="size-4" />
          See My Resume
        </Link>
      </div>
    </section>
  );
}
