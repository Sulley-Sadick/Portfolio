import { lazy, Suspense } from "react";

import { HeroSection } from "./sections/Hero";

const Mission = lazy(() =>
  import("./sections/Mission").then((module) => ({ default: module.Mission })),
);
const ProjectsSection = lazy(() =>
  import("./sections/Projects").then((module) => ({
    default: module.ProjectsSection,
  })),
);
const JourneySection = lazy(() =>
  import("./sections/Journey").then((module) => ({
    default: module.JourneySection,
  })),
);
const SkillsSection = lazy(() =>
  import("./sections/Skills").then((module) => ({
    default: module.SkillsSection,
  })),
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