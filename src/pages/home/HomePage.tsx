import { Suspense } from "react";

import { lazyNamed } from "../../shared/utils/lazyNamed";
import { HeroSection } from "./sections/Hero";

const Mission = lazyNamed(() => import("./sections/Mission"), "Mission");
const ProjectsSection = lazyNamed(
  () => import("./sections/Projects"),
  "ProjectsSection",
);
const JourneySection = lazyNamed(
  () => import("./sections/Journey"),
  "JourneySection",
);
const SkillsSection = lazyNamed(
  () => import("./sections/Skills"),
  "SkillsSection",
);

export function HomePage() {
  return (
    <main className="mt-20">
      <HeroSection />
      <Suspense fallback={null}>
        <Mission />
        <ProjectsSection />
        <JourneySection />
        <SkillsSection />
      </Suspense>
    </main>
  );
}