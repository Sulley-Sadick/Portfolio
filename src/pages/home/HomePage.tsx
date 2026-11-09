import { HeroSection } from "./sections/Hero";
import { JourneySection } from "./sections/Journey";
import { Mission } from "./sections/Mission";
import { ProjectsSection } from "./sections/Projects";
import { SkillsSection } from "./sections/Skills";

export function HomePage() {
  return (
    <main className="mt-20">
      <HeroSection />
      <Mission />
      <ProjectsSection />
      <JourneySection />
      <SkillsSection />
    </main>
  );
}
