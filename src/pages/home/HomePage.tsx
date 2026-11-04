import { HeroSection } from "./sections/Hero";
import { Mission } from "./sections/Mission";

export function HomePage() {
  return (
    <main className="mt-20">
      <HeroSection />
      <Mission />
    </main>
  );
}
