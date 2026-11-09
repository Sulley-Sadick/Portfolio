import { HeroSection } from "./sections/Hero";
import { JourneySection } from "./sections/Journey";
import { Mission } from "./sections/Mission";
import { ProjectsSection } from "./sections/Projects";

export function HomePage() {
  return (
    <main className="mt-20">
      <HeroSection />
      <Mission />
      <ProjectsSection />
      <JourneySection />
    </main>
  );
}
